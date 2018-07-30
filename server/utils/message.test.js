const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Vipin';
        var text = 'Sample text for test';
        var res = generateMessage(from,text);
        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({
            from: from,
            text: text
        });
    });
});

describe('generateLocationMessage',() => {
    it('should generate correct location message', () => {
        var from = 'Admin';
        var latitude = '8.5024768';
        var longitude = '76.9507328';
        var res = generateLocationMessage(from,latitude,longitude);
        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({
            from: from,
            url: `https://www.google.co.in/maps?q=${latitude},${longitude}`
        });
    });
});