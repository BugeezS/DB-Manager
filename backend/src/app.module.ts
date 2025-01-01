import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DatabasesModule } from './databases/databases.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabasesModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {}
