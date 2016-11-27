//export botflow = 
var botflow = require('./botflow.json');


function getFirstMessage() {
	return botflow.messages[0];
}