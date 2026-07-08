import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const streamTargetUrl = searchParams.get("url");

    if (!streamTargetUrl) {
      return NextResponse.json(
        { error: "Target resource downstream payload distribution query pointer link is structurally required context parameter." },
        { status: 400 }
      );
    }

    // Direct platform verification resource media payload context stream pipe setup fetching structure
    const targetMediaResponse = await fetch(streamTargetUrl);

    if (!targetMediaResponse.ok) {
      return NextResponse.json(
        { error: "Downstream platform resource delivery pipelines rejected proxy content connection handshake mapping verification profiles." },
        { status: 502 }
      );
    }

    // Extracts streaming system blobs array content representation format structure
    const contentStreamBlob = targetMediaResponse.body;

    // Strict browser execution headers force-triggers automated local filesystem dynamic target automated save-as download dialog box bypass controls
    const streamBypassHeaders = new Headers();
    streamBypassHeaders.set("Content-Disposition", 'attachment; filename="show_downloader_media.mp4"');
    streamBypassHeaders.set("Content-Type", targetMediaResponse.headers.get("Content-Type") || "video/mp4");

    return new NextResponse(contentStreamBlob, {
      status: 200,
      headers: streamBypassHeaders,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Downstream proxy injection context execution exception system error failure parameters.", details: error.message },
      { status: 500 }
    );
  }
}