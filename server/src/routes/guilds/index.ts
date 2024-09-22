import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import Controller from "../../controllers/guilds";

const controller = new Controller();
const router = Router();

router.get('/', isAuthenticated, controller.getGuilds);
router.get('/:guildId/permissions', isAuthenticated, controller.getGuildPermissions);
router.get('/:guildId/webhooks', isAuthenticated, controller.getGuildWebhooks);
router.get('/:guildId', isAuthenticated, controller.getGuild);

export default router;