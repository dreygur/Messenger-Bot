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
const email = ''; // Your Username
const pass  = ''; // Your Password
const she   = ''; // Your GF

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var love = [
    "Some Strings",
    "to",
    "Appologise"
]

try{
    login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
        if(err) return console.error(err);
        setInterval(() => {
            var randomNumber = Math.floor(Math.random()*love.length);
            api.sendMessage(love[randomNumber], she);
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
            api.sendMessage(love[randomNumber], she);
            console.log(love[randomNumber]);
        }, 1000);
    });
}
