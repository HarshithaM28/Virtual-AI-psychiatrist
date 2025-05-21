// RelaxYourMind.js
import React, { useState } from 'react';

function RelaxYourMind() {
  const [activeSound, setActiveSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const sounds = {
    morning: {
      birds: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=birds-chirping-6226.mp3",
      cuckoo: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=cuckoo-bird-6226.mp3",
      forest: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=forest-birds-6226.mp3"
    },
    night: {
      nightingale: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=nightingale-6226.mp3",
      rain: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=rain-6226.mp3",
      crickets: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=crickets-6226.mp3"
    },
    meditation: {
      bells: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=bells-6226.mp3",
      ocean: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=ocean-waves-6226.mp3",
      wind: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=wind-6226.mp3"
    }
  };

  const handleSoundClick = (category, sound) => {
    setActiveSound(sounds[category][sound]);
    setIsPlaying(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 20px',
      }}
    >
      {/* Animated Particles */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          pointerEvents: 'none',
        }}
      />

      <h1
        style={{
          fontSize: '48px',
          color: '#fff',
          textShadow: '2px 2px 15px rgba(0, 0, 0, 0.3)',
          marginBottom: '20px',
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: '2px',
          textAlign: 'center',
          animation: 'glow 2s ease-in-out infinite alternate',
        }}
      >
        ✨ Relax Your Mind ✨
      </h1>
      <p
        style={{
          fontSize: '22px',
          color: '#fff',
          textShadow: '1px 1px 8px rgba(0, 0, 0, 0.3)',
          marginBottom: '40px',
          maxWidth: '700px',
          textAlign: 'center',
          fontFamily: "'Roboto', sans-serif",
          lineHeight: '1.6',
          letterSpacing: '0.5px',
        }}
      >
        Choose your preferred soundscape for relaxation and meditation
      </p>

      {/* Sound Categories */}
      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1200px',
        marginBottom: '30px',
        padding: '20px',
      }}>
        {Object.entries(sounds).map(([category, soundList]) => (
          <div
            key={category}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              padding: '25px',
              borderRadius: '20px',
              minWidth: '320px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            }}
          >
            <h2
              style={{
                color: '#fff',
                fontSize: '28px',
                marginBottom: '20px',
                textTransform: 'capitalize',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
                paddingBottom: '10px',
              }}
            >
              <i className={`fas ${
                category === 'morning' ? 'fa-sun' :
                category === 'night' ? 'fa-moon' :
                'fa-om'
              }`} style={{ marginRight: '10px' }}></i>
              {category}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.keys(soundList).map((sound) => (
                <button
                  key={sound}
                  onClick={() => handleSoundClick(category, sound)}
                  style={{
                    padding: '15px 25px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '18px',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <i className={`fas ${
                    sound === 'birds' ? 'fa-dove' :
                    sound === 'rain' ? 'fa-cloud-rain' :
                    sound === 'ocean' ? 'fa-water' :
                    sound === 'wind' ? 'fa-wind' :
                    sound === 'bells' ? 'fa-bell' :
                    'fa-music'
                  }`}></i>
                  {sound}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Audio Player */}
      {activeSound && (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            padding: '25px',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '600px',
            marginTop: '30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'fadeIn 0.5s ease',
          }}
        >
          <audio
            controls
            src={activeSound}
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '10px',
              outline: 'none',
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes glow {
            from {
              text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073;
            }
            to {
              text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6;
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default RelaxYourMind;