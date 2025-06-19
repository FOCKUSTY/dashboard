import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { LoggerMiddleware } from "./middleware/logger.middleware";
import { modules } from "./routes";

@Module({
  imports: [
    ...modules,
    ...modules.map((module) => RouterModule.register([{ path: "api", module }]))
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/");
  }
}
