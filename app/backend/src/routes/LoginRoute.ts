import { Router } from 'express';
import LoginController from '../controller/LoginController';
import validateEmail from '../middlewares/validateEmail';
import validatePassword from '../middlewares/validatePassword';

const router = Router();

router.post('/login', validateEmail, validatePassword, LoginController.login);
router.get('/validate', LoginController.roleUser);

export default router;
