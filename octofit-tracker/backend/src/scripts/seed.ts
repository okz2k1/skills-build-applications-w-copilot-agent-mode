import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'maya-chen', email: 'maya@example.com', profile: { displayName: 'Maya Chen', level: 'Intermediate' } },
      { username: 'jon-bell', email: 'jon@example.com', profile: { displayName: 'Jon Bell', level: 'Beginner' } },
      { username: 'samira-khan', email: 'samira@example.com', profile: { displayName: 'Samira Khan', level: 'Advanced' } },
    ]);
    await Team.create({ name: 'Morning Momentum', description: 'Build a consistent start to every day.', members: users.map((user) => user._id) });
    await Activity.insertMany([
      { userId: users[0]._id, type: 'Run', durationMinutes: 35, points: 70, completedAt: new Date('2026-08-30') },
      { userId: users[1]._id, type: 'Yoga', durationMinutes: 25, points: 50, completedAt: new Date('2026-08-31') },
      { userId: users[2]._id, type: 'Strength', durationMinutes: 45, points: 90, completedAt: new Date('2026-08-31') },
    ]);
    await Leaderboard.insertMany([
      { userId: users[2]._id, points: 420, rank: 1, period: 'weekly' },
      { userId: users[0]._id, points: 350, rank: 2, period: 'weekly' },
      { userId: users[1]._id, points: 260, rank: 3, period: 'weekly' },
    ]);
    await Workout.insertMany([
      { name: 'Full Body Reset', category: 'Strength', difficulty: 'Intermediate', durationMinutes: 30, exercises: ['Squats', 'Push-ups', 'Plank'] },
      { name: 'Easy Recovery Flow', category: 'Mobility', difficulty: 'Beginner', durationMinutes: 20, exercises: ['Cat-cow', 'Low lunge', 'Child pose'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
