const estimateReadingTime = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return minutes;
};

export const baseAbstracts = [
  {
    id: "veil-of-quiet",
    title: "The Veil of Quiet",
    content:
      "Silence is not the absence of thought but the posture that allows thought to reveal its contours. In the quiet hours, the mind learns to arrange its own library, shelving the urgent beside the eternal. The old scholar understood that knowledge grows best in dim light, when the world is reduced to a candle and a page. We mistake calm for emptiness, yet it is full of a slow and luminous pressure. There, the inner voice becomes legible, and the ordinary becomes annotated with hidden citations.",
    author: "Mira Halstead",
    category: "Philosophy"
  },
  {
    id: "city-annotations",
    title: "Annotations on a City That Reads",
    content:
      "A city that reads is a city that remembers. Its windows glow like marginalia, each apartment a footnote to another life. The bus routes are chapters, stitched together by the briefness of shared glances. In such a place, you are never alone in your research; the crowd is a living bibliography. The discipline of the archive becomes a shared ritual, and the night turns the streets into the quiet of a library aisle.",
    author: "Jonas Wren",
    category: "Urban Studies"
  },
  {
    id: "slow-rituals",
    title: "Slow Rituals for the Modern Reader",
    content:
      "To read slowly is to refuse the tyranny of the feed. The slow reader takes inventory of commas, pauses at the architecture of a paragraph, and is not ashamed of rereading the same sentence twice. In the era of acceleration, slowness is a practice of dignity. It restores the tactile sense of attention—paper weight, the scent of ink, the intimacy of a margin. Slowness returns the reader to herself, a small and deliberate act of resistance.",
    author: "Selene Arbour",
    category: "Culture"
  },
  {
    id: "midnight-letters",
    title: "Midnight Letters and the Discipline of Waiting",
    content:
      "The midnight letter was never meant to be answered. It is a draft addressed to the future, written in the glow of a lamp and the hush of an apartment that has finally quieted. It teaches the discipline of waiting: the space between expression and reply. In that interval, the writer becomes the reader of her own interior. What arrives at dawn is a softer self, edited by the night.",
    author: "Arielle Kwon",
    category: "Essays"
  },
  {
    id: "library-after-hours",
    title: "The Library After Hours",
    content:
      "After hours, the library breathes differently. The fluorescent hum subsides, the stacks reclaim their shadows, and the books seem to lean toward one another like conspirators. Here, the student learns that knowledge is not only collected but kept. The dust is evidence of devotion. To walk these aisles is to be among the faithful, the ones who believe that thought can be preserved like wine, waiting for a proper evening.",
    author: "Caleb Thorne",
    category: "Literature"
  },
  {
    id: "how-ink-settles",
    title: "How Ink Settles",
    content:
      "Ink settles the way memory settles: slowly, with a trace of sediment at the bottom of a sentence. The first draft splashes; the second draft clarifies. This is why the notebook is sacred in certain rooms. It is not the perfection of the line but the accumulation of lines that reveals the pattern. A thought in motion will always look messy; only after it settles can it be read with care.",
    author: "Noah Ravel",
    category: "Craft"
  },
  {
    id: "notes-on-weathered-pages",
    title: "Notes on Weathered Pages",
    content:
      "There is a patient beauty to weathered pages. They carry fingerprints, cafe steam, and the hesitant underline of someone who loved a sentence but did not want to disturb it. In the margins, the previous reader leaves a trail—an invitation, a disagreement, a confession. To inherit a used book is to inherit a conversation that continues beyond the first author. It is a quiet chain of mentors you never meet.",
    author: "Priya Dastur",
    category: "Bookcraft"
  },
  {
    id: "the-architecture-of-pauses",
    title: "The Architecture of Pauses",
    content:
      "Pauses are the architecture of comprehension. In lecture halls, the mind collects itself in the small silences between sentences. In books, white space is the reader’s private study. We speak of flow, but it is the pause that gives flow its meaning. The thoughtful reader builds her own rhythm, honoring the places where the text breathes. If we learn to pause, we learn to listen to what the author could not say directly.",
    author: "Elias Ford",
    category: "Rhetoric"
  },
  {
    id: "republic-of-margins",
    title: "The Republic of Margins",
    content:
      "The margins are a small republic with its own laws. There, the reader becomes co-author, scribbling dissent or delight beside the printed line. The margin holds a history of selves, each returning to the same page in a different season. It is a quiet freedom: no editor, no citation, only the direct dialogue between your mind and the text. A book with empty margins is a room that was never lived in.",
    author: "Lucien Vale",
    category: "Philosophy"
  },
  {
    id: "two-page-essay",
    title: "On the Long Hallway of Thought",
    content:
      "A long hallway invites pacing, and so does an idea that refuses to end. We walk its length again and again, noticing how each lamp throws a different angle on the same argument. The patient thinker resists the urge to decorate conclusions too quickly. Instead, she tests her premises against the quiet pressure of time. She hears the floorboards creak beneath a new possibility, then turns back to take it seriously.\n\nThe hallway is not a maze; it is a line of inquiry. Each step is an annotation, and the pace is the method. When we reach the end we are not finished, only prepared to begin again. It is the slow rehearsal of the mind that yields the most durable insights.\n\nThere are days when the hallway is crowded. The thought is interrupted by errands, by messages, by the small emergencies that disguise themselves as priorities. Yet the hallway remains. We return and find our earlier steps, the outlines of our own patience. This is the true work of scholarship: the ordinary act of returning.\n\nAnd in returning, we discover that the hallway has changed. A window is open. The light is different. The idea has moved.",
    author: "Rowan Adey",
    category: "Longform"
  }
];

export const withReadingTime = (list) =>
  list.map((abstract) => ({
  ...abstract,
  readingTime: estimateReadingTime(abstract.content)
}));

export const getAllAbstracts = () => {
  if (typeof window === "undefined") return withReadingTime(baseAbstracts);
  const stored = localStorage.getItem("thoughtnest_user_articles");
  const userArticles = stored ? JSON.parse(stored) : [];
  return withReadingTime([...userArticles, ...baseAbstracts]);
};

export default withReadingTime(baseAbstracts);
