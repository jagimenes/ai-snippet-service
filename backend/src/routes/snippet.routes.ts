import { Router } from 'express';
import { createSnippet, getAllSnippets, getSnippet } from '../controllers/snippet.controller';

const router = Router();

router.post('/snippets', createSnippet);
router.get('/snippets', getAllSnippets);
router.get('/snippets/:id', getSnippet);

export default router;