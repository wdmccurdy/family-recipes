# McCurdy Family Recipes

Family dinner night recipes, hosted on GitHub Pages.

**Live site:** [https://wdmccurdy.github.io/family-recipes/](https://wdmccurdy.github.io/family-recipes/)

## Add a new recipe

1. Create a new markdown file in `recipes/`, for example `recipes/italy-risotto.md`
2. Start the file with a `#` heading (that becomes the title on the site)
3. Commit and push to `main`

The site picks up new recipes automatically. A GitHub Action updates `recipes/manifest.json` so the homepage lists every `.md` file. Each recipe gets its own page at `recipe.html?r=your-file-name` (without `.md`).

### Filename tips

- Use lowercase and hyphens: `country-dish-name.md`
- The first word is used for the country label on cards (e.g. `peru-pollo-a-la-brasa.md` → “peru night”)

### Update the index locally (optional)

```bash
node scripts/generate-manifest.mjs
```

## Current recipes

- [Peru — Pollo a la Brasa](recipes/peru-pollo-a-la-brasa.md)
- [Japan — Okonomiyaki](recipes/japan-okonomiyaki.md)
- [Brazil — Moqueca](recipes/brazil-moqueca.md)
- [Ireland — Guinness Pie](recipes/germany-guiness-pie.md)
