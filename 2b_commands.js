//General features
//TODO Multiple types for events (Farm, Progression, Parse, Others?)

//Random, less important ideas
//TODO Ability to confirm attendance for specific raids?
//TODO Multiple timezones support?

const No2TypeB_Calendar = require('./2b_calendar.js');
const moment = require("moment-timezone");

/**
 * List of available commands.
 */
const commands = {
	//To make commands with multiple aliases, make multiple properties of the commands object pointing to the same function.
	'2b': _2b
	,'info': _2b
	,'nextraid': nextRaid
};

/**
 * Information on the discord bot.
 *
 * @returns {{output: string}}
 */
function _2b() {
	return {
		output: `I am in the early phases of my development.

If you have any requests or ideas, you may send them to <@83957952582520832>
You can contribute here: <https://github.com/JulieCheckmaid/2Bot>

======================================================================================

Available commands:

!2b

!nextraid`
	};
}

/**
 * Returns the date for the next raid.
 *
 * @returns {{output: string}}
 */
function nextRaid() {
	//Use google API to read next event and output the date (hour range or duration).
	No2TypeB_Calendar.nextRaid(function(nextRaid) {
		//uh oh gotta make everything synchronous
		//...Or switch bot to asynchronous, yeah way better...
		if (nextRaid) {
			console.log('Next raid is on ' +
				moment.tz(nextRaid.start.dateTime, 'America/New_York').format('dddd, MMMM D, h:mm a z') +
				'. Type: ' +
				getEventType(nextRaid.summary));
		} else {
			console.log('There is currently no scheduled raid.');
		}
	})
    
	//If there is no event found in the future, return message saying so to user.
	return {
		output: 'There is currently no scheduled raid.'
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
};

function getEventType(summary) {
	//Todo: figure out a standard for raid summaries, then parse it's type.
	return summary;
}
