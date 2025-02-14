import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto, SignUpDto } from './auth.dto';
import { User } from 'src/social feed/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { username, password } = signUpDto;

    // Check if user exists
    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('username already exists');
    }

    // Create new user
    
    const user = this.usersRepository.create({
      username,
      password,
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
      throw new UnauthorizedException('Invalid credentials');
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