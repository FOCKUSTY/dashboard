import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import { getGuildsController, getGuildPermissionsController, getGuildController } from "../../controllers/guilds";

const router = Router();

router.get('/', isAuthenticated, getGuildsController);

// /api/guilds/123/permissions
router.get('/:guildId/permissions', isAuthenticated, getGuildPermissionsController);

router.get('/:guildId', isAuthenticated, getGuildController);

export default router;