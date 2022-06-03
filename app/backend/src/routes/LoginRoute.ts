import { Router } from 'express';
import LoginController from '../controller/LoginController';

const router = Router();

router.post('/login', LoginController.login);

export default router;
