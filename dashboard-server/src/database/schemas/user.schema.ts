import mongoose, { Schema } from "mongoose";

export interface User {
    id: string,
    discordId: string,
    accessToken: string,
    refreshToken: string,
}

const UserSchema = new Schema<User>({
    discordId: {
        type: mongoose.SchemaTypes.String,
        require: true,
        unique: true,
    },
    accessToken: {type: mongoose.SchemaTypes.String, require: true},
    refreshToken: {type: mongoose.SchemaTypes.String, require: true},
});

export default mongoose.model('users', UserSchema)