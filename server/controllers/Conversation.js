const accountSid =process.env.twilioAccountSid;
const authToken = process.env.authToken;
// require("dotenv").config({});
const Boom = require('boom');
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
import universalFunctions from '../utils/universalFunctions'

module.exports={
    createConvo:async(req,res)=>{
try{
    let sid;
await client.conversations.v1.conversations.create({friendlyName: 'My  Conversation',uniqueName:'A'})
                    .then(conversation =>{ console.log(conversation.sid);sid=conversation.sid;})
                    .catch(error => {throw Boom.badRequest(error);});
            
     if(!sid)
     {
         throw Boom.badRequest('error in creating convo');
     } 
     
     universalFunctions.sendSuccess(
        {
          statusCode: 200,
          message: "convo created ",
          data:sid,
        },
        res
      );
    }

catch(error){
    universalFunctions.sendError(error,res);
}
    // CHf95a2ccbec0b4930a14b12a7586adedf
   // CH2bcd469128054af88405484404a46267
  
},
fetchConvo:async(req,res)=>{
    try{
        let sid;
      await  client.conversations.conversations('CHfe59757cc1ed4685845e09af9a4449b4')
        .fetch()
        .then(conversation =>{ console.log(conversation);sid= conversation.chatServiceSid})
        .catch(error => {console.log(error);});
            
         if(!sid)
         {
             throw Boom.badRequest('error in fetching id of convo');
         } 
        //  IS81c99294a2344cec893f137c21d1bffb
         universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: "convo fetched ",
              data:sid,
            },
            res
          );
        }
    
    catch(error){
        universalFunctions.sendError(error,res);
    }
        // CHf95a2ccbec0b4930a14b12a7586adedf
       // CH2bcd469128054af88405484404a46267
       
    },
    addSms:async (req,res)=>{
try{
    
    client.conversations.conversations('CHfe59757cc1ed4685845e09af9a4449b4')
  .participants
  .create({
     'messagingBinding.address': '+918630377298',
     'messagingBinding.proxyAddress': '+18645727941'
   })
  .then(participant => console.log(participant.sid));

}
catch(error)
{
    universalFunctions.sendError(error,
        res);
}
    },
    addParticipant:async (req,res)=>{
        try{
            let sid;
         await   client.conversations.conversations('CHfe59757cc1ed4685845e09af9a4449b4')
            .participants
            .create({identity: 's'})
            .then(participant => {console.log(participant.sid);sid= participant.sid;})
            .catch(error => {console.log(error);});
            // if(!sid)
            //  {
            //      throw Boom.badRequest('error in creating convo');
            //  } 
            if(!sid)
            {
              throw Boom.badRequest('no participant added')
            }
           
             
             universalFunctions.sendSuccess(
                {
                  statusCode: 200,
                  message: "convo fetched ",
                  data:sid,
                },
                res
              );
            }
        
        catch(error){
            universalFunctions.sendError(error,res);
        }
            // CHf95a2ccbec0b4930a14b12a7586adedf
           // CH2bcd469128054af88405484404a46267
           
        },
}
