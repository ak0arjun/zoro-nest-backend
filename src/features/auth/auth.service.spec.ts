import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { delayInMs } from '../../shared_resources/util';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        JwtModule.register({
          global: true,
          secret: 'testkey',
          signOptions: { expiresIn: '5s' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a token', async () => {
    const userId = 'testUserId';
    const token = await service.generateToken(userId);
    expect(token).toBeDefined();
  });

  it('should validate a token', async () => {
    const userId = 'testUserId';
    const token = await service.generateToken(userId);
    const payload = await service.validateToken(token);
    expect(payload).toBeDefined();
    expect(payload.userId).toEqual(userId);
  });

  it('should throw an error for invalid token', async () => {
    try {
      await service.validateToken('invalidToken');
      expect('error not thrown').toBe(false);
    } catch (error: unknown) {
      expect((error as Error).message).toBe('jwt malformed');
    }
  });

  it('should throw an error for expired token', async () => {
    try {
      const userId = 'testUserId';
      const token = await service.generateToken(userId);
      await delayInMs(6000);
      await service.validateToken(token);
      expect('error not thrown').toBe(false);
    } catch (error: unknown) {
      expect((error as Error).message).toBe('jwt expired');
    }
  }, 10000);
});
