import mongoose, { Schema } from "mongoose";

export interface Backup {
    id: string,
    discordId: string,
    backupName: string,
    data: JSON
}

const BackupSchema = new Schema<Backup>({
    discordId: {
        type: mongoose.SchemaTypes.String,
        require: true,
    },
    backupName: mongoose.SchemaTypes.String,
    data: mongoose.SchemaTypes.Mixed
});

export default mongoose.model('backups', BackupSchema)