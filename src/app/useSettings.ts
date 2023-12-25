import { useState } from "react";

type AudioQualiyEnum = "128" | "192" | "320";
export default function useSettings() {
  const [audioQualiy, setAudioQualiy] = useState<AudioQualiyEnum>("128");
  return {
    setAudioQuality(quality: AudioQualiyEnum) {
      setAudioQualiy(quality);
    },
    getAudioQuality(): AudioQualiyEnum {
      return audioQualiy;
    },
  };
}
