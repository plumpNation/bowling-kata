var main = require('./main'),
    expect = require('chai').expect;

describe('bowling kata', function () {
    it('should score a 11111111111111111111 game at 20', function () {
        expect(main.scoreGame('11111111111111111111')).to.equal(20);
    });

    it('should score 1/1/1/1/1/1/1/1/1/1/1 at 110', function () {
        expect(main.scoreGame('1/1/1/1/1/1/1/1/1/1/1')).to.equal(110);
    });

    it('should score 5422441123239--93745 at 69', function () {
        expect(main.scoreGame('5422441123239--93/40')).to.equal(69);
    });

    it('should score 5422441123239--93745 at 94', function () {
        expect(main.scoreGame('81729-817272819-43X32')).to.equal(94);
    });

    it('should score a perfect game at 300', function () {
        expect(main.scoreGame('XXXXXXXXXXXX')).to.equal(300);
    });
});
