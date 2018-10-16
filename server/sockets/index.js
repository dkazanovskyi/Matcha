const indexSockets = (socket) => {
	console.log("Hello socket", socket.id)
	socket.on('chat message', function(msg){
		socket.emit('your message', msg)
		socket.broadcast.emit('chat message', msg)
	})
	socket.on('disconnect', function(){
		console.log('user disconnected')
	})
}



module.exports = indexSockets