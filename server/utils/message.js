const moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new moment().valueOf()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    //https://www.google.co.in/maps?q=${newLocationMessage.latitude},${newLocationMessage.longitude}
    return {
        from,
        url: `https://www.google.co.in/maps?q=${latitude},${longitude}`,
        createdAt: new moment().valueOf()
    }
};

module.exports = {generateMessage, generateLocationMessage};