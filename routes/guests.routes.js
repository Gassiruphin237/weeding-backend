const express = require("express")
const router = express.Router()

const {
  addGuest,
  getGuests
} = require("../controllers/guests.controller")

router.post("/", addGuest)
router.get("/", getGuests)

module.exports = router
