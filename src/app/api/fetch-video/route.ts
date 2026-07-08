import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

// Production API post endpoint handling pipeline matching route configuration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoUrl } = body;

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Media resource target URL query pattern parameter is required." },
        { status: 400 }
      );
    }

    // Extraction processing command config utilizing universal wrapper yt-dlp core architecture engine
    // -j triggers single execution script processing returns raw structured payload metadata JSON block
    const command = `yt-dlp -j "${videoUrl}"`;

    const { stdout, stderr } = await execPromise(command);

    if (stderr && !stdout) {
      return NextResponse.json(
        { error: "Extraction processing module initialization failed on targeting provider site query pipeline runtime." },
        { status: 422 }
      );
    }

    const rawMetadata = JSON.parse(stdout);

    // Transforming backend extraction payload maps down structure strictly according to frontend unified types matching specifications
    const formattedPayload = {
      title: rawMetadata.title || "Universal Media Resource File",
      thumbnail: rawMetadata.thumbnail || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1074&auto=format&fit=crop",
      duration: rawMetadata.duration_string || "N/A",
      formats: (rawMetadata.formats || [])
        .filter((f: any) => f.url && (f.vcodec !== "none" || f.acodec !== "none"))
        .map((f: any) => ({
          url: f.url,
          quality: f.format_note || f.resolution || "Adaptive Output Structure",
          ext: f.ext || "mp4",
          note: f.vcodec !== "none" && f.acodec === "none" ? "Video Only (No Audio Stream)" : f.vcodec === "none" ? "Audio Track Base Only" : "Merged Production Master Content"
        }))
        .reverse() // Sorts quality structure matching hierarchies to highest resolution sequence array stack profiles
    };

    return NextResponse.json(formattedPayload, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Engine execution exception failure configuration or unsupported link protocol reference target profile.", details: error.message },
      { status: 500 }
    );
  }
}