"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.Leaderboard.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const users = await models_1.User.insertMany([
            { username: 'maya-chen', email: 'maya@example.com', profile: { displayName: 'Maya Chen', level: 'Intermediate' } },
            { username: 'jon-bell', email: 'jon@example.com', profile: { displayName: 'Jon Bell', level: 'Beginner' } },
            { username: 'samira-khan', email: 'samira@example.com', profile: { displayName: 'Samira Khan', level: 'Advanced' } },
        ]);
        await models_1.Team.create({ name: 'Morning Momentum', description: 'Build a consistent start to every day.', members: users.map((user) => user._id) });
        await models_1.Activity.insertMany([
            { userId: users[0]._id, type: 'Run', durationMinutes: 35, points: 70, completedAt: new Date('2026-08-30') },
            { userId: users[1]._id, type: 'Yoga', durationMinutes: 25, points: 50, completedAt: new Date('2026-08-31') },
            { userId: users[2]._id, type: 'Strength', durationMinutes: 45, points: 90, completedAt: new Date('2026-08-31') },
        ]);
        await models_1.Leaderboard.insertMany([
            { userId: users[2]._id, points: 420, rank: 1, period: 'weekly' },
            { userId: users[0]._id, points: 350, rank: 2, period: 'weekly' },
            { userId: users[1]._id, points: 260, rank: 3, period: 'weekly' },
        ]);
        await models_1.Workout.insertMany([
            { name: 'Full Body Reset', category: 'Strength', difficulty: 'Intermediate', durationMinutes: 30, exercises: ['Squats', 'Push-ups', 'Plank'] },
            { name: 'Easy Recovery Flow', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 20, exercises: ['Cat-cow', 'Low lunge', 'Child pose'] },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
