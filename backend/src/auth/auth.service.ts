// Code for the AuthService class that contains the login method that authenticates a user by username and password.
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// The AuthService class is decorated with the @Injectable decorator to define it as a service.
@Injectable()
// The AuthService class is exported to be used in other parts of the application.
export class AuthService {
  // The constructor injects the JwtService class.
  constructor(private jwtService: JwtService) {}
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
  //TODO: Implement the findUserByUsername method to find a user by username.
  private async findUserByUsername(username: string) {}
}
