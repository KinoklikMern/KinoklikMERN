from flask import Flask, request, jsonify
from flask_cors import CORS
from inference import main, load_pickle, load_json
import os

app = Flask(__name__)
CORS(app)

# BASE_DIR calculation simplified
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
print("BASE_DIR ", BASE_DIR)
MODEL_PATH = os.path.join(BASE_DIR, 'data', 'model.pkl')
print(MODEL_PATH)
JSON_PATH = os.path.join(BASE_DIR, 'data', 'crystall_ball_input_data.json')

# Load the model once when the server starts
model = load_pickle(MODEL_PATH)

@app.route('/predict', methods=['POST'])  # Use POST instead of GET for sending data
def predict():
    try:
        # Get input data from the request
        data = request.get_json()  # Use request data instead of loading from file

        # Call the main function from your inference script
        output = main(model, data)
        print("output ", output)

        # Respond with the prediction
        return jsonify(output)
    except Exception as e:
        print("Error during prediction:", e)  # Log the error for debugging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)  # Enable debug for development
