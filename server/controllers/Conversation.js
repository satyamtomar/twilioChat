const accountSid = 'AC6945a6006a6be85f4e89ec2b53b5c58c';
const authToken = 'bb5d6f3f0157b481f2e85bdb80dd1f7f';
const Boom = require('boom');
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);
import universalFunctions from '../utils/universalFunctions'

module.exports={
    createConvo:async(req,res)=>{
try{
    let sid;
client.conversations.v1.conversations.create({friendlyName: 'My First Conversation'})
                    .then(conversation =>{ console.log(conversation.sid);sid=conversation.sid;})
                    .catch(error => {universalFunctions.sendError(error, res);});
            
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
        client.conversations.conversations('CH2bcd469128054af88405484404a46267')
        .fetch()
        .then(conversation =>{ console.log(conversation.chatServiceSid);sid= conversation.chatServiceSid})
        .catch(error => {universalFunctions.sendError(error, res);});
            
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
    addParticipant:async (req,res)=>{
        try{
            let sid;
            client.conversations.conversations('CH2bcd469128054af88405484404a46267')
            .participants
            .create({identity: 'testPineapple'})
            .then(participant => {console.log(participant.sid);sid= participant.sid;})
            .catch(error => {universalFunctions.sendError(error, res);});
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
