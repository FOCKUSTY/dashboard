import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares'
import { getBackupController, getBackupsController, postBackupController } from "../../controllers/backups/backups.controller";

const router = Router();

router.get('/:userId', isAuthenticated, getBackupsController);
router.post('/:userId/', postBackupController);

router.get('/:userId/:backupId/', getBackupController);
router.put('/:userId/:backupId/');
router.delete('/:userId/:backupId/');

export default router;