
# Shravya Shetty — Portfolio

A premium black-themed, glassmorphic portfolio site. Pure HTML/CSS/JS — no build step, no dependencies.

## Run locally
Just open `index.html` in a browser. That's it.

## Deploy on GitHub Pages (free hosting)
1. Create a new GitHub repository, e.g. `portfolio`.
2. Upload all files in this folder (`index.html`, `style.css`, `script.js`, `assets/`) to the repo root.
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then **Save**.
6. Wait ~1 minute — your site will be live at:
   `https://<your-username>.github.io/portfolio/`

## Update the résumé
Replace `assets/Shravya_Shetty_Resume.pdf` with a new file of the **same name** to update the downloadable résumé, or update the filename in the two `href="assets/..."` links inside `index.html`.

## Update project links
Two of the three projects are currently marked "Private repository" (per your resume, no GitHub links given). Once you push those projects to GitHub, open `index.html`, find the `project-card__private` span for that project, and replace it with:

```html
<a href="https://github.com/shravyajs7/your-repo-name" target="_blank" rel="noopener">GitHub</a>
```

## Structure
```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── Shravya_Shetty_Resume.pdf
```
