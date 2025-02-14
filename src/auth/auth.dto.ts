import {IsEnum, IsString, MinLength } from 'class-validator';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    OWNER = 'owner',
  }

export class SignUpDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum({ type: 'enum', enum: UserRole })
  role: UserRole;
}

export class LoginDto {
    @IsString()
    @MinLength(3)
    username: string;
  
    @IsString()
    @MinLength(6)
    password: string;
  }