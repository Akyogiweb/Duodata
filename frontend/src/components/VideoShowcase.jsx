import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { videos } from '@/data/videos';
import VideoPlayerModal from '@/components/VideoPlayerModal';

const VideoShowcase = ({ page = false }) => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(null);
  const paused = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || playing) return undefined;
    const timer = window.setInterval(() => {
      if (!paused.current) setActive((current) => (current + 1) % videos.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reduced, playing]);

  const pause = () => { paused.current = true; };
  const resume = () => { paused.current = false; };

  return (
    <section id="videos" className={`border-y border-white/10 bg-[#050505] text-white ${page ? 'pt-36 pb-24 md:pt-44 md:pb-28' : 'py-24 md:py-28'}`} data-testid="video-showcase-section">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <header className="mx-auto mb-12 grid max-w-[1200px] gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300" data-testid="video-showcase-eyebrow">Duo in motion / 07 films</p>
            <h1 className={`hero-headline mt-4 leading-none text-white ${page ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-4xl sm:text-5xl'}`} data-testid="video-showcase-title">
              Watch governed meaning become working data.
            </h1>
          </div>
          {!page && (
            <Link to="/videos" className="inline-flex items-center gap-2 border-b border-cyan-400 pb-1 text-sm font-semibold text-white transition-colors duration-200 hover:text-cyan-300" data-testid="video-showcase-view-all-link">
              View all videos <ArrowRight size={15} />
            </Link>
          )}
        </header>

        <div
          className="mx-auto flex h-[620px] max-w-[1400px] flex-col gap-1 md:h-[400px] md:flex-row"
          role="region"
          aria-roledescription="carousel"
          aria-label="Duo Data video showcase"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && resume()}
          data-testid="video-showcase-rail"
        >
          {videos.map((video, index) => {
            const isActive = active === index;
            return (
              <motion.button
                layout
                key={video.id}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setPlaying(video)}
                animate={{ flexGrow: isActive ? 8 : 1 }}
                transition={{ duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative min-h-0 min-w-0 overflow-hidden border text-left focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${isActive ? 'border-cyan-500/70' : 'border-white/10 bg-[#0B0B0B]'}`}
                aria-label={`Play ${video.title}`}
                aria-current={isActive ? 'true' : undefined}
                data-testid={`video-card-${index + 1}`}
              >
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div key="active" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35 }}>
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="h-full w-full bg-black object-contain"
                        loading={index < 2 ? 'eager' : 'lazy'}
                        onError={(event) => { event.currentTarget.src = video.thumbnailFallback; }}
                        data-testid={`video-thumbnail-${index + 1}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/5" />
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                        <div className="mb-4 grid h-11 w-11 place-items-center border border-white bg-white text-black transition-[background-color,color,transform] duration-300 group-hover:scale-105 group-hover:bg-cyan-300" data-testid={`video-play-icon-${index + 1}`}><Play size={17} fill="currentColor" /></div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300">0{index + 1} / {video.category}</p>
                        <h2 className="mt-2 max-w-xl text-xl font-bold leading-tight text-white md:text-2xl" data-testid={`video-title-${index + 1}`}>{video.title}</h2>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="inactive" className="absolute inset-0 flex items-center justify-between p-3 md:flex-col md:py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <span className="font-mono text-[9px] text-white/35">0{index + 1}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 md:[writing-mode:vertical-rl] md:rotate-180">{video.category}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <div className="mx-auto mt-5 flex max-w-[1400px] items-center gap-2" aria-hidden="true">
          {videos.map((video, index) => <span key={video.id} className={`h-px flex-1 transition-colors duration-300 ${active === index ? 'bg-cyan-400' : 'bg-white/15'}`} />)}
        </div>
      </div>
      <VideoPlayerModal video={playing} onClose={() => setPlaying(null)} />
    </section>
  );
};

export default VideoShowcase;