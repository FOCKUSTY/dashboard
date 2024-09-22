import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import Controller from "../../controllers/webhooks";

const controller = new Controller();
const router = Router();

router.get('/:webhookId', isAuthenticated, controller.getWebhook);
router.get('/:webhookId/:webhookToken', controller.getWebhook);
router.post('/:webhookId/:webhookToken', controller.postWebhook);

export default router;