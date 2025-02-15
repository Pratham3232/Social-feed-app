import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto, SignUpDto, UserRole } from './auth.dto';
import { User } from '../social feed/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { username, password } = signUpDto;

    // Create new user

    var role = UserRole.USER;

    if(signUpDto.role && signUpDto.role !== UserRole.USER) {
        role = (signUpDto.role === UserRole.ADMIN ? UserRole.ADMIN : UserRole.OWNER);
    }

    // Check if user exists
    const existingUser = await this.usersRepository.findOne({ where: { username: username} });
    if (existingUser) {
      throw new ConflictException('Username already exists select different username');
    }

    const user = this.usersRepository.create({
      username,
      password,
      role
    });

    const savedUser = await this.usersRepository.save(user);

    return {
        Userid: savedUser.id,
        Role: savedUser.role
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    // Find user
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
        Userid: user.id,
        Message: "Login Successful"
    };
  }
}