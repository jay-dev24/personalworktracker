import * as XLSX from "xlsx";

const exportExcel = (data) => {

  // CUSTOM FORMAT
  const formattedData = data.map(
    (item) => ({

      ID: item.id,

      Segment:
        item.segment,

      "Customer Code":
        item.customer_code,

      "Customer Name":
        item.customer_name,

      "Plant Location":
        item.plant_location,

      "Invoice Date":
        item.invoice_date,

      "Invoice No":
        item.invoice_no,

      "Material Code":
        item.material_code,

      Item:
        item.item,

      Qty:
        item.qty,

      Rate:
        item.rate,

      "Invoice Value":
        item.invoice_value,

      Remark:
        item.remark,

      "PDF Link":
        item.uploaded_invoice

    })
  );


  // CREATE SHEET
  const worksheet =
    XLSX.utils.json_to_sheet(
      formattedData
    );

  // CREATE WORKBOOK
  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Tracker Report"
  );

  // DOWNLOAD FILE
  XLSX.writeFile(
    workbook,
    "tracker-report.xlsx"
  );

};

export default exportExcel;