import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import { getGuildsController, getGuildPermissionsController, getGuildController, getGuildWebhooks } from "../../controllers/guilds";

const router = Router();

router.get('/', isAuthenticated, getGuildsController);
router.get('/:guildId/permissions', isAuthenticated, getGuildPermissionsController);
router.get('/:guildId/webhooks', isAuthenticated, getGuildWebhooks);
router.get('/:guildId', isAuthenticated, getGuildController);

export default router;