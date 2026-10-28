# herbertheitmann.com

The portfolio of Herbert Heitmann, as a plain static website (no Wix, no framework, no build step needed to host it).
It is published with **GitHub Pages** at **https://www.herbertheitmann.com**.

## What is in this folder

| Folder / file | What it is |
| --- | --- |
| `index.html`, `about/`, `contact/`, `graphic-design/` … | The pages. Each folder holds one `index.html`, so the address is `/about/`, `/contact/` and so on. |
| `assets/css/site.css` | All the styling. |
| `assets/js/site.js` | The small bits of behaviour (image sliders, the large picture view, "Read more", the contact form). |
| `img/`, `fonts/`, `media/` | Pictures, fonts and the one video. |
| `CNAME` | Tells GitHub Pages the domain to use. Don't delete it. |
| `404.html` | The page shown for addresses that don't exist. |
| `build/` | The scripts the pages were generated with. You do not need them to run the site. |

## Changing text or pictures

The finished `.html` files are in the repository, so a small fix (a typo, a link) can be made by editing the `.html` file directly on GitHub (pencil icon) and committing.
Larger changes are easier through the generator: run `node build/build.js` (needs [Node.js](https://nodejs.org)) and commit the result.
The text of the case studies lives in `build/data/*.json`; the Home, About and Contact pages live in `build/pages/`.

## The contact form

Pages on GitHub have no server, so the form needs a free form service to deliver the messages (for example Formspree).
Create a form there, then paste its address into `assets/js/site.js`:

```js
var ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
```

## Domain and HTTPS (one-time set-up)

1. Repository → **Settings → Pages**: Source **Deploy from a branch**, branch `main`, folder `/ (root)`.
2. Same page, **Custom domain**: `www.herbertheitmann.com` → Save. (The `CNAME` file does the same thing.)
3. At the company where the domain is registered (the DNS settings), add:
   * a **CNAME** record: host `www` → `bandkoconnect-ui.github.io`
   * four **A** records for the bare domain `herbertheitmann.com` (host `@`) → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (so `herbertheitmann.com` forwards to `www`)
   * remove any old records that still point to Wix.
4. After a few minutes to a few hours, tick **Enforce HTTPS** on the Pages settings page.
