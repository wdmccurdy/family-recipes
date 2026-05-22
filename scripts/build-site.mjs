import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const root = process.cwd();
const recipesDir = path.join(root, 'recipes');

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
  swiss: '🧀',
};

function getEmoji(slug) {
  const country = slug.split('-')[0]?.toLowerCase() || '';
  return RECIPE_EMOJI[country] || '🍽️';
}

function parseTitle(content) {
  const heading = content.match(/^#\s+(.+)$/m);
  if (!heading) return 'Family Recipe';
  return heading[1].replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, '').replace(/\s+/g, ' ').trim();
}

const files = fs.readdirSync(recipesDir).filter((f) => f.endsWith('.md')).sort();
const recipes = files.map((file) => {
  const content = fs.readFileSync(path.join(recipesDir, file), 'utf8');
  const slug = file.replace(/\.md$/, '');
  return {
    file,
    slug,
    title: parseTitle(content),
    country: slug.split('-')[0] || '',
    content,
  };
});

const manifest = { recipes: recipes.map(({ file, slug, title, country }) => ({ file, slug, title, country })) };
fs.writeFileSync(path.join(recipesDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const recipeStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        body { font-family: 'Poppins', sans-serif; }
        .markdown-content h1 { font-size: 2rem; font-weight: 700; margin-bottom: 0.75rem; color: #1f2937; }
        .markdown-content h2 { font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; color: #374151; }
        .markdown-content h3 { font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem; color: #4b5563; }
        .markdown-content p { margin-bottom: 1rem; line-height: 1.7; color: #374151; }
        .markdown-content ul, .markdown-content ol { margin-bottom: 1rem; padding-left: 1.5rem; }
        .markdown-content ul { list-style-type: disc; }
        .markdown-content ol { list-style-type: decimal; }
        .markdown-content li { margin-bottom: 0.35rem; }
        .markdown-content strong { color: #1f2937; }
        .markdown-content hr { margin: 2rem 0; border-color: #fed7aa; }
        .markdown-content a { color: #ea580c; text-decoration: underline; }
`;

function recipePageHtml({ title, slug, content }) {
  const html = marked.parse(content);
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | McCurdy Family Vault</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>${recipeStyles}</style>
</head>
<body class="bg-orange-50 min-h-screen">
    <nav class="bg-white shadow-sm border-b sticky top-0 z-50">
        <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <a href="../index.html" class="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors shrink-0">
                <i class="fas fa-arrow-left"></i>
                <span class="font-medium">All recipes</span>
            </a>
            <span class="text-2xl">🍳</span>
        </div>
    </nav>
    <main class="max-w-4xl mx-auto px-6 py-8">
        <article class="bg-white rounded-3xl shadow-lg border border-orange-100 p-8 md:p-10 markdown-content">
            ${html}
        </article>
        <div class="mt-10 flex justify-center">
            <a href="../index.html"
               class="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-3xl font-medium text-lg transition-all">
                <i class="fas fa-arrow-left"></i>
                Back to all recipes
            </a>
        </div>
    </main>
</body>
</html>
`;
}

for (const recipe of recipes) {
  const dir = path.join(root, recipe.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), recipePageHtml(recipe));
}

const cardsHtml = recipes
  .map(
    (recipe) => `
                <a href="./${recipe.slug}/"
                   class="recipe-card block bg-white rounded-3xl shadow-lg overflow-hidden border border-orange-100 hover:border-orange-300">
                    <div class="h-48 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-7xl">
                        ${getEmoji(recipe.slug)}
                    </div>
                    <div class="p-6">
                        <h3 class="font-semibold text-2xl text-gray-800 mb-1">${recipe.title}</h3>
                        <p class="text-orange-600 text-sm font-medium capitalize">${recipe.country} night</p>
                        <div class="mt-6 flex items-center gap-2 text-xs text-gray-500">
                            <i class="fas fa-book-open"></i>
                            <span>View recipe</span>
                        </div>
                    </div>
                </a>`
  )
  .join('\n');

const indexTemplate = fs.readFileSync(path.join(root, 'index.template.html'), 'utf8');
const indexHtml = indexTemplate.replace('<!-- RECIPE_CARDS -->', cardsHtml);
fs.writeFileSync(path.join(root, 'index.html'), indexHtml);

console.log(`Built ${recipes.length} recipe pages and updated index.html`);
