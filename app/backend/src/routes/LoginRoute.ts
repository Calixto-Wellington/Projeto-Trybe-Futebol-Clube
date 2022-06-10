import { Router } from 'express';
import TeamController from '../controller/TeamController';
import LoginController from '../controller/LoginController';
import validateEmail from '../middlewares/validateEmail';
import validatePassword from '../middlewares/validatePassword';

const router = Router();

router.post('/login', validateEmail, validatePassword, LoginController.login);
router.get('/login/validate', LoginController.roleUser);
router.get('/teams', TeamController.getAll);

export default router;
