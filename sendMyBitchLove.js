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
const readline  = require("readline");
const fs        = require("fs");
const log       = require("npmlog");

// User Credentials
const email = 'rytotul'; // Your Username
const pass  = 'RYT.Yeasin@@@0101'; // Your Password

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var love = [
    "ভালবাসি বউ",
    "বউ ভালবাসি",
    "ঐ ভালবাসি",
    "ম্যাম, ভালবাসি আপনাকে",
    "বাবুর মা, ভালবাসি",
    "রাতুলের মা...",
    "ও ম্যাম!",
    "বউ!!!",
    "বউগো!!!",
    "ভালবাসি"
]

try{
    login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
        if(err) return console.error(err);
        setInterval(() => {
            var randomNumber = Math.floor(Math.random()*love.length);
            api.sendMessage(love[randomNumber], "100027948102857");
            console.log(love[randomNumber]);
        }, 1000);
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
        setInterval(() => {
            var randomNumber = Math.floor(Math.random()*love.length);
            api.sendMessage(love[randomNumber], "100027948102857");
            console.log(love[randomNumber]);
        }, 1000);
    });
}