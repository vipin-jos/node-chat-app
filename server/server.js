const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');

// this is for heroku. If the environment variable port exisits it assigns, else uses 3000
const port = process.env.PORT || 3000;

var app = express();
// This is needed for socket io
var server = http.createServer(app);
// This is the WEB SOCKET SERVER. using this we can listen or emit
var io = socketIO(server);
// Once we do this, in the browser we can access "http://localhost:3000/socket.io/socket.io.js". 

const publicPath = path.join(__dirname,'/../public');
// demonstrates benefit of path.join() function
console.log(__dirname+'/../public');
console.log(publicPath);

app.use(express.static(publicPath));
//on() allows you to register an event listener. We can listen for a specific event and do something when event is fired.
//an example is 'connection'
io.on('connection',(socket) => {
    console.log('New user connected');

    // socket.emit('newEmail',{
    //     from: 'mike@example.com',
    //     text: 'Hi, How r u',
    //     createdAt: 123
    // });

    // socket.emit('newMessage',{
    //     from: 'Vipin@example.com',
    //     text: 'Whatsup',
    //     createdAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail',newEmail);
    // });

    socket.emit('newMessage', generateMessage('Admin','Hi! Welcome to the Chat App'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user has joined'));

    // Call back is a function that can be used to send an acknowledgement
    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage',newMessage);
        callback('this is an acknowledgement from the server');
        // Socket.emit sends to one. io.emit broadcasts to all connected
        io.emit('newMessage',generateMessage(newMessage.from, newMessage.text));
        
        //socket.broadbast.emit works like the above one.
        // But the major difference is that it broadcasts to everyone except for this user (io.emit sends to all including this user)
        // socket.broadcast.emit('newMessage',{
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',(newLocationMessage,callback) => {
        console.log(`${newLocationMessage.latitude} , ${newLocationMessage.longitude} `);
        io.emit('newLocationMessage',generateLocationMessage('Admin', newLocationMessage.latitude,newLocationMessage.longitude));
    });


    socket.on('disconnect',() => {
        console.log('User disconnected');
    });
});



app.get('/',(req,res) => {
    res.render('index.html');
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

