import mongoose from 'mongoose';
import { calculateReadingTime } from '../utils/readingTime.js';

const reactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['insightful', 'loved_it', 'powerful'], required: true }
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['article', 'substack', 'poem'], required: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    category: {
      type: String,
      enum: ['Technology', 'Life', 'Philosophy', 'Poetry', 'Personal Stories'],
      default: 'Life'
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'published', 'rejected'],
      default: 'draft'
    },
    rejectionReason: { type: String, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    readingTime: { type: Number, default: 1 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reactions: [reactionSchema],
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date }
  },
  { timestamps: true }
);

postSchema.pre('save', function preSave(next) {
  this.readingTime = calculateReadingTime(this.content);
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model('Post', postSchema);
