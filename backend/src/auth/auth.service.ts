// Code for the AuthService class that contains the login method that authenticates a user by username and password.
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // The login method is defined to authenticate a user by username and password.
  async login(username: string, password: string) {
    const user = await this.findUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { access_token: accessToken };
    }
    throw new Error('Invalid login');
  }

  async register(username: string, password: string) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }

  //TODO: Implement the findUserByUsername method to find a user by username.
  private async findUserByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
