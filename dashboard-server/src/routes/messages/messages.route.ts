import { Router } from "express";
import { getMessageController } from "../../controllers/messages/messages.controller";

const router = Router();

router.get('/:channelId/:messageId/', getMessageController);

export default router;