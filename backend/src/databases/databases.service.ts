import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabasesService {
  async listDatabases(): Promise<{ databases: string[] }> {
    return {
      databases: ['database1', 'database2', 'database3'],
    };
  }
}
