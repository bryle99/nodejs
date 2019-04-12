var net = require('net');
var readline = require('readline');
var HOST = '172.16.9.19';
var PORT = 3001;
var client = new net.Socket();

var name = "jeke";

var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout,
	  terminal: false
});

client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	process.stdout.clearLine();
    process.stdout.cursorTo(0);
	rl.question("Message: ", function(answer) {
		client.write(answer);
	}); 
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    console.log("Reply: "+data); 
	process.stdout.clearLine();
    process.stdout.cursorTo(0);	
	rl.question("Message: ", function(answer) {
		client.write(answer);
	});	
});
