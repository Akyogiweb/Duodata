import React from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import VideoShowcase from '@/components/VideoShowcase';

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-[#050505]" data-testid="videos-page">
      <Nav />
      <main>
        <VideoShowcase page />
      </main>
      <Footer />
    </div>
  );
}