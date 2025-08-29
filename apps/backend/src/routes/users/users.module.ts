import { Module } from "@nestjs/common";

import { Controller } from "./users.controller";
import { Service } from "./users.service";

@Module({
  imports: [],
  controllers: [Controller],
  providers: [Service]
})
export default class UsersModule {}
