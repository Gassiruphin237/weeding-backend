const express = require("express")
const cors = require("cors")

const guestRoutes = require("./routes/guests.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/guests", guestRoutes)

module.exports = app
