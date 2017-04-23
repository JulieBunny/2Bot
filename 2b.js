#!/usr/bin/env node

const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
    msg.reply('Pong!');
}
});

client.login(fs.readFile('token'));