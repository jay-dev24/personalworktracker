import { useEffect, useState }
from "react";

import api
from "../services/api";

import TrackerForm
from "../components/TrackerForm";

import TrackerTable
from "../components/TrackerTable";

import ExportButtons
from "../components/ExportButtons";


import { FiSearch }
from "react-icons/fi";



function Dashboard() {

  const [data, setData] =
    useState([]);

  const [editData, setEditData] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [fromDate, setFromDate] =
  useState("");

const [toDate, setToDate] =
  useState("");



  // FETCH DATA
const fetchData = async () => {

  try {

    const res =
      await api.get("/tracker");

    const trackerData = res.data;


    /* =========================
       SORT OLDEST TO LATEST
    ========================= */

    const sortedData =
      trackerData.sort(
        (a, b) =>
          new Date(a.invoice_date) -
          new Date(b.invoice_date)
      );


    // SET TABLE DATA
    setData(sortedData);


    /* =========================
       NO DEFAULT DATE SELECTION
    ========================= */

    // FROM DATE & TO DATE
    // WILL REMAIN EMPTY
    // UNTIL USER SELECTS THEM

  } catch (err) {

    console.log(err);

  }

};



  useEffect(() => {

    fetchData();

  }, []);


  // FILTER DATA
 const filteredData =
  data.filter((item) => {

    const searchText =
      search.toLowerCase();

    const matchesSearch =

      String(item.customer_code || "")
        .toLowerCase()
        .includes(searchText)

      ||

      String(item.customer_name || "")
        .toLowerCase()
        .includes(searchText)

      ||

      String(item.material_code || "")
        .toLowerCase()
        .includes(searchText)

      ||

      String(item.item || "")
        .toLowerCase()
        .includes(searchText);



    // DATE FILTER
    const itemDate =
      item.invoice_date;

    const matchesFromDate =
      fromDate
        ? itemDate >= fromDate
        : true;

    const matchesToDate =
      toDate
        ? itemDate <= toDate
        : true;



    return (
      matchesSearch &&
      matchesFromDate &&
      matchesToDate
    );

  });


/* =========================
   CUSTOMER TOTAL TITLE
========================= */

const totalTitle = (() => {

  // NO SEARCH
  if (!search?.trim()) {

    return "All Customer Total";

  }


  // NO DATA
  if (!filteredData?.length) {

    return "No Data Found";

  }


  // UNIQUE CUSTOMERS
  const uniqueCustomers = [

    ...new Set(

      filteredData.map(

        (item) =>

          item?.customer_name || ""

      )

    )

  ];


  // SINGLE CUSTOMER
  if (uniqueCustomers.length === 1) {

    return `
      ${uniqueCustomers[0]} Total
    `;

  }


  // MULTIPLE CUSTOMERS
  return "Filtered Customer Total";

})();






  /* =========================
   GRAND TOTAL
========================= */

const grandTotal =
  filteredData?.reduce(

    (total, item) => {

      return (

        total +

        Number(
          item?.invoice_value || 0
        )

      );

    },

    0

  ) || 0;



  return (

    <div className="container">

      <h1>
        Durgesh Jha Tracker
      </h1>



      {/* FORM */}
      <TrackerForm
        fetchData={fetchData}
        editData={editData}
        setEditData={setEditData}
      />



      <div className="toolbar">

  {/* EXPORT BUTTONS */}
  <ExportButtons
    data={filteredData}
  />


  {/* FILTER SECTION */}
  <div className="filter-section">

    {/* FROM DATE */}
    <input
      type="date"
      value={fromDate}
      onChange={(e) =>
        setFromDate(e.target.value)
      }
      className="date-input"
    />


    {/* TO DATE */}
    <input
      type="date"
      value={toDate}
      onChange={(e) =>
        setToDate(e.target.value)
      }
      className="date-input"
    />


    {/* SEARCH */}
    <div className="search-box">

      <FiSearch
        className="search-icon"
      />

      <input
        type="text"

        placeholder="
Search Customer /
Material
"

        value={search}

        onChange={(e) =>
          setSearch(e.target.value)
        }

        className="search-input"
      />

    </div>

  </div>

</div>

        <div className="total-card">

          <h3>

            {totalTitle}

          </h3>

          <h2>

            ₹ {
              grandTotal.toLocaleString(
                "en-IN"
              )
            }

          </h2>

        </div>

      {/* TABLE */}
      <TrackerTable
        data={filteredData}
        fetchData={fetchData}
        setEditData={setEditData}
      />

    </div>

  );

}

export default Dashboard;