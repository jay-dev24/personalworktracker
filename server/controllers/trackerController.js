const supabase =
  require("../config/supabase");



/* =========================
   ADD TRACKER DATA
========================= */

const addTrackerData =
  async (req, res) => {

  try {

    const body = req.body;

    let uploadedInvoice = "";



    // PDF UPLOAD
    if (req.file) {

      const fileName =
        `${Date.now()}-${req.file.originalname}`;

      const { error: uploadError } =
        await supabase.storage
          .from("invoices")
          .upload(
            fileName,
            req.file.buffer,
            {
              contentType:
                "application/pdf"
            }
          );

      if (uploadError) {
        throw uploadError;
      }


      // GET PUBLIC URL
      const {
        data: publicUrlData
      } = supabase.storage
        .from("invoices")
        .getPublicUrl(fileName);

      uploadedInvoice =
        publicUrlData.publicUrl;

    }



    const duplicateInvoice =
  await supabase
    .from("tracker")
    .select("*")
    .eq(
      "invoice_no",
      data.invoice_no
    )
    .single();

    if (duplicateInvoice.data) {

      return res.status(400).json({

        success: false,

        message:
          "Invoice Number already exists"

      });

    }

    // INSERT DATA
    const { data, error } =
      await supabase
        .from("tracker")
        .insert([{

          segment:
            body.segment,

          customer_code:
            body.customerCode,

          customer_name:
            body.customerName,

          plant_location:
            body.plantLocation,

          invoice_date:
            body.invoiceDate,

          invoice_no:
            body.invoiceNo,

          material_code:
            body.materialCode,

          item:
            body.item,

          qty:
            body.qty,

          rate:
            body.rate,

          extra_amount:
            body.extraAmount,

          invoice_value:
            body.invoiceValue,

          remark:
            body.remark,

          uploaded_invoice:
            uploadedInvoice

        }])

        .select();



    if (error) {
      throw error;
    }



    res.status(201).json({

      success: true,

      message:
        "Data Added Successfully",

      data

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

};





/* =========================
   GET ALL DATA
========================= */

const getTrackerData =
  async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("tracker")
        .select("*")
        .order("id", {
          ascending: false
        });

    if (error) {
      throw error;
    }

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

};





/* =========================
   UPDATE TRACKER DATA
========================= */

const updateTrackerData =
  async (req, res) => {

  try {

    const { id } = req.params;

    const body = req.body;

    let uploadedInvoice =
      body.uploaded_invoice || "";



    // IF NEW PDF UPLOADED
    if (req.file) {

      const fileName =
        `${Date.now()}-${req.file.originalname}`;

      const { error: uploadError } =
        await supabase.storage
          .from("invoices")
          .upload(
            fileName,
            req.file.buffer,
            {
              contentType:
                "application/pdf"
            }
          );

      if (uploadError) {
        throw uploadError;
      }


      // GET PUBLIC URL
      const {
        data: publicUrlData
      } = supabase.storage
        .from("invoices")
        .getPublicUrl(fileName);

      uploadedInvoice =
        publicUrlData.publicUrl;

    }



    // UPDATE DATABASE
    const { data, error } =
      await supabase
        .from("tracker")

        .update({

          segment:
            body.segment,

          customer_code:
            body.customerCode,

          customer_name:
            body.customerName,

          plant_location:
            body.plantLocation,

          invoice_date:
            body.invoiceDate,

          invoice_no:
            body.invoiceNo,

          material_code:
            body.materialCode,

          item:
            body.item,

          qty:
            body.qty,

          rate:
            body.rate,

          extra_amount:
            body.extraAmount,

          invoice_value:
            body.invoiceValue,

          remark:
            body.remark,

          uploaded_invoice:
            uploadedInvoice

        })

        .eq("id", id)

        .select();



    if (error) {
      throw error;
    }



    res.status(200).json({

      success: true,

      message:
        "Updated Successfully",

      data

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

};





/* =========================
   DELETE TRACKER DATA
========================= */

const deleteTrackerData =
  async (req, res) => {

  try {

    const { id } = req.params;

    const { error } =
      await supabase
        .from("tracker")
        .delete()
        .eq("id", id);

    if (error) {
      throw error;
    }

    res.status(200).json({

      success: true,

      message:
        "Deleted Successfully"

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

};





module.exports = {

  addTrackerData,

  getTrackerData,

  updateTrackerData,

  deleteTrackerData

};