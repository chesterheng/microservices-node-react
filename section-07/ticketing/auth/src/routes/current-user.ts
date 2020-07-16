import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', () => {});

export { router as currentUserRouter };
