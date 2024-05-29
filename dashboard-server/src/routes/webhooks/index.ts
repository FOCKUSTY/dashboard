import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import { getWebhookController } from "../../controllers/webhooks";

const router = Router();

router.get('/:webhookId', isAuthenticated, getWebhookController);
router.get('/:webhookId/:webhookToken', isAuthenticated, getWebhookController);

export default router;