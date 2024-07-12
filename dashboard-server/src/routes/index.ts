import { Router } from "express";

import authRouter from './auth/auth.route'
import guildsRouter from './guilds/guilds.route';
import usersRouter from './users/users.route';
import webhookRouter from './webhooks/webhooks.route';
import messagesRouter from './messages/messages.route';
import backupRouter from './backups/backups.route'

const router = Router();

router.use('/auth', authRouter);
router.use('/guilds', guildsRouter);
router.use('/users', usersRouter);
router.use('/webhooks', webhookRouter);
router.use('/channels', messagesRouter);
router.use('/backups', backupRouter);

export default router;