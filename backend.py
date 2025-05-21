from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import os
import google.generativeai as genai
from dataset import search_dataset  # Separate dataset logic

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Initialize emotion model
emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    framework="pt"
)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_gemini_response(emotion, user_input, conversation_history):
    if not os.getenv("GEMINI_API_KEY"):
        raise ValueError("Gemini API key not set. Please set the GEMINI_API_KEY environment variable.")
    
    model = genai.GenerativeModel('gemini-2.0-flash')  # Your specified model
    conversation_context = "\n".join(conversation_history[-5:])  # Last 5 messages
    
    # Refined prompt for concise, human-like responses
    prompt = (
        f"Conversation:\n{conversation_context}\n\n"
        f"User's latest message: '{user_input}'\n"
        f"Detected emotion: '{emotion}'\n\n"
        f"As a virtual psychiatrist, respond in a concise, empathetic, and natural way, like a friend or counselor would. "
        f"Keep it conversational, adapt the length to the input (short for simple inputs, slightly longer for complex ones), "
        f"and avoid overly formal or lengthy explanations. Focus on support and understanding."
    )
    
    response = model.generate_content(prompt)
    return response.text.strip()  # Remove excess whitespace

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message')
    conversation_history = data.get('history', [])  # Expect history from frontend

    if not user_input:
        return jsonify({'error': 'No message provided'}), 400

    # Detect emotion
    results = emotion_classifier(user_input)[0]
    emotion = results['label'].lower()
    score = results['score']

    # Search dataset for similar input
    dataset_reply = search_dataset(user_input)
    if dataset_reply:
        # Use dataset reply directly, keeping it human-like
        bot_response = dataset_reply
    else:
        # Generate a concise, human-like response from Gemini
        bot_response = generate_gemini_response(emotion, user_input, conversation_history)

    # Update conversation history
    conversation_history.append(f"User ({emotion}): {user_input}")
    conversation_history.append(f"Bot: {bot_response}")

    return jsonify({
        'emotion': emotion,
        'confidence': score,
        'response': bot_response,
        'history': conversation_history
    })

if __name__ == '__main__':
    app.run(debug=False, port=5001)