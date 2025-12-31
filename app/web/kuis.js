var kuis = {

  view:function(arr){
    let out = `
      <div id="quizContent"></div>
      <button onclick="reviewAnswers()">Tinjau Jawaban</button>
      <button onclick="submitQuiz()">Kumpulkan Jawaban</button>
      <div id="score"></div>
      <div id="reviewSection" class="review-box"></div>
    `;
    return out;
  },

  controller:function(i){
    // tampilkan modal + skeleton kuis
    i = 0;
    d.modal(kuis.view(i));

    // ====== STATE & DATA ======
    let quizzes = [];                 // diisi dari CSV
    let currentQuizIndex = 0;
    let userAnswers = [];
    let shuffledQuestions = [];

    // ====== CSV PARSER RINGAN (dukungan kutip & koma) ======
    function parseCSV(text) {
      const rows = [];
      let row = [], cell = '', inQuotes = false;

      for (let k = 0; k < text.length; k++) {
        const ch = text[k], next = text[k+1];

        if (inQuotes) {
          if (ch === '"' && next === '"') { cell += '"'; k++; }        // escaped quote ""
          else if (ch === '"') { inQuotes = false; }
          else { cell += ch; }
        } else {
          if (ch === '"') { inQuotes = true; }
          else if (ch === ',') { row.push(cell); cell = ''; }
          else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
          else if (ch === '\r') { /* ignore CR */ }
          else { cell += ch; }
        }
      }
      if (cell.length || row.length) { row.push(cell); rows.push(row); }
      return rows;
    }

    // ====== MUAT DATA DARI CSV ======
    async function loadQuizzesFromCSV(url) {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('Gagal memuat CSV: ' + res.status);
      const text = await res.text();
      const rows = parseCSV(text);

      if (!rows.length) return [];

      const header = rows[0].map(h => h.trim().toLowerCase());
      const col = (name) => header.indexOf(name);

      const idxSet      = col('set');
      const idxQ        = col('question');
      const idxAnswer   = col('answer');

      const choiceIdxs = header
        .map((h, idx) => ({h, idx}))
        .filter(x => x.h.startsWith('choice'))
        .sort((a,b) => a.h.localeCompare(b.h))
        .map(x => x.idx);

      const bySet = {};

      for (let r = 1; r < rows.length; r++) {
        const rec = rows[r];
        if (!rec[idxQ]) continue;

        const setNo = parseInt(rec[idxSet], 10);
        const setKey = Number.isFinite(setNo) ? setNo : 0;

        const choices = choiceIdxs
          .map(ci => (rec[ci] ?? '').trim())
          .filter(Boolean);

        let ans = (rec[idxAnswer] ?? '').trim();
        let answerIndex = -1;

        if (/^\d+$/.test(ans)) {
          const oneBased = parseInt(ans, 10);
          answerIndex = oneBased - 1;
        } else {
          answerIndex = choices.findIndex(c => c === ans);
        }

        if (answerIndex < 0) answerIndex = 0;

        const qObj = {
          text: rec[idxQ],
          choices,
          answer: answerIndex
        };

        (bySet[setKey] ||= []).push(qObj);
      }

      const sets = Object.keys(bySet).map(n => parseInt(n,10)).sort((a,b)=>a-b);
      return sets.map(s => bySet[s]);
    }

    // ====== LOGIC QUIZ ======
    function openQuiz(index){
      currentQuizIndex = index;
      userAnswers = new Array(quizzes[index].length).fill(null);

      shuffledQuestions = quizzes[index].map((q, i) => {
        const choiceIndexes = [...q.choices.keys()].sort(() => Math.random() - 0.5);
        const correctIndex = choiceIndexes.indexOf(q.answer);
        return {
          originalIndex: i,
          text: q.text,
          shuffledChoices: choiceIndexes.map(idx => ({ index: idx, text: q.choices[idx] })),
          correctAnswerIndex: correctIndex
        };
      });

      renderQuiz();
    }

    function renderQuiz(){
      const container = document.getElementById('quizContent');
      if(!container) return;
      container.innerHTML = '';

      shuffledQuestions.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'question-box';
        div.innerHTML = `
          <div class="question-title">Soal ${i + 1}: ${q.text}</div>
          ${q.shuffledChoices.map((choice, j) => `
            <label>
              <input type="radio" name="q${i}" value="${j}">
              ${choice.text}
            </label><br>`).join('')}
        `;
        container.appendChild(div);

        // ⬇️ perbaikan: interpolasi benar (tanpa backslash)
        div.querySelectorAll(`input[name="q${i}"]`).forEach(input => {
          input.addEventListener('change', (e) => {
            userAnswers[i] = parseInt(e.target.value, 10);
          });
        });
      });
    }

    function closeModal(){
      const modal = document.getElementById('quizModal');
      if (modal) modal.style.display = 'none';
      const scoreEl = document.getElementById('score');
      const reviewEl = document.getElementById('reviewSection');
      if (scoreEl) scoreEl.innerText = '';
      if (reviewEl) reviewEl.innerHTML = '';
    }

    function reviewAnswers(){
      const review = document.getElementById('reviewSection');
      if(!review) return;
      review.innerHTML = '<h3>Review Jawaban</h3>';

      shuffledQuestions.forEach((q, i) => {
        const correctText = q.shuffledChoices[q.correctAnswerIndex].text;
        const userIdx = userAnswers[i];
        const userText = (userIdx !== null && userIdx !== undefined)
          ? q.shuffledChoices[userIdx].text
          : '(belum dijawab)';
        const isCorrect = userIdx === q.correctAnswerIndex;

        review.innerHTML += `<p>
          Soal ${i+1}: ${q.text}<br>
          Jawaban Anda: ${userText} <br>
          ${
            isCorrect
              ? '<b style="color:green">Benar</b>'
              : `<b style="color:red">Salah</b>, seharusnya: ${correctText}`
          }
        </p>`;
      });
    }

    function submitQuiz(){
      let score = 0;
      shuffledQuestions.forEach((q, i) => {
        if (userAnswers[i] === q.correctAnswerIndex) score++;
      });
      const percent = Math.round((score / shuffledQuestions.length) * 100);
      const scoreEl = document.getElementById('score');
      if (scoreEl) scoreEl.innerText = `Skor Anda: ${score} dari ${shuffledQuestions.length} (${percent}%)`;

kursus.controller.dinilai({nilai:percent});

    }

    // ====== EKSPOR UNTUK TOMBOL DI HTML ======
    window.openQuiz = openQuiz;
    window.reviewAnswers = reviewAnswers;
    window.submitQuiz = submitQuiz;
    window.closeQuizModal = closeModal;

    // ====== INIT ======
    (async () => {
      try {
        quizzes = await loadQuizzesFromCSV('quizzes.csv');
        if (!quizzes.length) {
          console.warn('CSV kosong, menggunakan dataset default.');
          quizzes = [
            [
              { text: "Apa ibu kota Indonesia?", choices: ["Surabaya","Jakarta","Bandung","Medan"], answer: 1 },
              { text: "Berapa jumlah provinsi di Indonesia (2024)?", choices: ["32","33","34","38"], answer: 3 }
            ]
          ];
        }
      } catch (e) {
        console.error(e);
        quizzes = [
          [
            { text: "Apa ibu kota Indonesia?", choices: ["Surabaya","Jakarta","Bandung","Medan"], answer: 1 },
            { text: "Berapa jumlah provinsi di Indonesia (2024)?", choices: ["32","33","34","38"], answer: 3 }
          ],
          [
            { text: "HTML adalah singkatan dari?", choices: ["Hyper Text Markup Language","HighText Machine Language","Hyper Tabular Markup Language","None of these"], answer: 0 },
            { text: "Siapa penemu WWW?", choices: ["Elon Musk","Bill Gates","Tim Berners-Lee","Mark Zuckerberg"], answer: 2 }
          ]
        ];
      }
      openQuiz(0);
    })();
  },

};
