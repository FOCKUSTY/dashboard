import { Router } from "express";
import authRouter from './auth'
import guildsRouter from './guilds';
import usersRouter from './users';
import webhookRouter from './webhooks';
import messagesRouter from './messages';
import backupRouter from './backups'

const router = Router();

router.use('/auth', authRouter);
router.use('/guilds', guildsRouter);
router.use('/users', usersRouter);
router.use('/webhooks', webhookRouter);
router.use('/channels', messagesRouter);
router.use('/backups', backupRouter);

export default router;