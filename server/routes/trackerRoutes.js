const express = require("express");

const router = express.Router();

const {
  getTrackerData,
  addTrackerData,
  deleteTrackerData,
  updateTrackerData
} = require("../controllers/trackerController");

const validateTracker = require("../middleware/validationMiddleware");

const upload =
  require("../middleware/uploadMiddleware");


// GET
router.get("/", getTrackerData);


// POST
router.post(
  "/",
  upload.single("invoiceFile"),
  validateTracker,
  addTrackerData
);



// DELETE
router.delete("/:id", deleteTrackerData);


// UPDATE
router.put(
  "/:id",
  upload.single("invoiceFile"),
  validateTracker,
  updateTrackerData
);


module.exports = router;