import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { Test } from '@nestjs/testing';
import { GlobalExceptionFilter } from './exception/global-exception.filter';
import * as request from 'supertest';
import { UsersRepository } from './user/users.repository';
import Mocked = jest.Mocked;

describe('Integration tests', () => {
  let app: INestApplication;
  let usersRepositoryMock: Mocked<UsersRepository>;

  const setupMocks = () => {
    usersRepositoryMock = {
      getAllUsers: jest.fn(),
      registerNewUser: jest.fn(),
    } as unknown as Mocked<UsersRepository>;
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    setupMocks();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(usersRepositoryMock)
      .compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const allUsers = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ];
      usersRepositoryMock.getAll = jest.fn().mockResolvedValueOnce(allUsers as User[]);

      const response = await request(app.getHttpServer()).get('/api/users').expect(HttpStatus.OK);

      expect(response.body).toEqual(allUsers);
    });

    it('should return 500 if repository throws an error', async () => {
      const errorMessage = 'Something went wrong';
      usersRepositoryMock.getAll = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

      const response = await request(app.getHttpServer()).get('/api/users').expect(HttpStatus.INTERNAL_SERVER_ERROR);

      expect(usersRepositoryMock.getAll).toHaveBeenCalled();
      expect(response.body).toEqual({
        message: errorMessage,
        path: '/api/users',
        timestamp: expect.any(String),
      });
    });
  });

  describe('POST /api/users', () => {
    it('should register a new user', async () => {
      const newUser = { name: 'Alice' };
      const registeredUser = { id: '1', name: 'Alice' };
      usersRepositoryMock.create = jest.fn().mockResolvedValueOnce(registeredUser as User);
      usersRepositoryMock.getAll = jest.fn().mockResolvedValueOnce([] as User[]);

      const response = await request(app.getHttpServer()).post('/api/users').send(newUser).expect(HttpStatus.CREATED);

      expect(response.body).toEqual(registeredUser);
      expect(usersRepositoryMock.create).toHaveBeenCalledWith(newUser);
    });

    it('should return 400 if username is empty', async () => {
      const newUser = { name: '' };

      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send(newUser)
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body).toEqual({
        message: 'Username cannot be empty',
        path: '/api/users',
        timestamp: expect.any(String),
      });
    });

    it('should return 400 if username already exists', async () => {
      const newUser = { name: 'Alice' };
      usersRepositoryMock.getAll = jest.fn().mockResolvedValueOnce([{ id: '1', name: 'Alice' }] as User[]);

      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send(newUser)
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body).toEqual({
        message: 'Username already exists',
        path: '/api/users',
        timestamp: expect.any(String),
      });
    });
  });
});
