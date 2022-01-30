import express from 'express';
import roundApi from './round';

const router = express.Router();

router.use('/api/v0/round', roundApi);

export default router;
