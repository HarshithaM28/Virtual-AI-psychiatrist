import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Home from './Home';
import RelaxYourMind from './RelaxYourMind';
import MeetUs from './MeetUs';
import Assistant from './Assistant';
import DepressionTest from './DepressionTest';
import AnxietyTest from './AnxietyTest';
import IntroSlides from './IntroSlides';
import './App.css';

// Separate Navbar component
const Navbar = () => {
  const location = useLocation();
  
  // Hide navbar on intro page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px'
      }}>
        <i className="fas fa-brain" style={{ 
          color: '#3498db', 
          fontSize: '24px',
          filter: 'drop-shadow(0 0 5px rgba(52, 152, 219, 0.5))'
        }}></i>
        <span style={{ 
          color: '#fff', 
          fontSize: '24px', 
          fontWeight: '600',
          letterSpacing: '1px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          Neurolink
        </span>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '30px',
        alignItems: 'center'
      }}>
        {[
          { to: '/home', text: 'Home' },
          { to: '/relax-your-mind', text: 'Relax Your Mind' },
          { to: '/meet-us', text: 'Meet Us' },
          { to: '/talk-to-us', text: 'Talk to Us' },
          { to: '/depression-test', text: 'Depression Test' },
          { to: '/anxiety-test', text: 'Anxiety Test' },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
              e.target.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.3)';
            }}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}>
        <Navbar />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<IntroSlides />} />
          <Route path="/home" element={<Home />} />
          <Route path="/relax-your-mind" element={<RelaxYourMind />} />
          <Route path="/meet-us" element={<MeetUs />} />
          <Route path="/talk-to-us" element={<Assistant />} />
          <Route path="/depression-test" element={<DepressionTest />} />
          <Route path="/anxiety-test" element={<AnxietyTest />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;