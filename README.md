# McCurdy Family Recipes

Family dinner night recipes, hosted on GitHub Pages.

**Live site:** [https://wdmccurdy.github.io/family-recipes/](https://wdmccurdy.github.io/family-recipes/)

## Add a new recipe

1. Create a new markdown file in `recipes/`, for example `recipes/italy-risotto.md`
2. Start the file with a `#` heading (that becomes the title on the site)
3. Commit and push to `main`

The site picks up new recipes automatically. A GitHub Action runs `npm run build` to generate the homepage and a webpage for each recipe at `https://wdmccurdy.github.io/family-recipes/your-file-name/` (without `.md`).

### Filename tips

- Use lowercase and hyphens: `country-dish-name.md`
- The first word is used for the country label on cards (e.g. `peru-pollo-a-la-brasa.md` → “peru night”)

### Build locally (optional)

```bash
npm install
npm run build
```

## Current recipes

- [Peru — Pollo a la Brasa](https://wdmccurdy.github.io/family-recipes/peru-pollo-a-la-brasa/)
- [Japan — Okonomiyaki](https://wdmccurdy.github.io/family-recipes/japan-okonomiyaki/)
- [Brazil — Moqueca](https://wdmccurdy.github.io/family-recipes/brazil-moqueca/)
- [Ireland — Guinness Pie](https://wdmccurdy.github.io/family-recipes/ireland-guinness-pie/)
- [Germany — Schnitzel Night](https://wdmccurdy.github.io/family-recipes/germany-schnitzel/) *(placeholder)*
- [Spain — Tortilla Night](https://wdmccurdy.github.io/family-recipes/spain-tortilla/) *(placeholder)*
- [Morocco — Chicken & Apricot](https://wdmccurdy.github.io/family-recipes/morocco-chicken-apricot/) *(placeholder)*
