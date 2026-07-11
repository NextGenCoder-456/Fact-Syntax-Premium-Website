// Server-side YouTube API utilities (not exported to browser)

export function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  const h = parseInt(match[1] || '0');
  const m = parseInt(match[2] || '0');
  const s = parseInt(match[3] || '0');
  const mm = String(m).padStart(h > 0 ? 2 : 1, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function detectCategory(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();
  if (/space|galaxy|black hole|planet|star|cosmos|universe|nasa|asteroid|nebula|solar system|moon|mars|saturn|jupiter/.test(text)) return 'Space';
  if (/psychology|brain|mind|mental|emotion|behavior|memory|cognitive|consciousness|thoughts/.test(text)) return 'Psychology';
  if (/history|ancient|civilization|empire|war|king|queen|medieval|pyramid|egypt|roman|greek|mughal/.test(text)) return 'History';
  if (/mystery|mysterious|unknown|secret|conspiracy|unexplained|paranormal|alien|ufo|bermuda/.test(text)) return 'Mysteries';
  if (/technology|ai|robot|computer|quantum|future|tech|digital|cyber|internet|software/.test(text)) return 'Technology';
  if (/nature|animal|ocean|sea|forest|plant|earth|climate|evolution|species|wild/.test(text)) return 'Nature';
  if (/physics|chemistry|biology|science|experiment|molecule|atom|dna|cell|research/.test(text)) return 'Science';
  return 'Science';
}

export const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
