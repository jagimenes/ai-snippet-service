import { AIService } from "../../services/ai.service";
import { mockedSnippet } from "../factory/snippet.factory";

describe('AIService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the summary using the API', async () => {
    const mockText = mockedSnippet.text;
    const mockResponse = {
      candidates: [
        {
          content: {
            parts: [{ text: mockedSnippet.summary }]
          }
        }
      ]
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => (mockResponse)
    });

    const result = await AIService.summarize(mockText);
    expect(result).toBe(mockedSnippet.summary);
  });

  it('should return empty string if the request is not valid', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({})
    });

    const result = await AIService.summarize('some cool text');
    expect(result).toBe('');
  });
});
