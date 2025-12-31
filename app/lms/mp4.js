var mp4 = {

  view:function(arr){
    let out = `


    <div class="player" role="region" aria-label="Pemutar Video">

      <div class="video-stage" id="stage">
        <video id="video" preload="auto" autoplay muted playsinline crossorigin="anonymous" poster="" aria-label="Video">
          <source id="mp4src" src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
        </video>
      </div>

      <div class="seek" aria-label="Kontrol dan Progres">
        <button id="play" aria-label="Putar/Jeda">▶︎ / ❚❚</button>
        <div class="time" id="current">00:00</div>
        <div class="bar" id="bar">
          <div class="progress" id="progress"></div>
          <input class="seek-range" id="seek" type="range" min="0" max="1000" value="0" step="1" disabled aria-disabled="true" />
        </div>
        <div class="time" id="duration">00:00</div>
      </div>
    </div>
    `;
    return out;
  },

  controller:function(i){
    const $ = (s, r = document) => r.querySelector(s);
    const video = $('#video');
    const playBtn = $('#play');
    const seek = $('#seek');
    const cur = $('#current');
    const dur = $('#duration');
    const prog = $('#progress');

    function toTime(t){
      if (!isFinite(t)) return '00:00';
      const s = Math.floor(t % 60).toString().padStart(2,'0');
      const m = Math.floor((t/60)%60).toString().padStart(2,'0');
      const h = Math.floor(t/3600);
      return h? `${h}:${m}:${s}` : `${m}:${s}`;
    }

    function updateTimes(){
      cur.textContent = toTime(video.currentTime);
      dur.textContent = toTime(video.duration);
      const p = (video.currentTime / (video.duration||1))*100;
      prog.style.setProperty('--prog', `${p}%`);
      seek.value = Math.round(p*10); // display only
    }

    function togglePlay(){
      if (video.paused) video.play(); else video.pause();
    }

    function setPausedUI(){
      playBtn.setAttribute('aria-pressed', video.paused? 'true':'false');
    }

    // Events
    video.addEventListener('loadedmetadata', updateTimes);
    video.addEventListener('timeupdate', updateTimes);
    video.addEventListener('progress', updateTimes);
    video.addEventListener('play', setPausedUI);
    video.addEventListener('pause', setPausedUI);

    // Notifikasi saat selesai
    video.addEventListener('ended', ()=>{
      alert('Video selesai diputar.');
    });

    // Kontrol
    playBtn.addEventListener('click', togglePlay);

    // Pintasan minimal
    document.addEventListener('keydown', (e)=>{
      const tag = (e.target||{}).tagName || '';
      if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
      if (e.code === 'Space' || e.key.toLowerCase() === 'k'){ e.preventDefault(); togglePlay(); }
    });

    window.addEventListener('load', ()=>{
    video.muted = true; // mute agar autoplay diizinkan
    video.play().catch(()=>{});
  });


}
};
