import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
      ) {}
      
      // async login(body: any) {
      //   const { userId, password } = body;
      
      //   const user = await this.userRepo.findOne({
      //     where: { userId },
      //   });
      
      //   const isMatch = user && await bcrypt.compare(password, user.password);
      
      //   if (!user || !isMatch) {
      //     throw new UnauthorizedException("Invalid credentials");
      //   }
      
      //   const payload = {
      //     id: user.id,
      //     userId: user.userId,
      //   };
      
      //   const token = this.jwtService.sign(payload);
      
      //   return {
      //     message: "Login successful",
      //     access_token: token,
      //   };
      // }

      async login(dto: LoginDto) {

        const user = await this.userRepo.findOne({
          where: { email: dto.email },
        });
      
        if (!user) {
          throw new UnauthorizedException("Invalid credentials");
        }
      
        const isMatch = await bcrypt.compare(dto.password, user.password);
      
        if (!isMatch) {
          throw new UnauthorizedException("Invalid credentials");
        }
      
        const token = this.jwtService.sign({ id: user.id });
      
        return {
          statusCode: 200,
          message: "Login successful",
          access_token: token,
          userType: user.userType,
        };
      }


      // async signup(body: any) {
      //   const { userId, password } = body;
      
      //   const existingUser = await this.userRepo.findOne({
      //     where: { userId },
      //   });
      
      //   if (existingUser) {
      //       throw new BadRequestException("User already exists");
      //     }
      
      //   const hashedPassword = await bcrypt.hash(password, 10);
      
      //   const newUser = this.userRepo.create({
      //     userId,
      //     password: hashedPassword,
      //   });
      
      //   await this.userRepo.save(newUser);
      
      //   return {
      //     message: "User created successfully",
      //   };
      // }
      async signup(dto: SignupDto) {

        const existing = await this.userRepo.findOne({
          where: { email: dto.email },
        });
      
        if (existing) {
          throw new BadRequestException("Email already exists");
        }
      
        const hashed = await bcrypt.hash(dto.password, 10);
      
        const user = this.userRepo.create({
          email: dto.email,
          password: hashed,
          userType: dto.userType,
        });
      
        await this.userRepo.save(user);
      
        return {
          statusCode: 201,
          message: "User created successfully",
        };
      }
}

