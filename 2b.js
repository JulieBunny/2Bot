#!/usr/bin/env node

const Discord = require("discord.js");
const fs = require("fs");
const No2TypeB = require('./2b_commands.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Successfully logged in.");
});

client.on('message', msg => {

	var commandResult = No2TypeB.executeCommand(msg.content);
	if (commandResult.output)
		msg.channel.send(commandResult.output);
	
});

//get token
var token = fs.readFileSync("token").toString();

client.login(token);
