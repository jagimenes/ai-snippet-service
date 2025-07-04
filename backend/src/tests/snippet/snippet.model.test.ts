import { SnippetService } from '../../services/snippet.service';
import { Snippet } from '../../models/snippet';
import { AIService } from '../../services/ai.service';
import { mockedSnippet, mockedSnippetRequest, snippetMockedId } from '../factory/snippet.factory';

jest.mock('../../models/snippet');
jest.mock('../../services/ai.service');

describe('Snippet Service - Testing creation', () => {
  it('should create a snippet with a summary', async () => {
    (AIService.summarize as jest.Mock).mockResolvedValue('mocked summary');

    (Snippet.create as jest.Mock).mockImplementation(async (data) => ({
      _id: snippetMockedId,
      text: data.text,
      summary: data.summary,
    }));

    const result = await SnippetService.create('testing');

    expect(AIService.summarize).toHaveBeenCalledWith('testing');
    expect(Snippet.create).toHaveBeenCalledWith(mockedSnippetRequest);
    expect(result).toEqual(mockedSnippet);
  });

  it('should return a snippet by ID', async () => {
      (Snippet.findById as jest.Mock).mockResolvedValue(mockedSnippet);

      const result = await SnippetService.findById(snippetMockedId);

      expect(Snippet.findById).toHaveBeenCalledWith(snippetMockedId);
      expect(result).toBe(mockedSnippet);
    });
});