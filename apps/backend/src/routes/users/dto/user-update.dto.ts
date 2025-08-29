import type { IUser } from "types/user.type";
import type { IConfig } from "types/config.type";

import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto implements Partial<IUser> {
  @ApiProperty()
  id?: string;
  
  @ApiProperty()
  username?: string;
  
  @ApiProperty()
  nickname?: string;
  
  @ApiProperty()
  avatar_url?: string;
  
  @ApiProperty()
  guilds?: string[];
  
  @ApiProperty()
  created_at?: string;
  
  @ApiProperty()
  settings?: string;
  
  @ApiProperty()
  config?: IConfig;
}