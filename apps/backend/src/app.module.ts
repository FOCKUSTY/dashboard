import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { CacheModule } from "@nestjs/cache-manager";

import { LoggerMiddleware } from "./middleware/logger.middleware";
import { modules } from "./routes";

@Module({
  imports: [
    ...modules,
    ...modules.map((module) => RouterModule.register([{ path: "api", module }])),
    CacheModule.register({
      isGlobal: true,
      ttl: 3_600_000
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/");
  }
}
