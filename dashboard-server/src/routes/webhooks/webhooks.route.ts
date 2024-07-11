import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import { getWebhookController, postWebhookController } from "../../controllers/webhooks/webhooks.controller";

const router = Router();

router.get('/:webhookId', isAuthenticated, getWebhookController);
router.get('/:webhookId/:webhookToken', getWebhookController);
router.post('/:webhookId/:webhookToken', postWebhookController);

export default router;