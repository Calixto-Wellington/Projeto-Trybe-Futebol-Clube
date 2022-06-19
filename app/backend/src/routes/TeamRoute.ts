import { Router } from 'express';
import TeamController from '../controller/TeamController';

const router = Router();

router.get('/teams', TeamController.getAll);
router.get('/teams/:id', TeamController.getById);

export default router;
