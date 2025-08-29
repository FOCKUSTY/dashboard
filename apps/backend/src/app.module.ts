import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { APP_INTERCEPTOR, RouterModule } from "@nestjs/core";
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';

import AuthModule from "./routes/auth/auth.module";
import UserModule from "routes/user/user.module";
import GuildModule from "routes/guild/guild.module";

@Module({
  imports: [
    ...[
      AuthModule,
      UserModule,
      GuildModule
    ].flatMap((module) => [module, RouterModule.register([{ path: "api", module }])]),
    CacheModule.register({
      ttl: 5 * 60 * 1000, // 5 minutes
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
