
const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;
const Joi = require("@hapi/joi");
// const APP_CONSTANTS = require("../appConstants");
const Boom = require("boom");
import universalFunctions from "../utils/universalFunctions";

// Used when generating any kind of tokens
const twilioAccountSid = 'AC6945a6006a6be85f4e89ec2b53b5c58c';
const authToken = '6df8c38b9726b95239b48769f8962770';
const client = require('twilio')(twilioAccountSid, authToken);


const twilioApiKey = 'SK5ec9583c2a50abec25f55a021b827149';
const twilioApiSecret = 'n6q8ylEfNyMhdPISTh0zHwop8ltBBovI';

// Used specifically for creating Chat tokens
const serviceSid = 'IS81c99294a2344cec893f137c21d1bffb';
// const identity = 'user@example.com';
const conversationSid = 'CH70856255e6124f01ba2b76555ecfc38c';
// Create a "grant" which enables a client to use Chat as a given user,
// on a given device

module.exports = {
  getChatToken: async (req, res) => {
    try {
      const schema = Joi.object({
        // roomName: Joi.string().required(),
        identity: Joi.string().required(),
      });
      await universalFunctions.validateRequestPayload(req.body, res, schema);
      const chatGrant = new ChatGrant({
        serviceSid: serviceSid,
      });
      const identity = req.body.identity;

      // Create an access token which we will sign and return to the client,
      // containing the grant we just created
      const token = new AccessToken(
        twilioAccountSid,
        twilioApiKey,
        twilioApiSecret,
        // {identity: identity}
      );

      token.addGrant(chatGrant);
      token.identity = identity;

      // Serialize the token to a JWT string
      console.log(token.toJwt(), "twilioconfig");

      // return 400 if the request has an empty body or no roomName
      // console.log("twilioconfig",twilioConfig);
      // const identity = req.body.identity;
      // const room = req.body.roomName;
      // const token = videoToken(identity, room, twilioConfig);
      // sendTokenResponse(token, res);
      if (!token) {
        throw Boom.badRequest("token not found")
      }
      let sid;
      client.conversations.conversations(conversationSid)
        .participants
        .create({ identity: req.body.identity })
        .then(participant => { console.log(participant.sid); sid = participant.sid; })
        .catch(error => { console.log(error,'kya hai isme error') });

      universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "Chat successfully joined",
          data: token.toJwt(),
        },
        res
      );
    } catch (error) {
      universalFunctions.sendError(error, res);
    }
  },

}