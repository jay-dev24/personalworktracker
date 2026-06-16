import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

const exportPDF = (data) => {

  const doc = new jsPDF(
    "landscape"
  );

  // TITLE
  doc.setFontSize(18);

  doc.text(
    "Personal Work Tracker Report",
    14,
    15
  );


  autoTable(doc, {

    startY: 25,

    head: [[

      "ID",

      "Segment",

      "Customer Code",

      "Customer Name",

      "Plant Location",

      "Invoice Date",

      "Invoice No",

      "Material Code",

      "Item",

      "Qty",

      "Rate",

      "Invoice Value",

      "Remark"

    ]],


    body: data.map((item) => [

      item.id,

      item.segment,

      item.customer_code,

      item.customer_name,

      item.plant_location,

      item.invoice_date,

      item.invoice_no,

      item.material_code,

      item.item,

      item.qty,

      item.rate,

      item.invoice_value,

      item.remark

    ]),


    styles: {

      fontSize: 8,

      cellPadding: 2

    },

    headStyles: {

      fillColor: [52, 58, 64]

    }

  });


  // SAVE PDF
  doc.save(
    "tracker-report.pdf"
  );

};

export default exportPDF;