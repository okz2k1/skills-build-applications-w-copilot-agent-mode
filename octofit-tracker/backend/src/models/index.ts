import mongoose, { Document, Model, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  profile: { displayName: string; level: string };
}

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
}

export interface ActivityDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  points: number;
  completedAt: Date;
}

export interface LeaderboardDocument extends Document {
  userId: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  period: string;
}

export interface WorkoutDocument extends Document {
  name: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  profile: {
    displayName: { type: String, required: true },
    level: { type: String, required: true },
  },
}, { timestamps: true });

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new Schema<ActivityDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  points: { type: Number, required: true, min: 0 },
  completedAt: { type: Date, required: true },
}, { timestamps: true });

const leaderboardSchema = new Schema<LeaderboardDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
  period: { type: String, required: true },
}, { timestamps: true });

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  exercises: [{ type: String }],
}, { timestamps: true });

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model('User', userSchema);
export const Team: Model<TeamDocument> = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity: Model<ActivityDocument> = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard: Model<LeaderboardDocument> = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout: Model<WorkoutDocument> = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);