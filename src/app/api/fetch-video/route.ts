import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const videoUrl = body.url || body.videoUrl;

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Media resource target URL is required." },
        { status: 400 }
      );
    }

    // Cobalt API-তে রিকোয়েস্ট পাঠানো (এটি ইউটিউব ব্লক বাইপাস করবে)
    const cobaltResponse = await fetch("https://api.cobalt.tools/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: videoUrl,
        videoQuality: "720",
      }),
    });

    const data = await cobaltResponse.json();

    if (!cobaltResponse.ok || data.status === "error") {
      throw new Error(data.text || "Failed to process video");
    }

    // আপনার অ্যাপের রেসপন্স ফরম্যাট
    const formattedPayload = {
      title: "Downloaded Media Track",
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1074&auto=format&fit=crop",
      duration: "N/A",
      formats: [
        {
          url: data.url,
          quality: "720p / Source Quality",
          ext: "mp4",
          note: "Complete Media Content (Audio Stream Included)",
        },
      ],
    };

    return NextResponse.json(formattedPayload, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch video",
        details: error.message,
      },
      { status: 500 }
    );
  }
}