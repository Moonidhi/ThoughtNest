import Post from '../models/Post.js';
import Report from '../models/Report.js';
import SiteHighlight from '../models/SiteHighlight.js';
import User from '../models/User.js';

const reactionTypes = ['insightful', 'loved_it', 'powerful'];

const withReactionStats = (post, userId) => {
  const objectPost = post.toObject();
  const reactionStats = {
    insightful: 0,
    loved_it: 0,
    powerful: 0
  };

  let userReaction = null;

  for (const reaction of objectPost.reactions || []) {
    reactionStats[reaction.type] += 1;
    if (userId && String(reaction.user) === String(userId)) userReaction = reaction.type;
  }

  return {
    ...objectPost,
    likeCount: objectPost.likes?.length || 0,
    saveCount: objectPost.saves?.length || 0,
    reactionStats,
    userReaction,
    isLiked: userId ? objectPost.likes?.some((id) => String(id) === String(userId)) : false,
    isSaved: userId ? objectPost.saves?.some((id) => String(id) === String(userId)) : false
  };
};

export const createPost = async (req, res) => {
  const { title, content, type, tags = [], category, saveAsDraft = true } = req.body;

  const post = await Post.create({
    title,
    content,
    type,
    tags,
    category,
    status: saveAsDraft ? 'draft' : 'pending',
    author: req.user._id
  });

  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const isAuthor = String(post.author) === String(req.user._id);
  if (!isAuthor && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const { title, content, type, tags, category, status } = req.body;

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (type !== undefined) post.type = type;
  if (tags !== undefined) post.tags = tags;
  if (category !== undefined) post.category = category;

  if (isAuthor && ['draft', 'pending'].includes(status)) post.status = status;

  await post.save();
  res.json(post);
};

export const submitForReview = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (String(post.author) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  post.status = 'pending';
  await post.save();
  res.json({ message: 'Submitted for admin review', post });
};

export const getHomeFeed = async (req, res) => {
  let highlight = await SiteHighlight.findOne().populate('featuredWriter', 'name bio profilePicture');
  if (!highlight) highlight = await SiteHighlight.create({});

  const [trendingIds, latest, featuredArticle] = await Promise.all([
    Post.aggregate([
      { $match: { status: 'published' } },
      {
        $addFields: {
          likeCount: { $size: '$likes' }
        }
      },
      { $sort: { featured: -1, likeCount: -1, publishedAt: -1 } },
      { $limit: 5 },
      { $project: { _id: 1 } }
    ]),
    Post.find({ status: 'published' })
      .populate('author', 'name profilePicture')
      .sort({ publishedAt: -1 })
      .limit(8),
    Post.findOne({ status: 'published', featured: true })
      .populate('author', 'name profilePicture')
      .sort({ updatedAt: -1 })
  ]);
  const trendingOrder = trendingIds.map((doc) => String(doc._id));
  const trendingRaw = await Post.find({ _id: { $in: trendingOrder } }).populate(
    'author',
    'name profilePicture'
  );
  const trending = trendingOrder
    .map((id) => trendingRaw.find((post) => String(post._id) === id))
    .filter(Boolean);

  const categories = ['Technology', 'Life', 'Philosophy', 'Poetry', 'Personal Stories'];

  res.json({
    thoughtOfDay: highlight.thoughtOfDay,
    poemOfDay: highlight.poemOfDay,
    weeklyChallenge: highlight.weeklyChallenge,
    featuredWriter: highlight.featuredWriter,
    trending,
    latest,
    featuredArticle,
    categories
  });
};

export const getPosts = async (req, res) => {
  const { q, category, tag, type } = req.query;

  const query = { status: 'published' };

  if (category) query.category = category;
  if (type) query.type = type;
  if (tag) query.tags = { $in: [tag.toLowerCase()] };

  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { tags: { $in: [new RegExp(q, 'i')] } }
    ];

    const authors = await User.find({ name: { $regex: q, $options: 'i' } }).select('_id');
    if (authors.length) query.$or.push({ author: { $in: authors.map((a) => a._id) } });
  }

  const posts = await Post.find(query).populate('author', 'name profilePicture').sort({ publishedAt: -1 });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'name profilePicture bio');
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const canViewUnpublished =
    req.user && (req.user.role === 'admin' || String(post.author._id) === String(req.user._id));

  if (post.status !== 'published' && !canViewUnpublished) {
    return res.status(403).json({ message: 'Post not yet published' });
  }

  res.json(withReactionStats(post, req.user?._id));
};

export const getMyDrafts = async (req, res) => {
  const drafts = await Post.find({ author: req.user._id, status: { $in: ['draft', 'pending', 'rejected'] } })
    .sort({ updatedAt: -1 })
    .populate('author', 'name');

  res.json(drafts);
};

export const getMySavedPosts = async (req, res) => {
  const posts = await Post.find({ saves: req.user._id, status: 'published' })
    .populate('author', 'name profilePicture')
    .sort({ updatedAt: -1 });

  res.json(posts);
};

export const toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.status !== 'published') return res.status(404).json({ message: 'Post not found' });

  const idx = post.likes.findIndex((id) => String(id) === String(req.user._id));
  if (idx >= 0) post.likes.splice(idx, 1);
  else post.likes.push(req.user._id);

  await post.save();
  res.json(withReactionStats(post, req.user._id));
};

export const toggleSave = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.status !== 'published') return res.status(404).json({ message: 'Post not found' });

  const idx = post.saves.findIndex((id) => String(id) === String(req.user._id));
  const user = await User.findById(req.user._id);

  if (idx >= 0) {
    post.saves.splice(idx, 1);
    user.savedPosts = user.savedPosts.filter((id) => String(id) !== String(post._id));
  } else {
    post.saves.push(req.user._id);
    if (!user.savedPosts.some((id) => String(id) === String(post._id))) user.savedPosts.push(post._id);
  }

  await Promise.all([post.save(), user.save()]);

  res.json(withReactionStats(post, req.user._id));
};

export const reactToPost = async (req, res) => {
  const { type } = req.body;
  if (!reactionTypes.includes(type)) {
    return res.status(400).json({ message: 'Invalid reaction type' });
  }

  const post = await Post.findById(req.params.id);
  if (!post || post.status !== 'published') return res.status(404).json({ message: 'Post not found' });

  post.reactions = post.reactions.filter((r) => String(r.user) !== String(req.user._id));
  post.reactions.push({ user: req.user._id, type });

  await post.save();
  res.json(withReactionStats(post, req.user._id));
};

export const reportPost = async (req, res) => {
  const { reason, details } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post || post.status !== 'published') return res.status(404).json({ message: 'Post not found' });

  const existing = await Report.findOne({ post: post._id, reportedBy: req.user._id, status: 'open' });
  if (existing) return res.status(400).json({ message: 'You already reported this post' });

  const report = await Report.create({
    post: post._id,
    reportedBy: req.user._id,
    reason,
    details
  });

  res.status(201).json(report);
};
