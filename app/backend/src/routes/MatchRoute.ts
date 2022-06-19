import { Router } from 'express';
import MatchController from '../controller/MatchController';

const router = Router();

router.post('/matches', MatchController.matchCreate);
router.get('/matches', MatchController.getAll);
router.patch('/matches/:id/finish', MatchController.matchUpdate);
router.patch('/matches/:id', MatchController.goalsUpdate);

export default router;
