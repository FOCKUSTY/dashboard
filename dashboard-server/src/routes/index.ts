import { Router } from "express";
import authRouter from './auth'
import guildsRouter from './guilds';
import usersRouter from './users';

const router = Router();

router.use('/auth', authRouter);
router.use('/guilds', guildsRouter);
router.use('/users', usersRouter);

export default router;