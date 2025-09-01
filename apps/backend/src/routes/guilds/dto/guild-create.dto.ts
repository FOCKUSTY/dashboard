import type { GuildEntity } from "./guild.entity";

import { ApiProperty } from "@nestjs/swagger";

export class GuildCreateDto implements GuildEntity {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  owner_id: string;
  
  @ApiProperty()
  icon: string | null;
}