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
	,'nextraid': getNextRaid
};

/**
 * Information on the discord bot.
 *
 * @returns {{output: string}}
 */
function _2b() {
	return new Promise((resolve, reject) => {
		resolve({
			output: `I am in the early phases of my development.

If you have any requests or ideas, you may send them to <@83957952582520832>
You can contribute here: <https://github.com/JulieCheckmaid/2Bot>

======================================================================================

Available commands:

!2b

!nextraid`
		});
	});
};

/**
 * Returns the date for the next raid.
 *
 * @returns {{output: string}}
 */
function getNextRaid() {
	return new Promise((resolve, reject) => {
		//Use google API to read next event and output the date (hour range or duration).
		No2TypeB_Calendar.nextRaid().then((nextRaid) => {
			if (nextRaid) {
				let date = moment.tz(nextRaid.start.dateTime, 'America/New_York').format('dddd, MMMM D');
				let times = getAllRaidTimes(nextRaid.start.dateTime).join('\n\t');
				let type = getEventType(nextRaid.summary);
				
				resolve({
					output: `Next raid is on:
${date}
	${times}
Type: ${type}`
				});
			} else {
				//If there is no event found in the future, return message saying so to user.
				resolve({output: 'There is currently no scheduled raid.'});
			}
		})
	});
};

exports.executeCommand = (command) => {
	return new Promise((resolve, reject) => {
		//Starts with '!'?
		if (!command.match(/^!/)) {
			resolve({});
			return;
		}
		command = command.replace(/^!/, '');
		
		if (!commands[command]) {
			resolve({});
		} else {
			commands[command]().then((result) => {
				resolve(result);
			});
		}
	});
};

function getEventType(summary) {
	//Todo: figure out a standard for raid summaries, then parse it's type.
	return summary;
}

function getAllRaidTimes(raidTime) {
	const locales = ['America/New_York',
	               'America/Denver',
	               'America/Phoenix',
	               'America/Los_Angeles'];
	
	//We use a Set to remove duplicate timezones, then make it an array again with spreading syntax!
	return [...new Set(locales.map(function(locale) {
		return moment.tz(raidTime, locale).format('h:mm a z');
	}))];
}