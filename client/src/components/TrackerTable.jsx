import api from "../services/api";

function TrackerTable({ data, fetchData, setEditData }) {
  // DELETE FUNCTION
  const deleteData = async (id) => {
    try {
      await api.delete(`/tracker/${id}`);

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>

            <th>Segment</th>

            <th>Customer Code</th>

            <th>Customer Name</th>

            <th>Plant Location</th>

            <th>Invoice Date</th>

            <th>Invoice No</th>

            <th>Material Code</th>

            <th>Item</th>

            <th>Qty</th>

            <th>Rate</th>

            <th>Extra Amount</th>

            <th>Invoice Value</th>

            <th>Remark</th>

            <th>PDF</th>

            <th>Created At</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                {/* ID */}
                <td>{item.id}</td>

                {/* SEGMENT */}
                <td>{item.segment}</td>

                {/* CUSTOMER CODE */}
                <td>{item.customer_code}</td>

                {/* CUSTOMER NAME */}
                <td>{item.customer_name}</td>

                {/* PLANT LOCATION */}
                <td>{item.plant_location}</td>

                {/* INVOICE DATE */}
                <td>{item.invoice_date}</td>

                {/* INVOICE NO */}
                <td>{item.invoice_no}</td>

                {/* MATERIAL CODE */}
                <td>{item.material_code}</td>

                {/* ITEM */}
                <td>{item.item}</td>

                {/* QTY */}
                <td>{item.qty}</td>

                {/* RATE */}
                <td>₹ {item.rate}</td>

                {/* EXTRA AMOUNT */}
                <td>₹ {item.extra_amount || 0}</td>

                {/* INVOICE VALUE */}
                <td>₹ {item.invoice_value}</td>

                {/* REMARK */}
                <td>{item.remark}</td>

                {/* PDF LINK */}
                <td>
                  {item.uploaded_invoice ? (
                    <a
                      href={item.uploaded_invoice}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View PDF
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>

                {/* CREATED DATE */}
                <td>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleString()
                    : "-"}
                </td>

                {/* DELETE BUTTON */}
                <td>
                  <button onClick={() => setEditData(item)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="17"
                style={{
                  textAlign: "center",
                }}
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TrackerTable;
