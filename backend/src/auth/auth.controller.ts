// The AuthController class is a controller with two POST routes: /auth/login and /auth/logout.
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')

// The AuthController class is decorated with the @Controller decorator to define the base route for the controller.
export class AuthController {
  constructor(private authService: AuthService) {}

  // The login method is a POST route that receives a username and password in the request body.
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  // The logout method is a POST route that logs out the user.
  @Post('logout')
  async logout() {
    return 'Logged out';
  }
}
