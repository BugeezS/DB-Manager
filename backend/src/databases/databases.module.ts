import { Module } from '@nestjs/common';
import { DatabasesController } from './databases.controller';
import { DatabasesService } from './databases.service';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService]
})
export class DatabasesModule {}
