"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankModel = exports.LeaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const rankSchema = new mongoose_1.Schema({
    rank: { type: String },
    name: { type: String },
    score: { type: Number },
});
const schema = new mongoose_1.Schema({
    appName: { type: String },
    boardName: { type: String },
    ranks: [{ rank: { type: Number }, name: { type: String }, score: { type: Number } }]
});
// 3. Create a Model.
exports.LeaderboardModel = (0, mongoose_1.model)('Leaderboard', schema);
exports.RankModel = (0, mongoose_1.model)('Rank', rankSchema);
