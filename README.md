# Sufyaan Albertus — Portfolio Website

A plain HTML/CSS site. There's no build step and nothing to install, so it can be hosted free forever on GitHub Pages.

```
portfolio/
├── index.html               ← home page
├── projects/
│   ├── buzz-together.html   ← project pages (items a–h)
│   ├── whisper-village.html
│   └── last-watch.html
├── css/style.css            ← all styling (colours at the top)
├── js/main.js               ← mobile menu
└── assets/                  ← your images, CV, video thumbnails
```

---

## 1. Fill in your content (before launching)

Search each file for `[` and `YOUR-` to find every placeholder.

| What | Where |
|---|---|
| Team member names | `projects/*.html` → `poster-credits` |
| Brief, role and what you built | `projects/*.html` → sections C, D, "What I built" |
| YouTube video | `projects/*.html` → section G: un-comment the `<iframe>`, paste your video ID, delete the placeholder `<div>` |
| itch.io download link | `projects/*.html` → section H link |
| LinkedIn / GitHub / itch.io | `index.html` → footer links |
| CV | Save it as `assets/Sufyaan-Albertus-CV.pdf` |
| Images | See below |

### Adding images
1. Save each image as **.webp**, max **1600 px wide**, under **300 KB**. Free tool: https://squoosh.app
2. Put the images in `assets/<game>/` (for example `assets/buzz-together/cover.webp`).
3. In the HTML, replace the commented placeholder with the image. For example:
   - On the home page card:
     `<img src="assets/buzz-together/cover.webp" alt=""><div class="art-overlay"></div>`
   - In the process section:
     `<div class="shot"><img src="../assets/buzz-together/graybox.webp" alt="Graybox level in Unity"></div>`

### Test locally
Double-click `index.html` to open it in your browser.

---

## 2. Launch free on GitHub Pages (recommended)

GitHub Pages is free, has no ads, never sleeps and doesn't expire. Your address will be `https://YOUR-USERNAME.github.io`.

1. **Create an account** at https://github.com. Pick a professional username like `sufyaanalbertus`, because it becomes your web address.
2. Click **+ → New repository**.
   - **Repository name:** exactly `YOUR-USERNAME.github.io` (for example `sufyaanalbertus.github.io`).
   - **Public:** must be ticked. Free Pages only works on public repos.
   - Click **Create repository**.
3. On the new repo page, click **"uploading an existing file"**.
4. Open the `portfolio` folder on your computer and **drag everything inside it** into the browser. Drag `index.html`, `css`, `js`, `projects` and `assets`, not the `portfolio` folder itself. Then click **Commit changes**.
5. Go to **Settings → Pages**.
   - Under **Source**, choose **Deploy from a branch**.
   - Choose branch **main**, folder **/ (root)**, then click **Save**.
6. Wait 1–2 minutes. Your site is live at **https://YOUR-USERNAME.github.io** and anyone, anywhere, can open it.

### Updating the site later
In your repo, open a file → click the ✏️ pencil → edit → **Commit changes**. You can also drag new files into **Add file → Upload files**. The live site updates within about a minute.

---

## 3. Alternative: Netlify (also free)

1. Sign up at https://app.netlify.com. Signing up stops the site from expiring.
2. Go to **Add new site → Deploy manually**.
3. Drag the whole `portfolio` folder in. You'll get an address like `something.netlify.app`.
4. Rename it in **Site configuration → Change site name** (for example `sufyaan-albertus.netlify.app`).

---

## 4. Optional: your own domain

The brief only *requires* a bespoke domain if you use Wix. A custom domain such as `sufyaan.dev` or `sufyaanalbertus.co.za` still looks more professional on your poster and cards.

1. Buy the domain from a registrar. Domains.co.za and Afrihost sell `.co.za`; Namecheap and Porkbun sell `.dev` and `.com`.
2. GitHub: go to **Settings → Pages → Custom domain**, enter your domain, then click **Save**.
3. At your registrar, add these DNS records:
   - Four **A** records for `@` pointing to:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - One **CNAME** record for `www` pointing to `YOUR-USERNAME.github.io`
4. Back in Pages settings, tick **Enforce HTTPS** once it's available. DNS can take a few hours to update.

---

## 5. After launch: checklist for the showcase

- [ ] Open the site on your phone. The menu should collapse into a "MENU" button.
- [ ] Make QR codes from the **final** URL (for example https://www.qr-code-generator.com or Canva's QR tool). Download as SVG or PNG, at least 4 × 4 cm when printed.
- [ ] Scan every printed QR code with a phone before the exhibition.
- [ ] Add the site URL to your LinkedIn (Contact info → Website) and your business cards.
- [ ] Spell-check every page (paste the text into Word or Grammarly).
- [ ] Turn off the laptop's sleep timer for the exhibition, and open the site fullscreen with F11.

---

## Your links (already wired into the site)

| Game | YouTube | itch.io |
|---|---|---|
| Buzz Together | https://youtu.be/Wa3_inxNxXE | https://sufyaan-albertus.itch.io/buzz-together |
| Whisper Village | https://youtu.be/ArffidCrWk4 | https://sufyaan-albertus.itch.io/whisper-village |
| Last Watch | https://youtu.be/nda8C_ZiPSg | https://sufyaan-albertus.itch.io/last-watch |

- The site, the QR codes and the business card all point to **https://sufyaanalbertus.github.io**. Your GitHub repository must be named exactly `sufyaanalbertus.github.io` for that to work.
- Keep the YouTube videos **Public** or **Unlisted** (not Private), or the embeds and QR codes won't play.
- Keep the itch.io pages **Public**.
