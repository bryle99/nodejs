var net = require('net');
var HOST = '172.16.9.11';
var PORT = 3000;
var readline = require('readline');

net.createServer(function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    sock.on('data', function(data) { 	
		console.log('Reply:' + data);
			//sock.write('You said "' + data + '"');
		var rl = readline.createInterface({
		  input: process.stdin,
		  output: process.stdout,
		  terminal: false
		});
		rl.question("Message: ", function(answer) {
			data = answer;
			sock.write(data);
		}); 
		
    });    
}).listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);