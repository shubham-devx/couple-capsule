const express = require("express");

const {
  createCapsule,
  getCapsule,
  addMemory,
  updateAnniversaryDate,
} = require("../controllers/capsuleController");

const router = express.Router();

router.post("/create", createCapsule);

router.get("/:roomId", getCapsule);

router.post("/:roomId/memory", addMemory);
router.put("/:roomId/date", updateAnniversaryDate);

module.exports = router;