import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../social feed/user.entity';
import { UserRole } from '../auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('signUp', () => {
    it('should successfully create a new user', async () => {
      const signUpDto = {
        username: 'testuser',
        password: 'password123',
        role: UserRole.USER,
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue({
        ...signUpDto,
        id: 1,
      });
      mockUserRepository.save.mockResolvedValue({
        id: 1,
        ...signUpDto,
      });

      const result = await service.signUp(signUpDto);

      expect(result).toEqual({
        Userid: 1,
        Role: UserRole.USER,
      });
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { username: signUpDto.username },
      });
      expect(mockUserRepository.create).toHaveBeenCalled();
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if username exists', async () => {
      const signUpDto = {
        username: 'existinguser',
        password: 'password123',
        role: UserRole.USER,
      };

      mockUserRepository.findOne.mockResolvedValue({ id: 1, ...signUpDto });

      await expect(service.signUp(signUpDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should successfully login a user', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'password123',
      };

      const user = {
        id: 1,
        ...loginDto,
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.login(loginDto);

      expect(result).toEqual({
        Userid: 1,
        Message: 'Login Successful',
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      const loginDto = {
        username: 'nonexistentuser',
        password: 'password123',
      };

      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'wrongpassword',
      };

      const user = {
        id: 1,
        username: 'testuser',
        password: 'correctpassword',
      };

      mockUserRepository.findOne.mockResolvedValue(user);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
