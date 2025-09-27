document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

  setTimeout(() => {
    intro.classList.add("hidden");
    main.classList.remove("hidden");
  }, 3000);

  const fileInput = document.getElementById("fileInput");
  const dataTable = document.getElementById("dataTable").querySelector("tbody");
  const finalOutput = document.getElementById("finalOutput");
  const addRowBtn = document.getElementById("addRow");

  // رفع صورة + OCR
  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const { data: { text } } = await Tesseract.recognize(file, 'ara+eng');
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    lines.forEach(line => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${line}</td><td></td>`;
      dataTable.appendChild(row);
    });
  });

  // إضافة / تعديل
  addRowBtn.addEventListener("click", () => {
    generateFinalOutput();
  });

  function generateFinalOutput() {
    let result = "📌 استلام العمليات 📌\n\n";
    result += "اسم العمليات : ... \n";
    result += "النائب : ... \n\n";
    result += "عدد و اسماء الوحدات الاسعافيه في الميدان: []\n\n";

    [...dataTable.rows].forEach(r => {
      const name = r.cells[0].innerText || "";
      const code = r.cells[1].innerText || "";
      result += `${name} ${code}\n`;
    });

    finalOutput.innerText = result;
    finalOutput.classList.remove("hidden");
  }
});
