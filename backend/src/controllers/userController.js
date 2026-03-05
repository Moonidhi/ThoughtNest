import User from '../models/User.js';
import Post from '../models/Post.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('-password')
    .populate({ path: 'savedPosts', match: { status: 'published' }, populate: 'author' });

  const publishedCount = await Post.countDocuments({ author: req.user._id, status: 'published' });
  const draftCount = await Post.countDocuments({ author: req.user._id, status: 'draft' });

  res.json({ user, stats: { publishedCount, draftCount } });
};

export const updateProfile = async (req, res) => {
  const { name, bio, profilePicture } = req.body;
  const user = await User.findById(req.user._id);

  user.name = name ?? user.name;
  user.bio = bio ?? user.bio;
  user.profilePicture = profilePicture ?? user.profilePicture;

  await user.save();
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    profilePicture: user.profilePicture
  });
};
