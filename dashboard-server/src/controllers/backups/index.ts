import { Response, Request } from "express"
import { getBackupService, getBackupsService, postBackupService } from "../../services/backups"

export async function getBackupsController(req: Request, res: Response)
{
    const userId = req.params.userId;
    
    try
    {
        const backups = await getBackupsService(userId);
        
        res.send(backups);
    }
    catch (err)
    {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};

export async function getBackupController(req: Request, res: Response)
{
    const userId = req.params.userId;
    const backupId = req.params.backupId;
    
    try
    {
        const backup = await getBackupService(userId, backupId);
        
        res.send(backup);
    }
    catch (err)
    {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};

export async function postBackupController(req: Request, res: Response)
{
    const userId = req.params.userId;
    const backupName = req.body.name;
    const message = req.body.message;

    try
    {
        const backup = await postBackupService(userId, backupName, message);
        
        res.send(backup);
    }
    catch (err)
    {
        console.error(err);
        res.status(400).send({msg: 'Error'});
    };
};