import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoUrl } = body;

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Media resource target URL query parameter is required." },
        { status: 400 }
      );
    }

    // Windows local sub-process execution structure passing dynamic bypass format flags
    const command = `.\\yt-dlp.exe -j --ffmpeg-location .\\ "${videoUrl}"`;

    const { stdout, stderr } = await execPromise(command);

    if (stderr && !stdout) {
      return NextResponse.json(
        { error: "Extraction processing module initialization failed on provider site." },
        { status: 422 }
      );
    }

    const rawMetadata = JSON.parse(stdout);
    const rawFormats = rawMetadata.formats || [];

    const formattedFormats: any[] = [];

    // 1. Extract and map true physical audio configurations
    rawFormats.forEach((f: any) => {
      if (f.url && f.vcodec === "none" && f.acodec !== "none") {
        formattedFormats.push({
          url: f.url,
          quality: `${f.abr || 128}kbps`,
          ext: "mp3",
          note: "Standalone Audio Track (MP3 Master)"
        });
      }
    });

    // 2. Select progressive pre-merged formats (with video and audio) OR high quality adaptive combinations
    rawFormats.forEach((f: any) => {
      if (f.url && f.vcodec !== "none") {
        const hasAudioTrack = f.acodec && f.acodec !== "none";
        const isDash = f.container === "mp4_dash" || (f.format_note && f.format_note.toLowerCase().includes("dash"));

        formattedFormats.push({
          url: f.url,
          quality: f.height ? `${f.height}p` : f.format_note || f.resolution || "Direct Link",
          ext: f.ext || "mp4",
          note: hasAudioTrack && !isDash
            ? "Complete Media Content (Audio Stream Included)"
            : "High Definition Video (Requires FFMPEG Sync)"
        });
      }
    });

    // 3. Fallback priority override logic for strict Instagram/TikTok direct sources
    if (rawMetadata.url) {
      formattedFormats.push({
        url: rawMetadata.url,
        quality: "720p / Source Quality",
        ext: "mp4",
        note: "Complete Media Content (Audio Stream Included)"
      });
    }

    // De-duplicate array items based on matching quality profiles to clear grid bloat
    const uniqueFormats = Array.from(
      new Map(formattedFormats.map((item) => [item.quality + item.ext + item.note, item])).values()
    );

    const formattedPayload = {
      title: rawMetadata.title || `Video by ${rawMetadata.uploader || "Universal Creator"}`,
      thumbnail: rawMetadata.thumbnail || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1074&auto=format&fit=crop",
      duration: rawMetadata.duration_string || "N/A",
      formats: uniqueFormats.reverse() // Keep prime source downloads on top of stack
    };

    return NextResponse.json(formattedPayload, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Engine execution exception failure configuration or unsupported link protocol.", details: error.message },
      { status: 500 }
    );
  }
}