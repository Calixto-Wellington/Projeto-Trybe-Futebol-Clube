import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const router = Router();

router.get('/leaderboard/home', LeaderBoardController.getAllOrderHome);

export default router;
