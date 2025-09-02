import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { APP_INTERCEPTOR, RouterModule } from "@nestjs/core";
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';

import AuthModule from "routes/auth/auth.module";
import UsersModule from "routes/users/users.module";
import GuildsModule from "routes/guilds/guilds.module";

@Module({
  imports: [
    ...[
      AuthModule,
      UsersModule,
      GuildsModule
    ].flatMap((module) => [module, RouterModule.register([{ path: "api", module }])]),
    CacheModule.register({
      ttl: 5 * 60 * 1000 / 1000 / 60 / 5, // 5 minutes
      isGlobal: true
    })
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/");
  }
}
