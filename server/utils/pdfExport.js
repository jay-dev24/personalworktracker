const PDFDocument = require("pdfkit");
const fs = require("fs");

const exportPDF = (data) => {

  const doc = new PDFDocument();

  doc.pipe(
    fs.createWriteStream("tracker.pdf")
  );

  doc.fontSize(18)
    .text("Tracker Report");

  data.forEach((item) => {

    doc.moveDown();

    doc.text(
      `Customer: ${item.customer_name}`
    );

    doc.text(
      `Invoice: ${item.invoice_no}`
    );

    doc.text(
      `Amount: ${item.invoice_value}`
    );

  });

  doc.end();

};

module.exports = exportPDF;