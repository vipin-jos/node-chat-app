var socket = io();
socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     to: 'sayana@example.com',
    //     text: 'Hi this is Vipin'
    // });



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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'neha@example.com',
//     text: 'Whatsupappa'
// }, function(msg) {
//     console.log(msg);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(msg) {
        
    });
});