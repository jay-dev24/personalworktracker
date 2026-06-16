const validateTracker = (req, res, next) => {

  const body = req.body;

  if (!body.customerName) {
    return res.status(400).json({
      success: false,
      message: "Customer Name is required"
    });
  }

  if (!body.invoiceNo) {
    return res.status(400).json({
      success: false,
      message: "Invoice Number is required"
    });
  }

  if (!body.qty) {
    return res.status(400).json({
      success: false,
      message: "Quantity is required"
    });
  }

  if (!body.rate) {
    return res.status(400).json({
      success: false,
      message: "Rate is required"
    });
  }

  next();

};

module.exports = validateTracker;