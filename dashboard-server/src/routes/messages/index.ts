import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import { getMessageController } from "../../controllers/messages";

const router = Router();

router.get('/:channelId/:messageId/', isAuthenticated, getMessageController);

export default router;