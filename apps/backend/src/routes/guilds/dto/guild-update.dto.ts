import type { GuildEntity } from "./guild.entity";

import { ApiProperty } from "@nestjs/swagger";

export class GuildUpdateDto implements Partial<Omit<GuildEntity, "id">> {
  @ApiProperty()
  name?: string;
  
  @ApiProperty()
  owner_id?: string;
  
  @ApiProperty()
  icon?: string | null;
}