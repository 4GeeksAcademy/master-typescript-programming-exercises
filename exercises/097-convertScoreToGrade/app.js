"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertScoreToGrade(score) {
    // your code here
    return score > 100 || score < 0 ? "INVALID SCORE" : score > 90 ? "A" : score > 80 ? "B" : score > 70 ? "C" : score > 60 ? "D" : "F";
}
