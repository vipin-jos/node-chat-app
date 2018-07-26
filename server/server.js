const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    socket.emit('newMessage',{
        from: 'Vipin@example.com',
        text: 'Whatsup',
        createdAt: 123
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail',newEmail);
    // });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage',newMessage);
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

