import { createSnippet, getSnippet, getAllSnippets } from '../../controllers/snippet.controller';
import { AIService } from '../../services/ai.service';
import { SnippetService } from '../../services/snippet.service';
import { mockNext, mockReq, mockRes } from '../factory/request.factory';
import { mockedSnippet, mockedSnippetRequest, snippetMockedId, snippetMockedIdToRaise404Error } from '../factory/snippet.factory';

jest.mock('../../services/snippet.service');
jest.mock('../../services/ai.service');

beforeEach(() => {
  (AIService.summarize as jest.Mock).mockResolvedValue(mockedSnippet.summary);
});

describe('Snippets - Controller tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createSnippet', () => {
    it('return 400 if request does not have a body', async () => {
      const req = mockReq({});
      const res = mockRes();

      await createSnippet(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Text is required' });
    });

    it('call next function if summarize fails', async () => {
      const req = mockReq({ text: mockedSnippetRequest.text });
      const res = mockRes();
      const error = new Error('Unexpected error');
      (SnippetService.create as jest.Mock).mockRejectedValue(error);

      await createSnippet(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getSnippet', () => {
    it('returns 404 if does not find a snippet', async () => {
      const req = mockReq({}, { id: snippetMockedIdToRaise404Error });
      const res = mockRes();
      (SnippetService.findById as jest.Mock).mockResolvedValue(null);

      await getSnippet(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
    });

    it('returns 200 if finds a snippet', async () => {
      const req = mockReq({}, { id: snippetMockedId });
      const res = mockRes();

      (SnippetService.findById as jest.Mock).mockResolvedValue(mockedSnippet);

      await getSnippet(req, res, mockNext);

      expect(res.json).toHaveBeenCalledWith(mockedSnippet);
    });

    it('returns 400 if ID is invalid', async () => {
      const req = mockReq({}, { id: 'invalid_id' });
      const res = mockRes();

      await getSnippet(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid snippet ID' });
    });
  });

  describe('getAllSnippets', () => {
    it('call next function if service throw errors', async () => {
      const req = mockReq();
      const res = mockRes();
      const error = new Error('Unexpected error');
      (SnippetService.findAll as jest.Mock).mockRejectedValue(error);

      await getAllSnippets(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
