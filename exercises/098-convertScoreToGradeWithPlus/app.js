"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertScoreToGradeWithPlusAndMinus(score) {
    // your code here
    return score > 100 || score < 0 ? 'INVALID SCORE' : score > 90 ? `A${score < 93 ? '-' : score > 97 ? '+' : ''}` : score > 80 ? `B${score < 83 ? '-' : score > 87 ? '+' : ''}` : score > 70 ? `C${score < 73 ? '-' : score > 77 ? '+' : ''}` : score > 60 ? `D${score < 63 ? '-' : score > 67 ? '+' : ''}` : "F";
}
