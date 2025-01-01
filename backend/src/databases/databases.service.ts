import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatabasesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Validates the input data for creating a database record.
   * @param data Input JSON object
   */
  private validateInput(data: {
    name: string;
    host: string;
    port: string;
    username: string;
    password: string;
  }) {
    const { name, host, port, username, password } = data;

    // Check for required fields
    if (!name || !host || !port || !username || !password) {
      throw new BadRequestException(
        'All fields (dbName, host, port, username, password) are required',
      );
    }

    // Validate port number
    const portNumber = Number(port);
    if (isNaN(portNumber) || portNumber <= 0 || portNumber > 65535) {
      throw new BadRequestException(
        'Port must be a valid number between 1 and 65535',
      );
    }
  }

  /**
   * Adds a new database entry to the system.
   * @param data Input JSON object
   * @returns The newly created database record
   */
  async addDatabase(data: {
    name: string;
    host: string;
    port: string;
    username: string;
    password: string;
  }) {
    this.validateInput(data);

    const { name, host, port, username, password } = data;

    try {
      // Use Prisma to create a new database record
      const newDatabase = await this.prisma.database.create({
        data: {
          name: name,
          host,
          port: Number(port),
          username,
          password,
          userId: 1, // Replace with dynamic user ID if needed
        },
      });

      return newDatabase;
    } catch (error) {
      console.error('Error creating database:', error.message);
      throw new Error(`Failed to create database: ${error.message}`);
    }
  }

  /**
   * Retrieves the list of database names.
   * @returns A list of database names
   */
  async listDatabases(): Promise<{ databases: string[] }> {
    try {
      const databases = await this.prisma.database.findMany();
      return { databases: databases.map((db) => db.name) };
    } catch (error) {
      console.error('Error retrieving databases:', error.message);
      throw new Error(`Failed to fetch databases: ${error.message}`);
    }
  }
}
