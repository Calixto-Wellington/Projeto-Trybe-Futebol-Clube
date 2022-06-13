import { Router } from 'express';
import TeamController from '../controller/TeamController';
import LoginController from '../controller/LoginController';
import validateEmail from '../middlewares/validateEmail';
import validatePassword from '../middlewares/validatePassword';
import MatchController from '../controller/MatchController';

const router = Router();

router.post('/login', validateEmail, validatePassword, LoginController.login);
router.get('/login/validate', LoginController.roleUser);
router.get('/teams', TeamController.getAll);
router.get('/teams/:id', TeamController.getById);
router.get('/matches', MatchController.getAll);
router.post('/matches', MatchController.matchCreate);

export default router;
