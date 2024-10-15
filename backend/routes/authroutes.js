import express from 'express';
import { signup, login} from '../controller/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// router.post('/logout', logout);

export default router;
