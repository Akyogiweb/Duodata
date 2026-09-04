import React, { useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';

const VideoPlayerModal = ({ video, onClose }) => {
  useEffect(() => {
    if (!video) return undefined;
    const handleKey = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [video, onClose]);

  if (!video) return null;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1&start=${video.start}`;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 md:p-8" role="dialog" aria-modal="true" aria-labelledby="video-modal-title" data-testid="video-player-modal">
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close video player" data-testid="video-modal-backdrop" />
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#07080c]">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 md:px-5">
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7FD1E8]">{video.category}</p>
            <h2 id="video-modal-title" className="truncate text-sm font-semibold text-white md:text-base" data-testid="video-modal-title">{video.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:border-[#7FD1E8] hover:text-[#7FD1E8]" aria-label="Close video player" data-testid="video-modal-close-button">
            <X size={18} />
          </button>
        </div>
        <div className="aspect-video bg-black">
          <iframe className="h-full w-full" src={embedUrl} title={`Playing: ${video.title}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen data-testid="video-player-iframe" />
        </div>
        <a href={video.watchUrl} target="_blank" rel="noreferrer" className="flex items-center justify-end gap-2 px-5 py-3 text-xs text-white/55 transition-colors duration-200 hover:text-white" data-testid="video-youtube-link">
          Open on YouTube <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
};

export default VideoPlayerModal;