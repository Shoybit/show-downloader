"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { ArrowRight, Loader2, Link2 } from "lucide-react";
import { VideoData } from "../types";

interface UrlInputProps {
  setVideoData: (data: VideoData | null) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  setError: (error: string) => void;
}

export default function UrlInput({ setVideoData, setLoading, loading, setError }: UrlInputProps) {
  const [url, setUrl] = useState<string>("");

  const handleFetch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!url.trim()) {
      return setError("Please paste a valid media URL link.");
    }

    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const response = await axios.post("/api/fetch-video", { videoUrl: url });
      if (response.data) {
        setVideoData(response.data);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error || 
        "Failed to resolve URL. Please verify your resource link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleFetch} 
      className="relative flex items-center bg-slate-900 border border-slate-800 focus-within:border-indigo-500/50 rounded-2xl p-2 shadow-2xl transition-all duration-300"
    >
      <div className="pl-3 text-slate-500">
        <Link2 className="w-5 h-5" />
      </div>
      
      <input
        type="text"
        placeholder="Paste Instagram Reels, YouTube, or Facebook link..."
        className="w-full bg-transparent pl-3 pr-12 py-3.5 text-slate-200 outline-none text-sm md:text-base placeholder:text-slate-600 font-medium"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
      />
      
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all text-white px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 disabled:opacity-50 active:scale-95 shadow-lg shadow-indigo-600/20"
      >
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <>
            <span>Fetch</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}