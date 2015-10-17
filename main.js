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

    getSpareBonus = function (scores, index) {

    },

    getStrikeBonus = function (scores, index) {

    },

    calculateScore = function (score) {
        switch (true) {
            case isNull(score):
                return 0;

            case isStrike(score):
                return 10;

            case isSpare(score):
                return 5;
        }

        return parseInt(score, 10);
    },

    toScoreTotal = function (previousScore, currentScore) {
        return previousScore + currentScore;
    },

    calculateScores = function (scores) {
        var scoreParts = scores.split('');

        return scoreParts
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
