const express = require("express");
const router = express.Router();
const roomController=require('../controllers/Chat');

router.route("/getChatToken").post(roomController.getChatToken);

module.exports = router;
