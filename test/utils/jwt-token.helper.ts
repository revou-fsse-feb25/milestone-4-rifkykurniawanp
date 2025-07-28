import * as request from 'supertest';

export async function getJwtToken(app, email: string, password: string): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email, password });

  return response.body.accessToken;
}
