const moment = require("moment");

var commands = {
	'2b': _2b
	,nextraid: nextraid
	,hype: hype
	//random commands
	,joygun: joygun
}

function _2b() {
	return {
		output: 
			'I am in the early phases of my development.' +
			'\n\n' +
			'If you have any requests or idea, you may send them to <@83957952582520832>' +
			'\n' +
			'You can contribute here: <https://github.com/JulieCheckmaid/2Bot>' +
			'\n\n' +
			'======================================================================================' +
			'\n\n' +
			'Available commands:' +
			'\n\n' +
			'!nextraid' +
			'\n' +
			'!hype'
	};
}

function nextraid() {
	return {
		output: 'There is currently no scheduled raid.'
	};
}

function hype() {
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
	
	return {
		output: 'Stormblood releases in ' + diffText
	};
}

function joygun() {
	return {
		output: ':joy: :gun:'
	};
}

exports.executeCommand = function(command) {
	//Starts with '!'?
	if (!command.match(/^!/))
		return {};
	command = command.replace(/^!/, '');
	
	if (!commands[command]) {
		return {};
	} else {
		return commands[command]();
	}
}
