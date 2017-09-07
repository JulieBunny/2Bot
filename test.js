const No2TypeB = require('./2b_commands.js');

function testCommand(command) {
	No2TypeB.executeCommand(command).then((commandResult) => {
		console.log(command, commandResult.output);
	});
}

testCommand("!info");
testCommand("!nextraid");