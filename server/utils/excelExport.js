const XLSX = require("xlsx");

const exportExcel = (data) => {

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Tracker"
  );

  XLSX.writeFile(
    workbook,
    "tracker.xlsx"
  );

};

module.exports = exportExcel;