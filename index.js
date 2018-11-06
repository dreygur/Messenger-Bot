/*
 * Reply my Bitch
 *
 * Specially Designed to reply my Bitch
 * You Have One?
 * No worry!
 * You also can use it...
 */

// Collecting Modules
const login     = require("facebook-chat-api");
const apiai     = require("apiai");
const readline  = require("readline");
const fs        = require("fs");
const log       = require("npmlog");

// Tokens
const APIAI_TOKEN = process.env.APIAI_TOKEN || ''; // DialogFlow APi Key
const apiaiApp = apiai(APIAI_TOKEN);

// User Credentials
const email = ''; // Your Username
const pass  = ''; // Your Password

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });  

/* GET query from API.ai */
function sendMessage(api, message, messageId) {
    let text = message;
    let ID = messageId;
  
    let apiai = apiaiApp.textRequest(text, {
      sessionId: 'bitch'
    });
  
    apiai.on('response', (response) => {
      //console.log(response)
      let aiText = response.result.fulfillment.speech;
      log.info("Chat", "Get > "+message+" & Sent > "+aiText);
      //console.log("Get > "+message+"\nSent > "+aiText);
      api.sendMessage(aiText, ID);
    });
  
    apiai.on('error', (error) => {
      console.log(error);
    });
  
    apiai.end();
};

try{
    login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
        if(err) return console.error(err);
        api.listen((err, message) => {
            // api.sendMessage(message.body, message.threadID);
            sendMessage(api, message.body, message.threadID);
        });
    });
}
catch(error) {
    login({email: email, password: pass}, (err, api) => {
        if(err) {
            switch (err.error) {
                case 'login-approval':
                    console.log('Enter code > ');
                    rl.on('line', (line) => {
                        err.continue(line);
                        rl.close();
                    });
                    break;
                default:
                    console.error(err);
            }
            return;
        }
        fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
        api.listen((err, message) => {
            // api.sendMessage(message.body, message.threadID);
            sendMessage(api, message.body, message.threadID);
        });
    });
}