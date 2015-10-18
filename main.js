#! /usr/bin/env node

'use strict';

var scores = process.argv[2] || null,

    isLastShot = function (shotNumber) {
        return shotNumber >= 10;
    },

    isStrike = function (score) {
        return score === 'X';
    },

    isSpare = function (score) {
        return score === '/';
    },

    isNull = function (score) {
        return score === '-';
    },

    getBonus = function (score, scoreNumbers, index) {
        var i,
            bonus = 0,
            iterations = isStrike(score) ? 2 : 1;

        if (isLastShot(index + 1)) {
            return bonus;
        }

        for (i = 1; i <= iterations; i += 1) {
            if (!scoreNumbers[index + i]) {
                break;
            }

            if (isStrike(scoreNumbers[index + i]) || isSpare(scoreNumbers[index + i])) {
                bonus += 10;

            } else {
                bonus += scoreNumbers[index + i];
            }
        }

        return bonus;
    },

    createCalculator = function (scores) {
        return function calculateScore(score, index) {
            if (isStrike(score) || isSpare(score)) {
                return 10 + getBonus(score, scores, index);
            }

            return score;
        };
    },

    toScoreTotal = function (previousScore, currentScore) {
        return previousScore + currentScore;
    },

    toIntegerIfPossible = function (score) {
        var parsedInt;

        // empty scores '-' are worth 0 and have no need for any special behaviour.
        if (isNull(score)) {
            parsedInt = 0;

        } else {
            parsedInt = parseInt(score, 10);
        }

        return isNaN(parsedInt) ? score : parsedInt;
    },

    outPreSpareScores = function (score, index) {
        // you can only have a spare as the second shot of a turn
        if ((index + 1) % 2 === 1 && isSpare(scores[index + 1])) {
            return false;
        }

        return score;
    },

    calculateScores = function (scores) {
        var scoreParts     = scores.split(''),
            calculateScore = createCalculator(scoreParts);

        return scoreParts
            .map(toIntegerIfPossible)
            .map(calculateScore)
            .filter(outPreSpareScores(scores))
            .reduce(toScoreTotal, 0);
    };

if (scores) {
    console.log("calculated score:", calculateScores(scores));
}

exports.scoreGame = function (_scores) {
    scores = _scores;
    return calculateScores(scores);
};
