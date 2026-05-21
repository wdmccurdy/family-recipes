import fs from 'fs';
import path from 'path';

const recipesDir = path.join(process.cwd(), 'recipes');
const files = fs.readdirSync(recipesDir).filter((f) => f.endsWith('.md')).sort();

const recipes = files.map((file) => {
  const content = fs.readFileSync(path.join(recipesDir, file), 'utf8');
  const heading = content.match(/^#\s+(.+)$/m);
  const title = heading
    ? heading[1].replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, '').replace(/\s+/g, ' ').trim()
    : file.replace(/\.md$/, '').split('-').slice(1).join(' ');
  const slug = file.replace(/\.md$/, '');
  const country = slug.split('-')[0] || '';
  return { file, slug, title, country };
});

const manifest = { recipes };
const outPath = path.join(recipesDir, 'manifest.json');
const next = JSON.stringify(manifest, null, 2) + '\n';
const prev = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : '';

if (next === prev) {
  console.log(`No changes (${recipes.length} recipes)`);
} else {
  fs.writeFileSync(outPath, next);
  console.log(`Wrote ${recipes.length} recipes to recipes/manifest.json`);
}
