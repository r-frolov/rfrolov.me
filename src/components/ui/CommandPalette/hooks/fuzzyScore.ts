/**
 * Minimal fuzzy-matcher. Walks query chars through text in order and
 * returns a positive score when every query char is found; 0 otherwise.
 *
 * Scoring heuristics (rough but effective for short command labels):
 *   +10 per matched char
 *   +6  per consecutive run (matches adjacent to the last one)
 *   +4  when the match sits on a word boundary (start of string, or the
 *       char right after a space, hyphen, underscore, or slash)
 *   -1  per gap char between matches
 *
 * Example: query "bp" on "Blog Posts" → matches 'b' at 0 (boundary bonus),
 * 'p' at 5 (boundary bonus), gap of 4. Beats "Blog" on its own (only 'b').
 */
export function fuzzyScore(text: string, query: string): number {
  if (!query) return 1;
  if (!text) return 0;

  const t = text.toLowerCase();
  const q = query.toLowerCase();

  let score = 0;
  let ti = 0;
  let lastMatch = -2;

  for (let qi = 0; qi < q.length; qi++) {
    let found = -1;

    for (let i = ti; i < t.length; i++) {
      if (t[i] === q[qi]) {
        found = i;
        break;
      }
    }

    if (found === -1) return 0;

    score += 10;

    if (found === lastMatch + 1) {
      score += 6;
    }

    const prev = found === 0 ? " " : t[found - 1];

    if (prev === " " || prev === "-" || prev === "_" || prev === "/") {
      score += 4;
    }

    score -= Math.max(0, found - ti - 1);
    lastMatch = found;
    ti = found + 1;
  }

  return score;
}
