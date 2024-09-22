import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import Controller from '../../controllers/users'

const controller = new Controller;
const router = Router();

router.get('/', isAuthenticated, controller.getUser);
router.get('/:userId', isAuthenticated, controller.getUser);

export default router;