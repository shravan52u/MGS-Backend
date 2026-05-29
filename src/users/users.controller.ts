import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from './auth.guard'; 
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return {
      message: "Users API working",
      data: ["Ram", "Shyam"]
    };
  }

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    console.log("BODY DATA 👉", body);
    return this.usersService.signup(body);
  }
  
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.usersService.login(body);
  }

  // 🔐 Protected route
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return {
      message: "Users data",
      user: req.user,
    };
  }
}