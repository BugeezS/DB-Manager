import { Module } from '@nestjs/common';
import { DatabasesController } from './databases.controller';
import { DatabasesService } from './databases.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService, PrismaService],
})
export class DatabasesModule {}
