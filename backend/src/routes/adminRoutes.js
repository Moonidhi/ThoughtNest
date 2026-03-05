import express from 'express';
import {
  approvePost,
  deletePost,
  featureArticle,
  featureWriter,
  getPendingPosts,
  getReports,
  markReportReviewed,
  rejectPost,
  updateHighlights
} from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/pending-posts', getPendingPosts);
router.post('/posts/:id/approve', approvePost);
router.post('/posts/:id/reject', rejectPost);
router.delete('/posts/:id', deletePost);
router.post('/posts/:id/feature', featureArticle);

router.get('/reports', getReports);
router.post('/reports/:id/reviewed', markReportReviewed);

router.post('/featured-writer', featureWriter);
router.put('/highlights', updateHighlights);

export default router;
