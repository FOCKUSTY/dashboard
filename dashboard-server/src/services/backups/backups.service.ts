import { Backup } from "../../database/schemas";
import { sendWebhookMessageType } from "../../utils/types";

export async function getBackupsService(discordId: string) {
    const backups = await Backup.find({discordId: discordId});

    if(!backups)
        throw new Error('No backup found');

    return backups;
}

export async function getBackupService(userId: string, id: string) {
    const backups = await Backup.find({discordId: userId});
    const backup = backups.filter((b) => b.id === id);

    if(!backup)
        throw new Error('No backup found');

    return backup;
};

export async function postBackupService(userId: string, name: string, message: sendWebhookMessageType) {
    const backup = await Backup.create({backupName: name, discordId: userId, data: message});

    if(!backup)
        throw new Error('No backup found');

    return backup;
};