var socket = io();

function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    // If display is near bottom of screen
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
        
    }

}


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

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // console.log('New message',message);
    // var ts = new moment(message.createdAt);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${ts.format('h:mm a')}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: moment(message.createdAt).format('h:mm a'),
        url: message.url
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // console.log('New location message',message);
    // var ts = new moment(message.createdAt);
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">Current Location</a>');
    // li.text(`${message.from} ${ts.format('h:mm a')} : `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'neha@example.com',
//     text: 'Whatsupappa'
// }, function(msg) {
//     console.log(msg);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(msg) {
        // Clear it once the callback from server is received
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    console.log('Getting geolocation');
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported on your browser');
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('Unable to fetch the current location');
        locationButton.removeAttr('disabled').text('Send Location');
    })
});