const RECIPE_EMOJI = {
  peru: '🍗',
  brazil: '🥘',
  japan: '🥞',
  germany: '🥧',
  ireland: '🥧',
  italy: '🍝',
  france: '🥐',
  mexico: '🌮',
  india: '🍛',
  china: '🥡',
  greece: '🫒',
  thailand: '🍜',
};

export function getEmoji(slug) {
  const country = slug.split('-')[0]?.toLowerCase() || '';
  return RECIPE_EMOJI[country] || '🍽️';
}

export function recipePageUrl(slug) {
  return `recipe.html?r=${encodeURIComponent(slug)}`;
}

export async function loadManifest() {
  const response = await fetch('recipes/manifest.json');
  if (!response.ok) throw new Error('Could not load recipe list');
  const data = await response.json();
  return data.recipes || [];
}

export function parseSlugFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('r') || params.get('file')?.replace(/\.md$/, '');
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) return null;
  return slug;
}

export function parseTitleFromMarkdown(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  if (!match) return 'Family Recipe';
  return match[1].replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, '').replace(/\s+/g, ' ').trim();
}
