import { RequestHandler } from 'express';
import { SnippetService } from '../services/snippet.service';
import mongoose from 'mongoose';

export const createSnippet: RequestHandler = async (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: 'Text is required' });
    return;
  }

  try {
    const snippet = await SnippetService.create(text);
    res.status(201).json(snippet);
  } catch (err) {
    next(err);
  }
};

export const getSnippet: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid snippet ID' });
    return;
  }

  try {
    const snippet = await SnippetService.findById(id);
    if (!snippet) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.json(snippet);
    return;
  } catch (err) {
    next(err);
  }
};

export const getAllSnippets: RequestHandler = async (_req, res, next) => {
  try {
    const snippets = await SnippetService.findAll();
    res.json(snippets);
  } catch (err) {
    next(err);
  }
};
