#! /usr/bin/env node

var scores = process.argv[2] || null,

    isStrike = function (score) {
        return score === 'X';
    },

    isSpare = function (score) {
        return score === '/';
    },

    isNull = function (score) {
        return score === '-';
    },

    createCalculator = function (scores) {
        return function (score, index) {
            switch (true) {
                case isStrike(score):
                    return 10 + getStrikeBonus(scores, index);

                case isSpare(score):
                    return 10 + getSpareBonus(scores, index);
            }

            return score;
        };
    },

    getSpareBonus = function (scores, index) {

    },

    getStrikeBonus = function (scores, index) {
        var calc = createCalculator(scores);

        return calc(scores[index + 1], index + 1) + calc(scores[index + 2], index + 2);
    },

    toScoreTotal = function (previousScore, currentScore) {
        return previousScore + currentScore;
    },

    toIntegerIfPossible = function (score) {
        var parsedInt;

        // empty scores '-' are worth 0 and have no need for any special behaviour.
        if (isNull(score)) {
            score = 0;

        } else {
            score = parseInt(score, 10);
        }

        return isNaN(parsedInt) ? score : parsedInt;
    },

    calculateScores = function (scores) {
        var scoreParts = scores.split(''),
            calculateScore = createCalculator(scores);

        return scoreParts
            .map(toIntegerIfPossible)
            .map(calculateScore)
            .reduce(toScoreTotal, 0);
    };

if (scores) {
    console.log("calculated score:", calculateScores(scores));
}

exports.scoreGame = function (_scores) {
    scores = _scores;
    return calculateScores(scores);
};
