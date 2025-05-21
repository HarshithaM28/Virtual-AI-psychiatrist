import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [text, setText] = useState('');
  const fullText = "Welcome to Neurolink";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mentalHealthTips, setMentalHealthTips] = useState([]);

  useEffect(() => {
    // Typing effect for welcome text
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  useEffect(() => {
    // Fetch mental health tips from Gemini API
    const fetchTips = async () => {
      const apiKey = 'AIzaSyAO2AQF1gFMyAiN-afUEzXLXjRNMeQmX-8'; // Replace with your actual Gemini API key
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const requestBody = {
        contents: [{
          parts: [{
            text: "Generate 5 random one-line mental health tips."
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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const tipsText = data.candidates[0].content.parts[0].text;
        const tipsArray = tipsText.split('\n').filter(tip => tip.trim() !== '').slice(0, 5);
        setMentalHealthTips(tipsArray);
      } catch (error) {
        console.error("Error fetching tips from Gemini API:", error);
        setMentalHealthTips([
          "Take a deep breath and relax.",
          "Spend time in nature today.",
          "Write down something positive.",
          "Limit your screen time tonight.",
          "Call a friend for a chat."
        ]);
      }
    };

    fetchTips();
  }, []);

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url("https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '40px',
    overflow: 'hidden',
    fontFamily: "'Poppins', sans-serif"
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))',
    zIndex: 1
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '1000px',
    color: '#fff',
    padding: '20px'
  };

  const titleStyle = {
    fontSize: '4.5rem',
    fontWeight: 700,
    marginBottom: '30px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    animation: 'blink 0.7s infinite',
    background: 'linear-gradient(45deg, #fff, #e0e0e0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '2px'
  };

  const subtitleStyle = {
    fontSize: '1.8rem',
    marginBottom: '40px',
    lineHeight: 1.6,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    color: '#f0f0f0',
    fontWeight: 300
  };

  const tipsContainerStyle = {
    marginBottom: '30px',
    background: 'rgba(255, 255, 255, 0.15)',
    padding: '25px',
    borderRadius: '20px',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    margin: '0 auto 30px',
    position: 'relative',
    overflow: 'hidden'
  };

  const tipsTitleStyle = {
    marginBottom: '20px',
    fontSize: '1.8rem',
    fontWeight: 600,
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    display: 'inline-block',
    padding: '0 15px',
    background: 'linear-gradient(45deg, #ffd700, #ffa500)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.5px'
  };

  const tipsTitleAfterStyle = {
    content: '""',
    position: 'absolute',
    bottom: '-5px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '50px',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
    borderRadius: '2px'
  };

  const tipsListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px'
  };

  const tipItemStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '12px 20px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    animation: 'slideIn 0.4s ease forwards',
    ':hover': {
      transform: 'translateX(5px)',
      background: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.3)'
    }
  };

  const tipTextStyle = {
    fontSize: '1rem',
    lineHeight: 1.5,
    color: '#fff',
    margin: 0,
    fontWeight: 400,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    paddingLeft: '25px'
  };

  const tipTextBeforeStyle = {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '6px',
    height: '6px',
    background: '#ffd700',
    borderRadius: '50%',
    boxShadow: '0 0 8px rgba(255, 215, 0, 0.5)',
    animation: 'pulse 2s infinite'
  };

  const buttonContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const getButtonStyle = (gradient) => ({
    position: 'relative',
    padding: '20px 40px',
    fontSize: '1.2rem',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    textDecoration: 'none',
    fontWeight: 600,
    letterSpacing: '0.5px',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
    }
  });

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1 style={titleStyle}>
          {text}
          <span style={{ animation: 'blink 0.7s infinite' }}>|</span>
        </h1>
        <p style={subtitleStyle}>
          We're here to support your mental well-being. Choose an option below to
          get started on your journey to peace and clarity.
        </p>
        
        <div style={tipsContainerStyle}>
          <h3 style={tipsTitleStyle}>
            Daily Mental Health Tips
            <span style={tipsTitleAfterStyle}></span>
          </h3>
          <div style={tipsListStyle}>
            {mentalHealthTips.map((tip, index) => (
              <div 
                key={index} 
                style={{
                  ...tipItemStyle,
                  animationDelay: `${index * 0.08}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <p style={tipTextStyle}>
                  <span style={tipTextBeforeStyle}></span>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <Link to="/relax-your-mind" style={getButtonStyle('linear-gradient(45deg, #2ecc71, #27ae60)')}>
            <i className="fas fa-spa"></i>
            Relax Your Mind
          </Link>
          <Link to="/talk-to-us" style={getButtonStyle('linear-gradient(45deg, #3498db, #2980b9)')}>
            <i className="fas fa-comments"></i>
            Talk to Us
          </Link>
          <Link to="/meet-us" style={getButtonStyle('linear-gradient(45deg, #e74c3c, #c0392b)')}>
            <i className="fas fa-users"></i>
            Meet Us
          </Link>
          <Link to="/depression-test" style={getButtonStyle('linear-gradient(45deg, #8e44ad, #9b59b6)')}>
            <i className="fas fa-brain"></i>
            Depression Test
          </Link>
          <Link to="/anxiety-test" style={getButtonStyle('linear-gradient(45deg, #00b4db, #0083b0)')}>
            <i className="fas fa-heartbeat"></i>
            Anxiety Test
          </Link>
        </div>
      </div>

      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0; 
              transform: translateX(-15px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }

          @keyframes pulse {
            0% { 
              transform: translateY(-50%) scale(1);
              box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
            }
            50% { 
              transform: translateY(-50%) scale(1.1);
              box-shadow: 0 0 12px rgba(255, 215, 0, 0.8);
            }
            100% { 
              transform: translateY(-50%) scale(1);
              box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;