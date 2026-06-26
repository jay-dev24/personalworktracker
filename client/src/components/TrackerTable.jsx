import api from "../services/api";

import { toast } from "react-toastify";
import Swal from "sweetalert2";


function TrackerTable({
  data,
  fetchData,
  setEditData
}) {

  /* =========================
     DELETE FUNCTION
  ========================= */

const deleteData = async (
  id
) => {

  const result =
    await Swal.fire({

      title: "Delete Record?",

      text:
        "This record will be permanently deleted.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText:
        "Yes, Delete",

      cancelButtonText:
        "Cancel",

    });

  if (!result.isConfirmed)
    return;

  try {

    await api.delete(
      `/tracker/${id}`
    );

    toast.success(
      "Data Deleted Successfully"
    );

    fetchData();

  } catch (err) {

    console.log(err);

    toast.error(
      "Delete Failed"
    );

  }

};


  /* =========================
     EDIT FUNCTION
  ========================= */

  const handleEdit = (
    item
  ) => {

    setEditData(item);

    // SCROLL TOP
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

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

                <td>{item.id}</td>

                <td>{item.segment}</td>

                <td>{item.customer_code}</td>

                <td>{item.customer_name}</td>

                <td>{item.plant_location}</td>

                <td>{item.invoice_date}</td>

                <td>{item.invoice_no}</td>

                <td>{item.material_code}</td>

                <td>{item.item}</td>

                <td>{item.qty}</td>

                <td>
                  ₹ {item.rate}
                </td>

                <td>
                  ₹ {item.extra_amount || 0}
                </td>

                <td>
                  ₹ {item.invoice_value}
                </td>

                <td>{item.remark}</td>

                {/* PDF */}
                <td>

                  {item.uploaded_invoice ? (

                    <a
                      href={
                        item.uploaded_invoice
                      }
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

                    ? new Date(
                        item.created_at
                      ).toLocaleString()

                    : "-"}

                </td>


                {/* ACTION BUTTONS */}
                <td>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px"
                    }}
                  >

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        handleEdit(item)
                      }
                    >

                      Edit

                    </button>


                    {/* DELETE */}
                    <button
                    className="deleteButton"
                      onClick={() =>
                        deleteData(item.id)
                      }
                    >

                      Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="17"
                style={{
                  textAlign: "center"
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