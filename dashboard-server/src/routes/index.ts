import { Router } from "express";
import authRouter from './auth'
import guildsRouter from './guilds';
import usersRouter from './users';
import webhookRouter from './webhooks';
import messagesRouter from './messages';

const router = Router();

router.use('/auth', authRouter);
router.use('/guilds', guildsRouter);
router.use('/users', usersRouter);
router.use('/webhooks', webhookRouter);
router.use('/channels', messagesRouter);

export default router;