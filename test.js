const No2TypeB = require('./2b_commands.js');

function testCommand(command) {
	var commandResult = No2TypeB.executeCommand(command);
	console.log(command, commandResult.output);
}

testCommand("!info");
testCommand("!nextraid");