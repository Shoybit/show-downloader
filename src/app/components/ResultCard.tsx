"use client";

import { VideoData, VideoFormat } from "../types";
import { Download, Film, Music, Clock } from "lucide-react";

interface ResultCardProps {
  data: VideoData;
  viewMode: "video" | "audio"; // Added viewMode prop
}

export default function ResultCard({ data, viewMode }: ResultCardProps) {
  
  // Custom helper function to trigger automated browser streams download
  const handleDownloadTrigger = (formatUrl: string) => {
    // Encodes the target file dynamic stream URL and redirects to download engine pipeline
    window.open(`/api/download-stream?url=${encodeURIComponent(formatUrl)}`, "_blank");
  };

  // Filter formats based on viewMode
  const filteredFormats = data.formats.filter((item: VideoFormat) => {
    if (viewMode === "video") {
      return item.ext !== "mp3"; // Show only video formats (mp4, webm, etc.)
    } else {
      return item.ext === "mp3"; // Show only audio formats (mp3)
    }
  });

  return (
    <div className="w-full bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-2xl text-left flex flex-col md:flex-row gap-6 animate-fade-in">
      
      {/* Left Column: Visual Media Presentation */}
      <div className="w-full md:w-2/5 flex-shrink-0">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
          <img 
            src={data.thumbnail} 
            alt={data.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Column: Information & Actions Terminal Grid */}
      <div className="w-full md:w-3/5 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h2 className="text-base md:text-lg font-bold line-clamp-2 text-slate-100 leading-snug">
            {data.title}
          </h2>
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs md:text-sm">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Duration: {data.duration}</span>
          </div>
          {/* Show current mode indicator */}
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span className="text-slate-500">Showing:</span>
            <span className={`${viewMode === "video" ? "text-blue-400" : "text-emerald-400"}`}>
              {viewMode === "video" ? "📹 Video" : "🎵 Audio"} Formats
            </span>
            <span className="text-slate-600 text-[10px]">
              ({filteredFormats.length} available)
            </span>
          </div>
        </div>

        {/* Action Formats Grid Controller */}
        <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredFormats.length > 0 ? (
            filteredFormats.map((item: VideoFormat, index: number) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/60 hover:border-slate-700/60 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {item.ext === "mp3" ? (
                      <Music className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Film className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-slate-200 uppercase">
                      {item.ext} Quality
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500">
                      {item.quality} {item.note ? `• ${item.note}` : ""}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadTrigger(item.url)}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white transition-all text-xs font-bold px-3 py-2 rounded-lg"
                >
                  <span>Save</span>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-6 bg-slate-950/50 rounded-xl border border-slate-800/30">
              <p className="text-slate-400 text-sm">
                {viewMode === "video" 
                  ? "🎬 No video formats available" 
                  : "🎵 No audio formats available"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}