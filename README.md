<div align="center">

# 🎬 Show Downloader

**A fast, modern,and reliable multi-platform media downloader built with Next.js & Node.js engine.**

[![Vercel Deployment](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Render Deployment](https://img.shields.io/badge/Backend-Render-black?style=for-the-badge&logo=render)](https://render.com)
[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Download high-quality videos and dynamic audio tracks instantly from **YouTube, Instagram Reels, Facebook, and TikTok.**

</div>

---

## ✨ Features

- ⚡ Instant Processing
- 🎯 Multi-Platform Support
- 🎵 Audio Extractor
- 🎬 HD Quality Selector
- 🛡️ Hybrid Microservice Architecture
- 📱 Fully Responsive UI

---

## 🏗️ Architecture Blueprint

```text
                     USER
                      │
                      ▼
          ┌────────────────────┐
          │   Next.js Frontend │
          │      (Vercel)      │
          └─────────┬──────────┘
                    │
            REST API Requests
                    │
                    ▼
          ┌────────────────────┐
          │ Express Backend    │
          │ Node.js + yt-dlp   │
          │     (Render)       │
          └─────────┬──────────┘
                    │
            Extract Video/Audio
                    │
                    ▼
              Download Stream
```

### Frontend (Vercel)

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend (Render)

- Node.js
- Express.js
- yt-dlp
- FFmpeg

---

## 🚀 Getting Started

### Clone

```bash
git clone https://github.com/Shoybit/show-downloader.git
cd show-downloader
```

### Install

```bash
npm install
```

### Environment

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### Run Backend

```bash
node server.mjs
```

### Run Frontend

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🌐 Environment Variables

| Variable | Description |
|-----------|-------------|
| NEXT_PUBLIC_BACKEND_URL | Backend URL |
| YTDLP_SKIP_UPDATE | Skip yt-dlp update |

---

## 👤 Author

**Md Shoyaib Islam**

- GitHub: https://github.com/Shoybit
- LinkedIn: https://www.linkedin.com/in/shoyaib-islam1/

---

<div align="center">

⭐ If you like this project, give it a Star!

</div>
