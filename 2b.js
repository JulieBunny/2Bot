const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

const No2TypeB = require('./2b_commands.js');

client.on('ready', () => {
    console.log("Successfully logged in.");
});

client.on('message', msg => {

	let commandResult = No2TypeB.executeCommand(msg.content);
	if (commandResult.output)
		msg.channel.send(commandResult.output);
	
});

//get token
let token = fs.readFileSync("token").toString();

client.login(token);