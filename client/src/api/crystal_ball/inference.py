import pickle
import numpy as np
import joblib
import locale
import json
import sys
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
print(BASE_DIR)
sys.path.append(BASE_DIR)

def load_json(json_path):
    with open(json_path, 'r') as f:
        data = json.load(f)
    return data

def save_json(data, json_path):
    with open(json_path, 'w') as f:
        json.dump(data, f, indent=4)

def load_pickle(model_path):
    with open(model_path, 'rb') as model_file:
        model = joblib.load(model_file)
    return model   

def main(model, data):
    budget = data['budget']
    popularity = data['popularity']
    runtime = data['runtime']
    language = data['language']
    has_homepage = data['homepage']
    genres = data['genre']
    
    if budget < 50000:
        print("Budget must be 50,000 or higher. Please try again.")
        raise ValueError("Budget must be 50,000 or higher. Please try again.")
        
    log_budget = np.log(budget)
    log_popularity = np.log(popularity)
    homepage = int(has_homepage)

    language_ids = {'en': 0, 'fr': 1, 'hi': 2, 'uk': 3, 'zh': 4, 'ko': 5, 'fi': 6, 'ja': 7,
                    'it': 8, 'ru': 9, 'cn': 10, 'es': 11, 'de': 12, 'te': 13, 'pt': 14, 'th': 15, 'no': 16,
                    'id': 17, 'da': 18, 'el': 19, 'sv': 20, 'gl': 21, 'ar': 22, 'nl': 23, 'kn': 24,
                    'fa': 25, 'nb': 26, 'xx': 27, 'af': 28, 'pl': 29, 'he': 30, 'vi': 31, 'ro': 32
                    }            
    # Convert language to ID
    language_id = language_ids.get(language)

    Drama = Comedy = Action = Thriller = Adventure = Romance = Crime = Science_Fiction = Horror = Fantasy = 0

    if "Drama" in genres:
        Drama = 1
    if "Comedy" in genres:
        Comedy = 1
    if "Action" in genres:
        Action = 1
    if "Thriller" in genres:
        Thriller = 1
    if "Adventure" in genres:
        Adventure = 1
    if "Romance" in genres:
        Romance = 1
    if "Crime" in genres:
        Crime = 1
    if "Science Fiction" in genres:
        Science_Fiction = 1
    if "Horror" in genres:
        Horror = 1
    if "Fantasy" in genres:
        Fantasy = 1

    locale.setlocale(locale.LC_ALL, '') 

    # Step 2: Prepare input data
    new_data = np.array([[log_budget, log_popularity, runtime, homepage, language_id, Drama, Comedy, Action, Thriller,
                        Adventure, Romance, Crime, Science_Fiction, Horror, Fantasy]])

    # Step 3: Make predictions
    predicted_log_revenue = model.predict(new_data)
    predicted_revenue = np.exp(predicted_log_revenue)  # Convert from log form to original form

    # Show the output as $ and with commas without decimals
    formatted_predicted_revenue = locale.currency(predicted_revenue[0], grouping=True)
    print("Predicted Revenue:", formatted_predicted_revenue)

    return {"predicted_revenue": int(predicted_revenue[0])}


if __name__ == '__main__':
    model_path = os.path.join(BASE_DIR, 'data', 'model.pkl')
    model = load_pickle(model_path)

    json_path = os.path.join(BASE_DIR, 'data', 'crystall_ball_input_data.json')
    data = load_json(json_path)

    output = main(model, data)

    output_path = os.path.join(BASE_DIR, 'data', 'crystall_ball_output_data.json')
    save_json(output, output_path)
