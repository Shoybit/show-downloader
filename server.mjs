import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const execPromise = promisify(exec);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function to execute yt-dlp safely via npx
const runYtDlp = (args) => {
  return execPromise(`npx --yes yt-dlp ${args}`);
};

// 1. Fetch Video Metadata Route
app.post('/api/fetch-video', async (req, res) => {
  try {
    const { videoUrl } = req.body;
    if (!videoUrl) {
      return res.status(400).json({ error: "Video URL parameters are required." });
    }

    // Using npx to run yt-dlp directly without needing global installation
    const { stdout } = await runYtDlp(`-j "${videoUrl}"`);
    const rawMetadata = JSON.parse(stdout);
    
    const formattedFormats = (rawMetadata.formats || [])
      .filter(f => f.url && (f.vcodec !== 'none' || f.acodec !== 'none'))
      .map(f => {
        const isAudioOnly = f.vcodec === 'none' && f.acodec !== 'none';
        return {
          url: f.url,
          quality: isAudioOnly ? `${f.abr || 128}kbps` : f.format_note || f.resolution || "Adaptive Stream",
          ext: isAudioOnly ? "mp3" : f.ext || "mp4",
          note: isAudioOnly 
            ? "Standalone Audio Track (MP3)" 
            : (f.acodec && f.acodec !== 'none') 
              ? "Complete Media Content (Audio Included)" 
              : "High Definition Video (Requires FFmpeg Sync)"
        };
      });

    res.status(200).json({
      title: rawMetadata.title || "Universal Media Resource",
      thumbnail: rawMetadata.thumbnail || "",
      duration: rawMetadata.duration_string || "N/A",
      formats: formattedFormats.reverse()
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to process video link." });
  }
});

// 2. Download Stream Route
app.get('/api/download-stream', async (req, res) => {
  try {
    const { videoUrl, ext } = req.query;
    if (!videoUrl) {
      return res.status(400).json({ error: "Original source video link parameters required." });
    }

    const tempDir = '/tmp';
    const uniqueId = `stream_${Date.now()}`;
    const outputFilePathPattern = path.join(tempDir, `${uniqueId}.%(ext)s`);

    let formatSelector = "bestvideo+bestaudio/best";
    if (ext === 'mp3') formatSelector = "bestaudio/best";

    await runYtDlp(`-f "${formatSelector}" "${videoUrl}" -o "${outputFilePathPattern}"`);

    const files = fs.readdirSync(tempDir);
    const targetFile = files.find(f => f.startsWith(uniqueId));
    if (!targetFile) {
      return res.status(500).json({ error: "Server-side dynamic file compilation failed." });
    }

    const fullFinalPath = path.join(tempDir, targetFile);
    const fileBuffer = fs.readFileSync(fullFinalPath);
    
    try { fs.unlinkSync(fullFinalPath); } catch (e) {}

    res.setHeader("Content-Disposition", `attachment; filename="show_downloader_${Date.now()}.${ext}"`);
    res.setHeader("Content-Type", ext === 'mp3' ? "audio/mpeg" : "video/mp4");
    res.status(200).send(fileBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Production API Engine Running on Port: ${PORT}`));