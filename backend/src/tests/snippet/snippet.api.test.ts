import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app';
import { AIService } from '../../services/ai.service';
import { mockedSnippet, mockedSnippetRequest } from '../factory/snippet.factory';

jest.mock('../../services/ai.service');

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(() => {
  jest.clearAllMocks();
  (AIService.summarize as jest.Mock).mockResolvedValue(mockedSnippet.summary);
});

describe('Snippets - API tests', () => {
  it('POST /snippets - create a new snippet with a valid text', async () => {
    const res = await request(app)
      .post('/snippets')
      .send({ text: mockedSnippetRequest.text });

    console.log('Response from POST /snippets:', JSON.stringify(res.body, null, 2));

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('summary');
  });

  it('POST /snippets - returns 400 if text fails to parse', async () => {
    const res = await request(app).post('/snippets').send({});

    console.log('Response POST /snippets without text:', res.body);

    expect(res.status).toBe(400);
  });

  it('GET /snippets - list all snippets', async () => {
    const res = await request(app).get('/snippets');

    console.log('Response GET /snippets:', JSON.stringify(res.body, null, 2));

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
