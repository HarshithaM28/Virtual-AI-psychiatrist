import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, Line } from '@react-three/drei';
import * as THREE from 'three';
import './Assistant.css';

function StarsBackground() {
  const pointsRef = useRef();
  const [positions, setPositions] = useState(null);

  // Generate star positions
  useEffect(() => {
    const count = 3000; // More stars for a dense sky
    const positionsArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute stars on a large sphere to create a skybox-like effect
      const radius = 50; // Large radius to surround the scene
      const theta = Math.random() * Math.PI * 2; // Random angle in XY plane
      const phi = Math.acos(2 * Math.random() - 1); // Random angle for Z

      positionsArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
      positionsArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      positionsArray[i * 3 + 2] = radius * Math.cos(phi); // z
    }
    setPositions(positionsArray);
  }, []);

  // Animate stars to create a drifting effect
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002; // Slow rotation for a drifting effect
      pointsRef.current.rotation.z += 0.0001;
    }
  });

  if (!positions) return null;

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.5} // Larger size for visibility
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </Points>
  );
}

function Sphere({ isListening, isSpeaking }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();
  const [intensity, setIntensity] = useState(0);
  const [scale, setScale] = useState(1);
  const [waveformScale, setWaveformScale] = useState(1);

  useEffect(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 4);
    const pointsPositions = geometry.attributes.position.array;
    pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3));

    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const linesPositions = edgesGeometry.attributes.position.array;
    linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      const time = state.clock.getElapsedTime();
      const pulse = isSpeaking ? Math.sin(time * 5) * 0.5 + 0.5 : isListening ? Math.sin(time * 3) * 0.5 + 0.5 : 0.2;
      const scalePulse = isSpeaking ? Math.sin(time * 4) * 0.1 + 1 : isListening ? Math.sin(time * 2) * 0.1 + 1 : 1;

      if (isSpeaking) {
        setWaveformScale(1 + Math.sin(time * 8) * 0.2);
      } else {
        setWaveformScale(1);
      }

      setIntensity(pulse);
      setScale(scalePulse);
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} scale={[scale, scale, scale]}>
        <pointsMaterial
          color={isListening ? "#ff4d4d" : isSpeaking ? "#00b4d8" : "#00b4d8"}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </Points>
      <lineSegments ref={linesRef} scale={[scale, scale, scale]}>
        <lineBasicMaterial
          color={isListening ? "#ff4d4d" : isSpeaking ? "#00b4d8" : "#00b4d8"}
          linewidth={1}
          transparent
          opacity={0.5}
        />
      </lineSegments>
      {isSpeaking && (
        <group>
          <mesh scale={[waveformScale, waveformScale, waveformScale]}>
            <ringGeometry args={[1.3, 1.5, 32]} />
            <meshBasicMaterial color="#00b4d8" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
          <mesh scale={[waveformScale * 1.2, waveformScale * 1.2, waveformScale * 1.2]}>
            <ringGeometry args={[1.5, 1.7, 32]} />
            <meshBasicMaterial color="#00b4d8" transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
      <pointLight
        color={isListening ? "#ff4d4d" : isSpeaking ? "#00b4d8" : "#00b4d8"}
        intensity={intensity}
        distance={10}
      />
    </group>
  );
}

function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

  // Welcome note only on initial mount
  useEffect(() => {
    const welcomeMessage = "Welcome to Neurolink";
    speakMessage(welcomeMessage);
    setMessages([{ text: welcomeMessage, isUser: false }]);
  }, []); // Empty dependency array ensures it runs only once

  // Speech recognition setup
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition not supported. Please use Chrome or Safari.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setInput('');
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setError(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      if (isListening && navigator.onLine) {
        recognition.start();
      } else {
        setIsListening(false);
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const speakMessage = (text) => {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;

    const voices = synth.getVoices();
    const britishVoice = voices.find((v) => v.lang === 'en-GB') || voices[0];
    utterance.voice = britishVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  const handleSend = async (transcribedText) => {
    if (!transcribedText || !transcribedText.trim()) return;

    setMessages((prev) => [...prev, { text: transcribedText, isUser: true }]);
    setIsLoading(true);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5001/chat', {
        message: transcribedText,
        history: messages.map((msg) => (msg.isUser ? `User: ${msg.text}` : `Assistant: ${msg.text}`)),
      });
      const botResponse = response.data.response;
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
      speakMessage(botResponse);
    } catch (error) {
      const errorMessage = 'Unable to connect to core systems.';
      setMessages((prev) => [...prev, { text: errorMessage, isUser: false }]);
      speakMessage(errorMessage);
    }
    setIsLoading(false);
  };

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not available');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (input.trim()) {
        handleSend(input);
      }
    } else if (navigator.onLine) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        setError('Failed to start speech recognition: ' + error.message);
      }
    } else {
      setError('Cannot start: No internet connection');
    }
  };

  return (
    <div className="app-container">
      <div className="scene-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <StarsBackground />
          <Sphere isListening={isListening} isSpeaking={isSpeaking} />
        </Canvas>
      </div>

      <div className="status-text">
        {error || (isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ask me anything')}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type here ..."
          onKeyPress={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              handleSend(input);
            }
          }}
        />
        <button onClick={handleMicClick}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
          </svg>
        </button>
      </div>

      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default Assistant;