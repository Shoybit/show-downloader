import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const streamTargetUrl = searchParams.get("url");

    if (!streamTargetUrl) {
      return NextResponse.json(
        { error: "Target resource URL is required." },
        { status: 400 }
      );
    }

    
    const targetMediaResponse = await fetch(streamTargetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!targetMediaResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch media stream from target platform." },
        { status: 502 }
      );
    }

    const contentType = targetMediaResponse.headers.get("Content-Type") || "video/mp4";
    const contentLength = targetMediaResponse.headers.get("Content-Length");

    
    let filename = "show_downloader_media.mp4";
    if (contentType.includes("audio") || contentType.includes("mpeg")) {
      filename = "show_downloader_media.mp3";
    }

    const streamBypassHeaders = new Headers();
    streamBypassHeaders.set(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
    streamBypassHeaders.set("Content-Type", contentType);

    if (contentLength) {
      streamBypassHeaders.set("Content-Length", contentLength);
    }

    return new NextResponse(targetMediaResponse.body, {
      status: 200,
      headers: streamBypassHeaders,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to process media stream download pipeline.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}