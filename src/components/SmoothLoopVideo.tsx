import { useEffect, useRef } from 'react';

export default function SmoothLoopVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cross-fade opacity near the seam to ensure completely seamless loop
    const handleTimeUpdate = () => {
      const duration = video.duration;
      const current = video.currentTime;
      if (!duration) return;

      const FADE_WINDOW = 0.6; // 600ms boundary smoothing

      if (current < FADE_WINDOW) {
        // Fade in at the start
        const progress = current / FADE_WINDOW;
        video.style.opacity = (0.05 + progress * 0.35).toFixed(2);
      } else if (current > duration - FADE_WINDOW) {
        // Fade out right before the end
        const progress = (duration - current) / FADE_WINDOW;
        video.style.opacity = (0.05 + progress * 0.35).toFixed(2);
      } else {
        video.style.opacity = '0.40';
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover scale-105 transition-opacity duration-150 ease-out"
        style={{ opacity: 0.4 }}
      >
        <source src="/assets/herosection.mp4" type="video/mp4" />
      </video>
      {/* Natural vignette & contrast fader into #000000 background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/65 to-[#000000]/45"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000]"></div>
    </div>
  );
}
