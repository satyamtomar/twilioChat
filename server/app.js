
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const express = require("express");
const cors=require('cors');
const app = express();

const port = 5001;
const {CHAT_ROUTES,CONVO_ROUTES} =require('./routes');
// use the Express JSON middleware
app.use(express.json());
app.use(cors());


app.use('/',CHAT_ROUTES);
app.use('/',CONVO_ROUTES);
// Start the Express server
app.listen(port, () => {
  console.log(process.env,'env');
  console.log(`Express server running on port ${port}`);
});