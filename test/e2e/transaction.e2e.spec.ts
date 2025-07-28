import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { getJwtToken } from '../utils/jwt-token.helper';
import { TransactionStatus, TransactionType } from '@prisma/client';

describe('Transaction E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userToken: string;
  let transactionId: number;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);

    // login sebagai USER
    userToken = await getJwtToken(app, 'user@example.com', 'user123');
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /transactions → should create a new transaction', async () => {
    const res = await request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        amount: 800.00,
        type: TransactionType.TRANSFER,
        category: 'Family',
        description: 'Monthly transfer',
        reference: 'TXN-E2E-001',
        status: TransactionStatus.PENDING,
        fromAccountId: 2,
        toAccountId: 3,
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    transactionId = res.body.id;
  });

  it('GET /transactions → should return list of transactions', async () => {
    const res = await request(app.getHttpServer())
      .get('/transactions')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /transactions/:id → should return transaction detail', async () => {
    const res = await request(app.getHttpServer())
      .get(`/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(transactionId);
  });

  it('PATCH /transactions/:id → should fail for USER (no ADMIN access)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ description: 'updated' });

    expect(res.status).toBe(403); // Forbidden
  });

  it('DELETE /transactions/:id → should fail for USER (no ADMIN access)', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403); // Forbidden
  });
});
