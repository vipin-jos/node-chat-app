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

socket.on('newLocationMessage', function(message) {
    console.log('New location message',message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    console.log('Getting geolocation');
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported on your browser');
    } 
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch the current location');
    })
});