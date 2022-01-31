import express from 'express';
import getRound from './get-round';
import saveRound from './save-round';

const router = express.Router();
router.get('/', getRound);
router.post('/', saveRound);

export default router;
