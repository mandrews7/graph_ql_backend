import mongoose from 'mongoose';
import { Schema, model, connect } from 'mongoose'; 

interface Leaderboard {
    appName: string;
    boardName: string;
    ranks:[{rank: number, name: string, score: number}]
}

interface Rank{
  rank: string;
  name: string;
  score: number;
}

const rankSchema = new Schema<Rank>({
  rank:{type: String},
  name:{type: String},
  score:{type: Number},

})
  
const schema = new Schema<Leaderboard>({
    appName: { type: String },
    boardName: { type: String },
    ranks: [{rank: {type: Number}, name: {type: String}, score:{type: Number}}]
});

  // 3. Create a Model.
  export const LeaderboardModel = model<Leaderboard>('Leaderboard', schema);
  export const RankModel = model<Rank>('Rank', rankSchema);