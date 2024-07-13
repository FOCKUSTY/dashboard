import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares';
import { deleteBackupController, getBackupController, getBackupsController, postBackupController, putBackupController } from "../../controllers/backups/backups.controller";

const router = Router();

router.get('/:userId/', isAuthenticated, getBackupsController);
router.post('/:userId/', postBackupController);

router.get('/:userId/:backupId/', getBackupController);
router.put('/:userId/:backupId/', putBackupController);
router.delete('/:userId/:backupId/', deleteBackupController);

export default router;