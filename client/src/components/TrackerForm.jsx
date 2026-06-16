import { useEffect } from "react";

import { useForm } from "react-hook-form";

import api from "../services/api";

function TrackerForm({ fetchData, editData, setEditData }) {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue
  } = useForm();

  // WATCH VALUES
  const qty = watch("qty") || 0;

  const rate = watch("rate") || 0;

  const extraAmount =
    watch("extraAmount") || 0;

  // AUTO CALCULATION
  useEffect(() => {

    const basicAmount =
      qty * rate;

    const gst =
      basicAmount * 0.18;

    const total =
      basicAmount +
      gst +
      Number(extraAmount);

    setValue(
      "invoiceValue",
      total.toFixed(2)
    );

  }, [
    qty,
    rate,
    extraAmount,
    setValue
  ]);


  useEffect(() => {

  if (editData) {

    setValue(
      "segment",
      editData.segment
    );

    setValue(
      "customerCode",
      editData.customer_code
    );

    setValue(
      "customerName",
      editData.customer_name
    );

    setValue(
      "plantLocation",
      editData.plant_location
    );

    setValue(
      "invoiceDate",
      editData.invoice_date
    );

    setValue(
      "invoiceNo",
      editData.invoice_no
    );

    setValue(
      "materialCode",
      editData.material_code
    );

    setValue(
      "item",
      editData.item
    );

    setValue(
      "qty",
      editData.qty
    );

    setValue(
      "rate",
      editData.rate
    );

    setValue(
      "invoiceValue",
      editData.invoice_value
    );

    setValue(
      "remark",
      editData.remark
    );

  }

}, [editData, setValue]);



  // SUBMIT FORM
const onSubmit = async (
  formData
) => {

  try {

    const sendData =
      new FormData();

    Object.keys(formData)
      .forEach((key) => {

        if (
          key === "invoiceFile"
        ) {

          sendData.append(
            "invoiceFile",
            formData.invoiceFile[0]
          );

        } else {

          sendData.append(
            key,
            formData[key]
          );

        }

      });

   if (editData) {

  await api.put(
    `/tracker/${editData.id}`,
    sendData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );

  alert("Data Updated");

  setEditData(null);

} else {

  await api.post(
    "/tracker",
    sendData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data"
      }
    }
  );

  alert("Data Added");

}

    alert("Data Added");

    reset();

    fetchData();

  } catch (err) {

    console.log(err);

  }

};



  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
    >


    
      {/* SEGMENT */}
      <input
        placeholder="Segment"
        {...register("segment")}
      />

 <input
  placeholder="Customer Code"
  {...register("customerCode")}
/>


      {/* CUSTOMER */}
      <input
        placeholder="Customer Name"
        {...register("customerName", {
          required: true
        })}
      />


      {/* LOCATION */}
      <input
        placeholder="Plant Location"
        {...register("plantLocation")}
      />


      {/* DATE */}
      <input
        type="date"
        {...register("invoiceDate")}
      />


      {/* INVOICE */}
      <input
        placeholder="Invoice No"
        {...register("invoiceNo", {
          required: true
        })}
      />

   <input
  placeholder="Material Code"
  {...register("materialCode")}
/>


      {/* ITEM */}
      <input
        placeholder="Item"
        {...register("item")}
      />

    


      {/* QTY */}
      <input
        type="number"
        placeholder="Qty"
        {...register("qty")}
      />


      {/* RATE */}
      <input
        type="number"
        placeholder="Rate"
        {...register("rate")}
      />


      {/* EXTRA AMOUNT */}
      <input
        type="number"
        placeholder="Extra Amount"
        {...register("extraAmount")}
      />


      {/* INVOICE VALUE */}
      <input
        type="number"
        placeholder="Invoice Value"
        readOnly
        {...register("invoiceValue")}
      />


      {/* REMARK */}
      <input
        placeholder="Remark"
        {...register("remark")}
      />

        <input
        type="file"
        accept=".pdf"
        {...register("invoiceFile")}
        />

      <button type="submit">
              {
          editData
          ? "Update Data"
          : "Save Data"
        }
      </button>

    </form>

  );

}

export default TrackerForm;