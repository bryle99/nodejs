var net = require('net');
var HOST = '172.16.9.11';
var PORT = 3001;
var readline = require('readline');

var clients = [];

net.createServer(function(sock) {
    
	console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
	sock.name = sock.remoteAddress + ":" + sock.remotePort
	// if(sock.remoteAddress == '172.16.9.30'){
	// 	sock.name = 'bryle'
	// }else{
	// 	sock.name = sock.remoteAddress + ":" + sock.remotePort
	// }

	clients.push(sock);
    
	sock.on('data', function(data) { 	
		console.log(sock.name + data);
		var str = data
		if(str.includes("::")){
			//console.log("naa");		
			var ndx = str.indexOf("::");
			var recepient = str.slice(0, ndx-1);
			//console.log(recepient);
			sendTo(data, recepient, sock)					
		}else{
			sendAll(data,sock);
		} 	
    });   
	
}).listen(PORT, HOST);

function sendAll(message, sender)
{

	clients.forEach(function (client) {
		//if(client.remoteAddress == '172.16.9.30')
		if(client !== sender)
		{
			// clients.forEach(function(client1){
			// 	if(client1.name = 'bryle'){
			// 		client1.
			// 	}
			// });
			client.write(sender.name + ": " + message);  
		}
    });
    
    process.stdout.write(message);
}

function sendTo(message, recepient, sender)
{
	clients.forEach(function (client){
		if(client.remoteAddress == recepient){
			client.write(sender.name + ": " + message);
		}
	});
}

// function sendPM(message, sender)
// {

// }
console.log('Server listening on ' + HOST +':'+ PORT);