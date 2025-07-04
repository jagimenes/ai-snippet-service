import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
  text: String,
  summary: String,
});

export const Snippet = mongoose.model('Snippet', snippetSchema);