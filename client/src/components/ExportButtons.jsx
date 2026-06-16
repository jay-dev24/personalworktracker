import exportExcel
from "../utils/exportExcel";

import exportPDF
from "../utils/exportPDF";



function ExportButtons({
  data
}) {

  return (

    <div className="export-buttons">

      <button
        className="export-btn"

        onClick={() =>
          exportExcel(data)
        }
      >
        Export Excel
      </button>



      <button
        className="export-btn pdf-btn"

        onClick={() =>
          exportPDF(data)
        }
      >
        Export PDF
      </button>

    </div>

  );

}

export default ExportButtons;