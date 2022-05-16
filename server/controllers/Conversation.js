const accountSid = 'AC6945a6006a6be85f4e89ec2b53b5c58c';
const authToken = '6df8c38b9726b95239b48769f8962770';
const Boom = require('boom');
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
import universalFunctions from '../utils/universalFunctions'

module.exports={
    createConvo:async(req,res)=>{
try{
    let sid;
client.conversations.v1.conversations.create({friendlyName: 'My` First Conversation'})
                    .then(conversation =>{ console.log(conversation.sid);sid=conversation.sid;})
                    .catch(error => {throw Boom.badRequest(error);});
            
    //  if(!sid)
    //  {
    //      throw Boom.badRequest('error in creating convo');
    //  } 
     
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
        client.conversations.conversations('CH70856255e6124f01ba2b76555ecfc38c')
        .fetch()
        .then(conversation =>{ console.log(conversation.chatServiceSid);sid= conversation.chatServiceSid})
        .catch(error => {console.log(error);});
            
        //  if(!sid)
        //  {
        //      throw Boom.badRequest('error in fetching id of convo');
        //  } 
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
    
    client.conversations.conversations('CH70856255e6124f01ba2b76555ecfc38c')
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
            client.conversations.conversations('CH2bcd469128054af88405484404a46267')
            .participants
            .create({identity: 's'})
            .then(participant => {console.log(participant.sid);sid= participant.sid;})
            .catch(error => {console.log(error);});
            // if(!sid)
            //  {
            //      throw Boom.badRequest('error in creating convo');
            //  } 
             
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
