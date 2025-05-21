// IntroSlides.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThoughts = async () => {
      const apiKey = 'AIzaSyAO2AQF1gFMyAiN-afUEzXLXjRNMeQmX-8';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const requestBody = {
        contents: [{
          parts: [{
            text: "Generate 5 motivational thoughts with their authors. Format each as 'Thought: [quote] - Author: [name]'"
          }]
        }]
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) throw new Error('Failed to fetch thoughts');
        const data = await response.json();
        const thoughtsText = data.candidates[0].content.parts[0].text;
        const thoughtsArray = thoughtsText.split('\n')
          .filter(line => line.trim())
          .map(line => {
            const [thought, author] = line.split(' - ');
            return {
              thought: thought.replace('Thought:', '').trim(),
              author: author.replace('Author:', '').trim()
            };
          });
        setThoughts(thoughtsArray);
      } catch (error) {
        console.error("Error fetching thoughts:", error);
        setThoughts([
          { thought: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
          { thought: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
          { thought: "Everything you can imagine is real.", author: "Pablo Picasso" },
          { thought: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
          { thought: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
        ]);
      }
      setLoading(false);
    };

    fetchThoughts();
  }, []);

  const handleNext = () => {
    if (currentSlide < 4) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate('/home');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Playfair Display', serif"
  };

  const slideContainerStyle = {
    width: '100%',
    maxWidth: '900px',
    height: '400px',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '40px'
  };

  const slideStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    opacity: 0,
    transform: 'translateX(100%)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: "'Playfair Display', serif"
  };

  const activeSlideStyle = {
    ...slideStyle,
    opacity: 1,
    transform: 'translateX(0)'
  };

  const thoughtStyle = {
    fontSize: '3rem',
    color: '#fff',
    marginBottom: '30px',
    lineHeight: 1.4,
    fontWeight: 500,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    padding: '20px',
    textAlign: 'center',
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic'
  };

  const quoteMarkStyle = {
    position: 'absolute',
    fontSize: '5rem',
    color: 'rgba(255, 255, 255, 0.1)',
    top: '-20px',
    left: '-20px',
    fontFamily: "'Playfair Display', serif"
  };

  const authorStyle = {
    fontSize: '1.8rem',
    color: '#ffd700',
    fontStyle: 'italic',
    marginTop: '20px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 400
  };

  const nextButtonStyle = {
    padding: '15px 40px',
    fontSize: '1.2rem',
    color: '#fff',
    background: 'linear-gradient(45deg, #ffd700, #ffa500)',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    marginTop: '40px',
    fontWeight: 600,
    letterSpacing: '1px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    fontFamily: "'Playfair Display', serif",
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
    }
  };

  const progressStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px'
  };

  const dotStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const activeDotStyle = {
    ...dotStyle,
    background: '#ffd700',
    transform: 'scale(1.2)',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(255, 255, 255, 0.1)',
          borderTop: '4px solid #ffd700',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={slideContainerStyle}>
        {thoughts.map((thought, index) => (
          <div
            key={index}
            style={index === currentSlide ? activeSlideStyle : slideStyle}
          >
            <span style={quoteMarkStyle}>"</span>
            <p style={thoughtStyle}>
              {thought.thought}
            </p>
            <p style={authorStyle}>
              - {thought.author}
            </p>
          </div>
        ))}
      </div>

      <button
        style={nextButtonStyle}
        onClick={handleNext}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        }}
      >
        {currentSlide < 4 ? 'Next' : 'Get Started'}
      </button>

      <div style={progressStyle}>
        {[0, 1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            style={currentSlide === dot ? activeDotStyle : dotStyle}
            onClick={() => setCurrentSlide(dot)}
          />
        ))}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default IntroSlides;