import { Snippet } from '../models/snippet';
import { AIService } from './ai.service';

export class SnippetService {
  static async create(text: string) {
    const summary = await AIService.summarize(text);
    const snippet = await Snippet.create({ text, summary });
    return snippet;
  }
  
  static async findAll() {
    return Snippet.find().sort({ _id: -1 });
  }
  
  static async findById(id: string) {
    return Snippet.findById(id);
  }
}