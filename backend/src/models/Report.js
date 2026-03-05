import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, enum: ['spam', 'plagiarism', 'offensive'], required: true },
    details: { type: String, default: '' },
    status: { type: String, enum: ['open', 'reviewed'], default: 'open' }
  },
  { timestamps: true }
);

export default mongoose.model('Report', reportSchema);
