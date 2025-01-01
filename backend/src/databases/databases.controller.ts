import { Body, Controller, Get, Post } from '@nestjs/common';
import { DatabasesService } from './databases.service';

@Controller('databases')
export class DatabasesController {
  constructor(private readonly databasesService: DatabasesService) {}

  @Get()
  async getDatabases(): Promise<{ databases: string[] }> {
    return this.databasesService.listDatabases();
  }

  @Post('add')
  async addDatabase(
    @Body()
    body: {
      name: string;
      host: string;
      port: string;
      username: string;
      password: string;
    },
  ) {
    return this.databasesService.addDatabase(body);
  }
}
