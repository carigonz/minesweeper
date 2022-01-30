import express from 'express';
import getRound from './get-round';

const router = express.Router();
router.get('/', getRound);

export default router;
