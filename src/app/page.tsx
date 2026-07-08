"use client";

import { useState } from "react";
// Strict relative dot imports use kore alias paths override kora holo:
import UrlInput from "./components/UrlInput";
import ResultCard from "./components/ResultCard";
import { VideoData } from "./types";
import { DownloadCloud } from "lucide-react";

export default function Home() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start pt-20 px-4 antialiased">
      <div className="max-w-3xl w-full text-center space-y-8 z-10">
        
        {/* Branding Area */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600/10 rounded-2xl border border-indigo-500/20 text-indigo-400 mb-2">
            <DownloadCloud className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Show Downloader
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto font-medium leading-relaxed">
            Download high-quality videos and audio tracks from Instagram Reels, YouTube, or Facebook instantly.
          </p>
        </div>

        {/* Input Option Box */}
        <div className="w-full bg-slate-900/40 border border-slate-900 p-6 rounded-3xl shadow-xl backdrop-blur-md">
          <UrlInput 
            setVideoData={setVideoData} 
            setLoading={setLoading} 
            loading={loading} 
            setError={setError} 
          />
        </div>

        {/* Error Exception Banner */}
        {error && (
          <div className="text-red-400 bg-red-950/20 px-4 py-3 rounded-xl border border-red-500/20 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Skeleton Loading State */}
        {loading && (
          <div className="w-full p-6 bg-slate-900/40 border border-slate-800/60 rounded-3xl space-y-4 animate-pulse">
            <div className="h-4 bg-slate-800 rounded w-2/3"></div>
            <div className="h-32 bg-slate-800 rounded-2xl w-full"></div>
          </div>
        )}

        {/* Result Action Output Card */}
        {videoData && !loading && (
          <div className="transform transition-all duration-300 scale-100 opacity-100">
            <ResultCard data={videoData} />
          </div>
        )}
        
      </div>
    </main>
  );
}