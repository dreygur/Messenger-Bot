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

// Dialogflow ATokens
const startAndStop  = '136e41d03908467395ec73132ddf52e6';
const rakibulYeasin = 'f345f0d9b6e24007a9fcb6f64a92cd2f'; // Agent RakibulYeasin
let apiaiApp = apiai(rakibulYeasin); // Define null fist

// User Credentials
const email = ''; // Your Username
const pass  = ''; // Your Password


// Reply for Different Users
const GF          = "100027948102857";
const partha      = "100018292840636";
const rytotul     = "100003548132197";
const controller  = "303155770472818";
const himel       = "100015385116825";

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Switch to on or off
let flag = 1; 

// Default Answers
const ansWers = [
    'স্যার ব্যাস্ত...',
    'বস একটু বিজি।\nপরে নক দেয়া যাবে?',
    'গুরু একটু বিশ্রামে আছেন, নয়তো কাজে।\nউনি আসলে রিপ্লাই দেবে।',
    'স্যার এখন অনেক ব্যাস্ত।\nদযা করে পরে নক দেন...'
]


// Ask for Username and Password
function askUserName() {
    console.log("Enter Username: ")
    rl.on('user', (user) => {
        err.continue(user);
        rl.close();
    });
    onsole.log("Enter Password: ")
    rl.on('user', (pass) => {
        err.continue(pass);
        rl.close();
    });
}

/* GET query from API.ai */
function sendMessage(api, message, messageId) {
    let text = message;
    let ID = messageId;
  
    let apiai = apiaiApp.textRequest(text, {
      sessionId: 'RakibulYeasin'
    });

    apiai.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      log.info("Chat", "Get > "+message+" & Sent > "+aiText+" UserID> "+ID);
      api.sendMessage(aiText, ID);
    });

    apiai.on('error', (error) => {
      console.log(error);
    });

    apiai.end();
};

function decideMessage(api, message, userID) {
        if (userID == himel) {
            apiaiApp = apiai(rakibulYeasin);
            sendMessage(api, message, userID);
        } else {
            let rndSelect = Math.floor(Math.random()*ansWers.length); // Random Number Generator
            let defaultText = ansWers[rndSelect];
            log.info("Chat", "Get > "+message+" & Sent > "+defaultText+" UserID> "+userID);
            api.sendMessage(defaultText, userID);
        }
};

try{
    login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
        if(err) return console.error(err);
        api.listen((err, message) => {
            if (message.threadID == controller) {
                if (message.body == "start-rytotul-221") flag = 1;
                else if (message.body == "stop-rytotul-221") flag = 0;
            }
            if (flag == 1) {
                decideMessage(api, message.body, message.threadID);
            } else log.info("Status", "Ignored... | "+message.body+" | "+message.threadID);
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
            decideMessage(api, message.body, message.threadID);
        });
    });
}
