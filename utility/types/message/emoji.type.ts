import { Role } from "../guild/role.type";
import { User } from "../index";

export type Emoji = {
    id: string;
    name: string;
    roles?: Role[];
    user: User;
    require_colons: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
};