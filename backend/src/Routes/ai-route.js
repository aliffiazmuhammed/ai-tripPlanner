const express = require("express")
const aicontroller = require("../Controllers/ai.controller")
const router = express.Router()

router.post("/get-response", aicontroller.getresponse)

module.exports = router