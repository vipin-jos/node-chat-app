var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'sayana@example.com',
    //     text: 'Hi this is Vipin'
    // });

    socket.emit('createMessage', {
        from: 'neha@example.com',
        text: 'Whatsupappa'
    });

});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// Custom event
// socket.on('newEmail', function(email) {
//     console.log('New email',email);
// });

socket.on('newMessage', function(message) {
    console.log('New message',message);
});