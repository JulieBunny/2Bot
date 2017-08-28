const moment = require("moment");

/**
 * List of available commands.
 */
var commands = {
	//TODO commands with multiple aliases?
	'2b': _2b
	,'nextraid': nextraid
};

/**
 * Information on the discord bot.
 * @returns {{output: string}}
 */
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
            '!2b' +
			'\n\n' +
			'!nextraid'
	};
}

/**
 * Returns the date for the next raid.
 * @returns {{output: string}}
 */
function nextraid() {
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