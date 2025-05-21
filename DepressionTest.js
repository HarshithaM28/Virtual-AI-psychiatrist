import React, { useState, useEffect } from 'react';

const DepressionTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added for error tracking

  // Gemini API configuration
  const API_KEY = 'AIzaSyAO2AQF1gFMyAiN-afUEzXLXjRNMeQmX-8'; // Replace with your actual key
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Add a random seed (timestamp) to encourage varied output
        const randomSeed = Date.now().toString() + Math.random().toString(36).substring(2);
        
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Generate 5 unique, random questions for a depression screening test that differ from previous outputs. 
                       Use this seed for randomness: ${randomSeed}. 
                       Each question should have 4 answer options (0-3 scale: 0=Not at all, 1=Sometimes, 2=Often, 3=Always).
                       Format as JSON array where each object has "question" and "options" properties.
                       Return only the JSON array, no additional text or markdown.`
              }]
            }]
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        console.log('Raw Generated Text:', generatedText);
  
        const jsonMatch = generatedText.match(/\[.*\]/s);
        if (!jsonMatch) {
          throw new Error('No valid JSON array found in response');
        }
  
        const cleanedText = jsonMatch[0].trim();
        const parsedQuestions = JSON.parse(cleanedText);
        console.log('Parsed Questions:', parsedQuestions);
  
        const validatedQuestions = parsedQuestions.map(q => ({
          question: q.question || 'Unnamed Question',
          options: Array.isArray(q.options) ? q.options : ["Not at all", "Sometimes", "Often", "Always"]
        }));
        setQuestions(validatedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError(error.message);
        const fallbackQuestions = [
          { question: `Do you feel down or hopeless? (Seed: ${Date.now()})`, options: ["Not at all", "Sometimes", "Often", "Always"] },
          { question: `Are you less interested in things you used to enjoy? (Seed: ${Date.now()})`, options: ["Not at all", "Sometimes", "Often", "Always"] },
          { question: `Do you feel exhausted most days? (Seed: ${Date.now()})`, options: ["Not at all", "Sometimes", "Often", "Always"] },
          { question: `Is it hard to fall asleep or stay asleep? (Seed: ${Date.now()})`, options: ["Not at all", "Sometimes", "Often", "Always"] },
          { question: `Do you feel like a failure? (Seed: ${Date.now()})`, options: ["Not at all", "Sometimes", "Often", "Always"] },
        ];
        setQuestions(fallbackQuestions);
      }
      setLoading(false);
    };
  
    const calculateScore = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Given these answers to depression screening questions on a 0-3 scale:
                      ${JSON.stringify(answers)}
                      Calculate a depression score on a scale of 1-10 based on the responses,
                      where higher scores indicate more severe depression symptoms.
                      Return only the numeric score.`
              }]
            }]
          }),
        });
  
        const data = await response.json();
        const scoreText = data.candidates[0].content.parts[0].text;
        setScore(parseInt(scoreText));
      } catch (error) {
        console.error('Error calculating score:', error);
        setError(error.message);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchQuestions(); // Fetch questions on initial load
    }, []);
  
    const handleAnswer = (questionIndex, value) => {
      setAnswers(prev => ({
        ...prev,
        [`Question ${questionIndex + 1}`]: value
      }));
    };
  
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundAttachment: 'fixed',
        padding: '120px 20px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div style={{
          maxWidth: '800px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <h1 style={{
            color: '#2d3748',
            fontSize: '42px',
            textAlign: 'center',
            marginBottom: '30px',
            fontWeight: '700',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(45deg, #2d3748, #4a5568)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Depression Screening Test
          </h1>
  
          {loading && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#4a5568',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
            }}>
              <div style={{
                width: '35px',
                height: '35px',
                border: '4px solid #e2e8f0',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}></div>
              Loading...
            </div>
          )}
  
          {error && (
            <div style={{
              textAlign: 'center',
              padding: '20px',
              color: '#e53e3e',
              backgroundColor: 'rgba(229, 62, 62, 0.1)',
              borderRadius: '15px',
              marginBottom: '20px',
              fontSize: '16px',
              border: '1px solid rgba(229, 62, 62, 0.2)',
            }}>
              Error: {error} (Using fallback questions)
            </div>
          )}
  
          {!loading && questions.length > 0 && score === null && (
            <div>
              {questions.map((q, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '30px',
                  borderRadius: '20px',
                  marginBottom: '25px',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                  }
                }}>
                  <h3 style={{
                    color: '#2d3748',
                    fontSize: '20px',
                    marginBottom: '25px',
                    fontWeight: '600',
                    lineHeight: '1.4',
                  }}>
                    {index + 1}. {q.question}
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}>
                    {Array.isArray(q.options) ? (
                      q.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          style={{
                            padding: '12px 25px',
                            backgroundColor: answers[`Question ${index + 1}`] === optIndex 
                              ? '#667eea' 
                              : 'rgba(102, 126, 234, 0.1)',
                            color: answers[`Question ${index + 1}`] === optIndex 
                              ? 'white' 
                              : '#4a5568',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                            ':hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                            }
                          }}
                          onClick={() => handleAnswer(index, optIndex)}
                          onMouseEnter={(e) => {
                            if (answers[`Question ${index + 1}`] !== optIndex) {
                              e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
                              e.target.style.transform = 'translateY(-2px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (answers[`Question ${index + 1}`] !== optIndex) {
                              e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                              e.target.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          {option}
                        </button>
                      ))
                    ) : (
                      <p style={{ color: '#e53e3e' }}>Error: Options not available for this question</p>
                    )}
                  </div>
                </div>
              ))}
              <button
                style={{
                  width: '100%',
                  padding: '16px 32px',
                  backgroundColor: Object.keys(answers).length === questions.length 
                    ? '#667eea' 
                    : '#cbd5e0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: Object.keys(answers).length === questions.length 
                    ? 'pointer' 
                    : 'not-allowed',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  marginTop: '30px',
                  letterSpacing: '0.5px',
                }}
                onClick={calculateScore}
                disabled={Object.keys(answers).length !== questions.length}
                onMouseEnter={(e) => {
                  if (Object.keys(answers).length === questions.length) {
                    e.target.style.backgroundColor = '#5a67d8';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.backgroundColor = Object.keys(answers).length === questions.length 
                    ? '#667eea' 
                    : '#cbd5e0';
                }}
              >
                Calculate Score
              </button>
            </div>
          )}
  
          {score !== null && !loading && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}>
              <h2 style={{
                color: '#2d3748',
                fontSize: '36px',
                marginBottom: '20px',
                fontWeight: '700',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Your Depression Score: {score}/10
              </h2>
              <p style={{ 
                color: '#4a5568',
                fontSize: '20px',
                lineHeight: '1.6',
                marginBottom: '30px',
                fontWeight: '500',
              }}>
                {score <= 3 && 'This suggests minimal depression symptoms.'}
                {score > 3 && score <= 6 && 'This suggests mild to moderate depression symptoms.'}
                {score > 6 && 'This suggests potentially severe depression symptoms. Please consult a professional.'}
              </p>
              <button
                style={{
                  padding: '16px 32px',
                  backgroundColor: '#48bb78',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  letterSpacing: '0.5px',
                }}
                onClick={() => {
                  setScore(null);
                  setAnswers({});
                  fetchQuestions();
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#38a169';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#48bb78';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Take Test Again
              </button>
            </div>
          )}
          
          <p style={{ 
            color: '#718096',
            fontSize: '14px',
            textAlign: 'center',
            marginTop: '30px',
            fontStyle: 'italic',
            lineHeight: '1.6',
          }}>
            Note: This is not a clinical diagnosis. For professional help, please consult a healthcare provider.
          </p>
        </div>
  
        {/* Add animation keyframes */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  };
  
  export default DepressionTest;