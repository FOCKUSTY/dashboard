import { Module } from "@nestjs/common";
import { GuildsController } from "./guilds.controller";
import { GuildsService } from "./guilds.service";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [CacheModule.register()],
  controllers: [GuildsController],
  providers: [GuildsService]
})
export default class GuildsModule {}
