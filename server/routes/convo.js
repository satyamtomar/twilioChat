const express = require("express");
const router = express.Router();
const convoController=require('../controllers/Conversation');

router.route("/createConvo").get(convoController.createConvo);
router.route("/fetchConvo").get(convoController.fetchConvo);
router.route("/addParticipant").get(convoController.addParticipant);

router.route("/addSms").get(convoController.addSms);

module.exports = router;
