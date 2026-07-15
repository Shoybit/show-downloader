export interface VideoFormat {
  ext: string;
  quality: string;
  note?: string;
  url: string;
}

export interface VideoData {
  title: string;
  thumbnail: string;
  duration: string;
  formats: VideoFormat[];
}