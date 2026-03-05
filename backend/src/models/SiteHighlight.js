import mongoose from 'mongoose';

const siteHighlightSchema = new mongoose.Schema(
  {
    thoughtOfDay: { type: String, default: 'Write with honesty. Edit with mercy.' },
    poemOfDay: {
      type: String,
      default: 'In midnight ink, the quiet words still glow.'
    },
    weeklyChallenge: {
      type: String,
      default: 'Write a 500-word memory using only sensory details.'
    },
    featuredWriter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('SiteHighlight', siteHighlightSchema);
