import { Module } from "@nestjs/common";

import { Controller } from "./guilds.controller";
import { Service } from "./guilds.service";

@Module({
  imports: [],
  controllers: [Controller],
  providers: [Service]
})
export default class GuildsModule {}
