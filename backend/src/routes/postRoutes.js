import express from 'express';
import {
  createPost,
  getHomeFeed,
  getMyDrafts,
  getMySavedPosts,
  getPostById,
  getPosts,
  reactToPost,
  reportPost,
  submitForReview,
  toggleLike,
  toggleSave,
  updatePost
} from '../controllers/postController.js';
import { optionalProtect, protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/home', getHomeFeed);
router.get('/', getPosts);
router.get('/me/drafts', protect, getMyDrafts);
router.get('/me/saved', protect, getMySavedPosts);
router.get('/:id', optionalProtect, getPostById);

router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.post('/:id/submit', protect, submitForReview);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/save', protect, toggleSave);
router.post('/:id/reaction', protect, reactToPost);
router.post('/:id/report', protect, reportPost);

export default router;
