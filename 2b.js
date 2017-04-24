#!/usr/bin/env node

const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");

const client = new Discord.Client();

client.on('ready', () => {
    console.log("Successfully logged in.");
});

client.on('message', msg => {
    if (msg.content === '!2b') {
        msg.channel.send('I am in the early phases of my development.' +
            '\n\n' +
            'If you have any requests or idea, you may send them to <@83957952582520832>' +
            '\n' +
            'You can contribute here: <https://github.com/JulieCheckmaid/2Bot>' +
            '\n\n' +
            'Available commands:' +
            '\n\n' +
            '!nextraid' +
            '\n' +
            '!hype');
    }
    if (msg.content === '!nextraid') {
        msg.channel.send('There is currently no scheduled raid.');
    }
    if (msg.content === '!hype') {
        var sb = moment('2017-06-20');
        var now = moment();
        var diff = sb-now;

        var days = diff / 1000 / 60 / 60 / 24;
        var hours = (days - (Math.floor(days))) * 24;
        var minutes = (hours - (Math.floor(hours))) * 60;
        var seconds = (minutes - (Math.floor(minutes))) * 60;
        var daysText = Math.floor(days) + " days ";
        var hoursText = Math.floor(hours)  + " hours ";
        var minutesText = Math.floor(minutes) + " minutes ";
        var secondsText = Math.floor(seconds) + " seconds ";

        var diffText = daysText + hoursText + minutesText + secondsText;

        msg.channel.send('Stormblood releases in ' + diffText);
    }

    //random commands
    if (msg.content === '!joygun') {
        msg.channel.send(':joy: :gun:');
    }

});

//get token
var token = fs.readFileSync("token").toString();

client.login(token);