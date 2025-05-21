import requests
from difflib import SequenceMatcher

rows_url = "https://datasets-server.huggingface.co/rows?dataset=ebowwa%2Fhuman-biases-psychiatrist-io&config=default&split=train&offset=0&length=100"
dataset_rows = requests.get(rows_url).json().get("rows", [])
SIMILARITY_THRESHOLD = 0.8

def search_dataset(user_input):
    for entry in dataset_rows:
        text = entry['row'].get('text', '')
        if text:
            similarity = SequenceMatcher(None, user_input.lower(), text.lower()).ratio()
            if similarity >= SIMILARITY_THRESHOLD:
                return entry['row'].get('response', '')
    return None