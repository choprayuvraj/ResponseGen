# importing the required modules
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
import markdown
from dotenv import load_dotenv

load_dotenv()

# configuring genai
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048
}
model = genai.GenerativeModel("gemini-1.5-flash", generation_config=generation_config)
chat = model.start_chat(history=[])

app = Flask(__name__)

# setting endpoints
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api", methods=["POST", "GET"])
def qa():
    if request.method == "POST":
        try:
            data = request.json
            if not data or 'prompt' not in data:
                return jsonify({"error": "No prompt provided"}), 400

            prompt = data['prompt']
            print(f"Received prompt: {prompt}")  # Log the received prompt

            response = chat.send_message(prompt)
            print(f"Response from model: {response}")  # Log the response from the model
            generated_text = response.candidates[0].content.parts[0].text
            html_text = markdown.markdown(generated_text)
            return jsonify(html_text)
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)