import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import VideoShowcase from '@/components/VideoShowcase';

export default function VideosPage() {
  return (
    <SiteLayout>
      <main data-testid="videos-page">
        <VideoShowcase page />
      </main>
    </SiteLayout>
  );
}
