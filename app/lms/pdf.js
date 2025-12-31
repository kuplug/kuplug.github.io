pdf = function(pdfUrl) {

  let pdfDoc = null,
      pageNum = 1,
      pageRendering = false,
      pageNumPending = null,
      scale = 1.5,
      currentPdfUrl = '',
      canvas = null,
      ctx = null;

  openModal = function(pdfUrl) {
    document.getElementById('pdf-modal').style.display = 'block';
    currentPdfUrl = pdfUrl;

    // Init canvas
    canvas = document.getElementById("pdf-canvas");
    ctx = canvas.getContext("2d");

    // Load PDF baru
    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDoc_) {
      pdfDoc = pdfDoc_;
      pageNum = 1;
      document.getElementById("page-count").textContent = pdfDoc.numPages;
      renderPage(pageNum);
    });
  }

  closeModals = function() {
    d.close('pdf-canvas');

    document.getElementById('pdf-modal').style.display = 'none';
    // Kosongkan canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  renderPage = function(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(function (page) {
      const viewport = page.getViewport({ scale: scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      const renderTask = page.render(renderContext);

      renderTask.promise.then(function () {
        pageRendering = false;
        if (pageNumPending !== null) {
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      });

      // Update nomor halaman
      document.getElementById("page-num").textContent = num;
      document.getElementById("page-count").textContent = pdfDoc.numPages;

      // ✅ Alert kalau sudah sampai halaman terakhir
      if (num === pdfDoc.numPages) {
        alert("✅ Anda sudah berada di halaman terakhir.");
      }
    });
  }

  queueRenderPage = function(num) {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  }

  prevPage = function() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
  }

  nextPage = function() {
    if (pageNum >= pdfDoc.numPages) {
      // ✅ Tambahan alert kalau coba lewat batas
      alert("⚠️ Anda sudah mencapai halaman terakhir.");
      return;
    }
    pageNum++;
    queueRenderPage(pageNum);
  }

  // openModal('app/lms/pdf/'+pdfUrl)
  openModal('pdf/' + pdfUrl)

};
