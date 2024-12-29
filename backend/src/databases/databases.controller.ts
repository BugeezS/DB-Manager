import { Controller, Get } from '@nestjs/common';
import { DatabasesService } from './databases.service';

@Controller('databases')
export class DatabasesController {
  constructor(private readonly databasesService: DatabasesService) {}

  @Get()
  async getDatabases(): Promise<{ databases: string[] }> {
    return this.databasesService.listDatabases();
  }
}
