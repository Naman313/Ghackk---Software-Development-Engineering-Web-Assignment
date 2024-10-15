import express from 'express';
import { addToFavorites, getFavorites} from '../controller/favoritesController.js';
// import { authMiddleware } from '../middleware/authMiddleware.js'; // If you have an authentication middleware

const router = express.Router();

// Add to favorites route (protected by authMiddleware)
router.post('/add',  addToFavorites);
router.get('/:userId', getFavorites);

export default router;
