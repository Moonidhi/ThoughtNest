import Post from '../models/Post.js';
import Report from '../models/Report.js';
import SiteHighlight from '../models/SiteHighlight.js';
import User from '../models/User.js';

export const getPendingPosts = async (req, res) => {
  const posts = await Post.find({ status: 'pending' })
    .populate('author', 'name email')
    .sort({ updatedAt: -1 });
  res.json(posts);
};

export const approvePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  post.status = 'published';
  post.rejectionReason = '';
  await post.save();

  res.json({ message: 'Post approved and published', post });
};

export const rejectPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  post.status = 'rejected';
  post.rejectionReason = req.body.reason || 'Did not meet community standards';
  await post.save();

  res.json({ message: 'Post rejected', post });
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  await post.deleteOne();
  res.json({ message: 'Post removed' });
};

export const getReports = async (req, res) => {
  const reports = await Report.find({ status: 'open' })
    .populate('post', 'title status')
    .populate('reportedBy', 'name email')
    .sort({ createdAt: -1 });
  res.json(reports);
};

export const markReportReviewed = async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) return res.status(404).json({ message: 'Report not found' });

  report.status = 'reviewed';
  await report.save();

  res.json({ message: 'Report marked reviewed', report });
};

export const featureWriter = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  let highlight = await SiteHighlight.findOne();
  if (!highlight) highlight = await SiteHighlight.create({});

  highlight.featuredWriter = user._id;
  await highlight.save();

  res.json({ message: 'Featured writer updated', featuredWriter: user });
};

export const featureArticle = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const { featured = true } = req.body;
  post.featured = featured;
  await post.save();

  res.json({ message: 'Article feature status updated', post });
};

export const updateHighlights = async (req, res) => {
  const { thoughtOfDay, poemOfDay, weeklyChallenge } = req.body;

  let highlight = await SiteHighlight.findOne();
  if (!highlight) highlight = await SiteHighlight.create({});

  if (thoughtOfDay !== undefined) highlight.thoughtOfDay = thoughtOfDay;
  if (poemOfDay !== undefined) highlight.poemOfDay = poemOfDay;
  if (weeklyChallenge !== undefined) highlight.weeklyChallenge = weeklyChallenge;

  await highlight.save();
  res.json({ message: 'Highlights updated', highlight });
};
