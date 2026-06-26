import { useEffect } from "react";

import { useForm } from "react-hook-form";

import api from "../services/api";
import { toast } from "react-toastify";

function TrackerForm({
  fetchData,
  editData,
  setEditData
}) {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue
  } = useForm();


  /* =========================
     WATCH VALUES
  ========================= */

  const qty =
    parseFloat(watch("qty")) || 0;

  const rate =
    parseFloat(watch("rate")) || 0;

  const extraAmount =
    parseFloat(
      watch("extraAmount")
    ) || 0;


  /* =========================
     AUTO CALCULATION
  ========================= */

  useEffect(() => {

    const basicAmount =
      qty * rate;

    const gst =
      basicAmount * 0.18;

    const total =
      basicAmount +
      gst +
      extraAmount;

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


  /* =========================
     EDIT DATA
  ========================= */

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
        "extraAmount",
        editData.extra_amount || 0
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


  /* =========================
     CAPITAL LETTER FUNCTION
  ========================= */

  const handleUpperCase = (
    e
  ) => {

    e.target.value =
      e.target.value.toUpperCase();

  };


  /* =========================
     SUBMIT FORM
  ========================= */

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

            if (
              formData.invoiceFile &&
              formData.invoiceFile[0]
            ) {

              sendData.append(
                "invoiceFile",
                formData.invoiceFile[0]
              );

            }

          } else {

            sendData.append(
              key,
              formData[key]
            );

          }

        });


      /* =========================
         UPDATE DATA
      ========================= */

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

         toast.success(
    "Data Updated Successfully"
  );

        setEditData(null);

      }

      /* =========================
         ADD DATA
      ========================= */

      else {

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

        toast.success(
          "Data Added Successfully"
        );

      }


      reset();

      fetchData();

    } catch (err) {

  console.log(err);

  const message =
    err.response?.data?.message;

  // DUPLICATE INVOICE
  if (
    message?.includes(
      "tracker_invoice_no_key"
    )
  ) {

      toast.error(
      "Invoice Number already exists"
    );

  }

  else {

    toast.error(
      "Something went wrong"
    );

  }

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
        onInput={handleUpperCase}
      />


      {/* CUSTOMER CODE */}
      <input
        placeholder="Customer Code"
        {...register("customerCode")}
        onInput={handleUpperCase}
      />


      {/* CUSTOMER NAME */}
      <input
        placeholder="Customer Name"
        {...register(
          "customerName",
          {
            required: true
          }
        )}
        onInput={handleUpperCase}
      />


      {/* LOCATION */}
      <input
        placeholder="Plant Location"
        {...register("plantLocation")}
        onInput={handleUpperCase}
      />


      {/* DATE */}
      <input
        type="date"
        {...register("invoiceDate")}
      />


      {/* INVOICE NO */}
      <input
        placeholder="Invoice No"
        {...register(
          "invoiceNo",
          {
            required: true
          }
        )}
        onInput={handleUpperCase}
      />


      {/* MATERIAL CODE */}
      <input
        placeholder="Material Code"
        {...register("materialCode")}
        onInput={handleUpperCase}
      />


      {/* ITEM */}
      <input
        placeholder="Item"
        {...register("item")}
        onInput={handleUpperCase}
      />


      {/* QTY */}
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Qty"
        {...register("qty")}
      />


      {/* RATE */}
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Rate"
        {...register("rate")}
      />


      {/* EXTRA AMOUNT */}
      <input
        type="number"
        step="0.01"
        min="0"
        placeholder="Extra Amount"
        {...register("extraAmount")}
      />


      {/* INVOICE VALUE */}
      <input
        type="number"
        step="0.01"
        placeholder="Invoice Value"
        // readOnly
        {...register("invoiceValue")}
      />


      {/* REMARK */}
      <input
        placeholder="Remark"
        {...register("remark")}
        onInput={handleUpperCase}
      />


      {/* PDF FILE */}
      <input
        type="file"
        accept=".pdf"
        {...register("invoiceFile")}
      />


      {/* BUTTON */}
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