import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserRole } from '../auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const signUpDto = {
        username: 'testuser',
        password: 'password123',
        role: UserRole.USER,
      };

      const expectedResult = {
        Userid: 1,
        Role: UserRole.USER,
      };

      mockAuthService.signUp.mockResolvedValue(expectedResult);

      const result = await controller.signUp(signUpDto);

      expect(result).toEqual(expectedResult);
      expect(service.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'password123',
      };

      const expectedResult = {
        Userid: 1,
        Message: 'Login Successful',
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expectedResult);
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });
})
