import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models';
import { createCrudRouter } from './createCrudRouter';

const router = Router();

router.use('/users', createCrudRouter(User));
router.use('/teams', createCrudRouter(Team));
router.use('/activities', createCrudRouter(Activity));
router.use('/leaderboard', createCrudRouter(Leaderboard));
router.use('/workouts', createCrudRouter(Workout));

export default router;