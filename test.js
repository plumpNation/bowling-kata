var main = require('./main'),
    expect = require('chai').expect;

describe('bowling kata', function () {
    it('should score a 11111111111111111111 game at 20', function () {
        expect(main.scoreGame('11111111111111111111')).to.equal(20);
    });

    it('should score a perfect game at 300', function () {
        expect(main.scoreGame('XXXXXXXXXXXXX')).to.equal(300);
    });
});
