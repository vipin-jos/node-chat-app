const expect = require('expect');
const {generateMessage} = require('./message');

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