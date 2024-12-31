import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatabasesService {
  constructor(private prisma: PrismaService) {}

  async listDatabases(): Promise<{ databases: string[] }> {
    const databases = await this.prisma.database.findMany();
    return { databases: databases.map((db) => db.name) };
  }
}
