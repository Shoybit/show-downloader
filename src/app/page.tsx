"use client";

import { useState } from "react";
import UrlInput from "./components/UrlInput";
import ResultCard from "./components/ResultCard";
import { VideoData } from "./types";
import { 
  FaDownload,
  FaVideo,
  FaMusic,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaShieldAlt,
  FaBolt,
  FaStar,
  FaHeart,
  FaCode
} from "react-icons/fa";

export default function Home() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [viewMode, setViewMode] = useState<"video" | "audio">("video");

  // Feature items for the grid
  const features = [
    { icon: FaBolt, label: "Instant Download", color: "text-yellow-400" },
    { icon: FaGlobe, label: "Multi-Platform", color: "text-blue-400" },
    { icon: FaShieldAlt, label: "Secure & Free", color: "text-green-400" },
  ];

  // Social links
  const socialLinks = [
    { 
      icon: FaGithub, 
      label: "GitHub", 
      url: "https://github.com/Shoybit",
      color: "hover:text-gray-300"
    },
    { 
      icon: FaLinkedin, 
      label: "LinkedIn", 
      url: "https://www.linkedin.com/in/shoyaib-islam1/",
      color: "hover:text-blue-400"
    },
    { 
      icon: FaInstagram, 
      label: "Instagram", 
      url: "https://www.instagram.com/shoyaib_chowdhury0/",
      color: "hover:text-pink-400"
    },
    { 
      icon: FaFacebook, 
      label: "Facebook", 
      url: "https://www.facebook.com/shoyaibchowdhury0",
      color: "hover:text-blue-500"
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 flex flex-col items-center justify-start pt-12 px-4 antialiased relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl w-full text-center space-y-8 z-10 relative">
        
        {/* Premium Branding Area */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl border border-indigo-500/20 backdrop-blur-sm shadow-2xl mb-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <FaDownload className="w-12 h-12 text-transparent bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text relative z-10" />
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Show Downloader
            </span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Premium video downloader for{" "}
            <span className="text-indigo-400 font-semibold">Instagram</span>,{" "}
            <span className="text-blue-400 font-semibold">YouTube</span>, and{" "}
            <span className="text-purple-400 font-semibold">Facebook</span>
          </p>
          
          <p className="text-slate-500 text-sm max-w-md mx-auto font-light">
            Download high-quality videos and audio tracks instantly
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300 group cursor-default"
            >
              <feature.icon className={`w-4 h-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
              <span className="text-xs text-slate-300 font-medium">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* View Mode Selector - Video/Audio Toggle */}
        <div className="flex items-center justify-center gap-2 bg-slate-800/30 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-700/30 max-w-xs mx-auto">
          <button
            onClick={() => setViewMode("video")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
              viewMode === "video"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
            }`}
          >
            <FaVideo className="w-4 h-4" />
            Video
          </button>
          <button
            onClick={() => setViewMode("audio")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
              viewMode === "audio"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/30"
            }`}
          >
            <FaMusic className="w-4 h-4" />
            Audio
          </button>
        </div>

        {/* Premium Input Box */}
        <div className="w-full bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl"></div>
          <div className="relative z-10">
            <UrlInput 
              setVideoData={setVideoData} 
              setLoading={setLoading} 
              loading={loading} 
              setError={setError} 
            />
          </div>
        </div>

        {/* Enhanced Error Banner */}
        {error && (
          <div className="group relative">
            <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-xl"></div>
            <div className="relative text-red-400 bg-red-950/30 backdrop-blur-sm px-6 py-4 rounded-xl border border-red-500/20 text-sm font-medium flex items-center justify-center gap-2">
              <span className="text-red-400/60">⚠</span>
              {error}
            </div>
          </div>
        )}

        {/* Premium Skeleton Loading */}
        {loading && (
          <div className="w-full p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-3xl space-y-4 animate-pulse backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-700/50 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
                <div className="h-3 bg-slate-700/50 rounded w-1/3"></div>
              </div>
            </div>
            <div className="h-48 bg-slate-700/50 rounded-2xl w-full"></div>
            <div className="flex gap-3">
              <div className="h-10 bg-slate-700/50 rounded-xl w-1/3"></div>
              <div className="h-10 bg-slate-700/50 rounded-xl w-1/3"></div>
            </div>
          </div>
        )}

        {/* Enhanced Result Card with View Mode */}
        {videoData && !loading && (
          <div className="transform transition-all duration-500 scale-100 opacity-100 animate-in slide-in-from-bottom-4">
            <ResultCard data={videoData} viewMode={viewMode} />
          </div>
        )}
        
        {/* Premium Developer Footer */}
        <footer className="pt-12 pb-6 border-t border-slate-800/50 mt-8">
          <div className="space-y-6">
            {/* Developer Info */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-light">
                <FaCode className="w-4 h-4 text-indigo-400" />
                <span>Developed with</span>
                <FaHeart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>by</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Shoyaib
              </h3>
              <p className="text-xs text-slate-50 font-light">
                Full Stack Developer & UI/UX Enthusiast
              </p>
            </div>

            {/* Social Links with Premium Design */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center gap-2 px-4 py-2.5 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300 ${social.color}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300"></div>
                  <social.icon className="w-4 h-4 relative z-10" />
                  <span className="text-xs font-medium text-slate-300 relative z-10 group-hover:text-white transition-colors duration-300">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="pt-4">
              <p className="text-xs text-slate-50 font-light">
                © {new Date().getFullYear()} Show Downloader. All rights reserved.
              </p>
              <p className="text-[10px] text-slate-50 font-light mt-1">
                Made with ❤️ from Bangladesh
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}