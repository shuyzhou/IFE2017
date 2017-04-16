const run = require('../concurrent');
module.exports = function(server) {
    const io = require('socket.io')(server);
    io.on('connection',function(socket) {
        run(socket);
    });
}