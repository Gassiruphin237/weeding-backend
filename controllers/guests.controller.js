const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "../data/guests.json")

const readData = () => {
  const data = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(data)
}

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

exports.addGuest = (req, res) => {
  const {
    name,
    phone,
    is_attending,
    guests_count,
    message
  } = req.body

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: "Nom et téléphone requis"
    })
  }

  const guests = readData()

  const alreadyExists = guests.find(
    g => g.phone === phone
  )

  if (alreadyExists) {
    return res.status(409).json({
      success: false,
      message: "Ce numéro a déjà confirmé sa présence."
    })
  }

  const newGuest = {
    id: Date.now(),
    name,
    phone,
    is_attending,
    guests_count,
    message,
    created_at: new Date().toISOString()
  }

  guests.push(newGuest)
  writeData(guests)

  res.status(201).json({
    success: true,
    data: newGuest
  })
}

exports.getGuests = (req, res) => {
  const guests = readData()
  res.json({
    success: true,
    total: guests.length,
    data: guests
  })
}
