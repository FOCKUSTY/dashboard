import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import { getUserController } from '../../controllers/users/users.controller'

const router = Router();

router.get('/', isAuthenticated, getUserController);
router.get('/:userId', isAuthenticated, getUserController);

export default router;