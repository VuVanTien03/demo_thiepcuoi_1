import React, { useState } from 'react';
import { weddingData } from './data/weddingData';
import IntroEnvelope from './components/IntroEnvelope';
import FloatingPetals from './components/FloatingPetals';
import AudioPlayer from './components/AudioPlayer';
import HeroSection from './components/HeroSection';
import CalendarSection from './components/CalendarSection';
import CoupleSection from './components/CoupleSection';
import LoveStory from './components/LoveStory';
import InvitationSection from './components/InvitationSection';
import MiddleBanner from './components/MiddleBanner';
import TimelineSection from './components/TimelineSection';
import RSVPInlineCard from './components/RSVPInlineCard';
import GiftSection from './components/GiftSection';
import CountdownSection from './components/CountdownSection';
import GuestbookDanmaku from './components/GuestbookDanmaku';
import FloatingToolbar from './components/FloatingToolbar';
import RSVPModal from './components/RSVPModal';
import GiftBoxModal from './components/GiftBoxModal';
import WishModal from './components/WishModal';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [wishes, setWishes] = useState(weddingData.initialWishes);
  const [likeCount, setLikeCount] = useState(520);

  // Modals state
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);

  const handleAddWish = (newWish) => {
    setWishes((prev) => [...prev, newWish]);
  };

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
  };

  return (
    <div className="wedding-viewport-container">
      {/* Ambient Desktop Backdrop */}
      <div className="wedding-desktop-backdrop" />

      {/* 3D Wax Seal Envelope Intro Screen */}
      {!isEnvelopeOpened && (
        <IntroEnvelope
          couple={weddingData.couple}
          hero={weddingData.hero}
          onOpen={() => setIsEnvelopeOpened(true)}
        />
      )}

      {/* Main Wedding App Shell (500px on desktop, 100% on mobile) */}
      <main className="wedding-app-shell">
        {/* Falling Rose Petals Canvas Effect */}
        <FloatingPetals />

        {/* Floating Audio Player (Until You) */}
        <AudioPlayer
          audioData={weddingData.audio}
          isEnvelopeOpened={isEnvelopeOpened}
        />

        {/* 1. Template 39: Hero Section */}
        <HeroSection
          hero={weddingData.hero}
          couple={weddingData.couple}
        />

        {/* 2. Template 39: Month Calendar ("Our wedding day - Tháng 12") */}
        <CalendarSection calendar={weddingData.calendar} />

        {/* 3. Template 39: Bride & Groom Profile Cards */}
        <CoupleSection couple={weddingData.couple} />

        {/* 4. Template 39: Notebook Paper "Our Love Story" */}
        <LoveStory storyData={weddingData.loveStoryText} />

        {/* 5. Template 39: Family Announcement & Venue with Map */}
        <InvitationSection
          couple={weddingData.couple}
          invitation={weddingData.invitation}
        />

        {/* 6. Template 39: Interlude Middle Banner */}
        <MiddleBanner imageUrl={weddingData.middleBanner} />

        {/* 7. Template 39: Timeline Section */}
        <TimelineSection
          timeline={weddingData.timeline}
          note={weddingData.timelineNote}
        />

        {/* 8. Template 39: Inline RSVP Card */}
        <RSVPInlineCard />

        {/* 9. Template 39: Hộp Yêu Thương Gift Trigger */}
        <GiftSection onOpenGiftModal={() => setIsGiftModalOpen(true)} />

        {/* 10. Template 39: Countdown & Thank You Closing */}
        <CountdownSection countdownData={weddingData.countdown} />

        {/* 11. Auto-scrolling Semi-Transparent Blessings (Danmaku) */}
        <GuestbookDanmaku
          wishes={wishes}
          onOpenWishModal={() => setIsWishModalOpen(true)}
        />

        {/* 12. Bottom Floating Dock */}
        <FloatingToolbar
          onOpenWishModal={() => setIsWishModalOpen(true)}
          onOpenGiftModal={() => setIsGiftModalOpen(true)}
          onOpenRsvpModal={() => setIsRsvpModalOpen(true)}
          likeCount={likeCount}
          onLike={handleLike}
        />
      </main>

      {/* Interactive Modals */}
      <RSVPModal
        isOpen={isRsvpModalOpen}
        onClose={() => setIsRsvpModalOpen(false)}
      />

      <GiftBoxModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        couple={weddingData.couple}
      />

      <WishModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        onAddWish={handleAddWish}
      />
    </div>
  );
}
