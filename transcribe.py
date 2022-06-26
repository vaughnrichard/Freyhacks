import requests
import json

def main(url):
    endpoint = "https://api.assemblyai.com/v2/transcript"

    json = {
    "audio_url": url
    }

    headers = {
    "Authorization": "c2a41970d9d811ec9d640242ac12",
    "Content-Type": "application/json"
    }

    response = requests.post(endpoint, json=json, headers=headers)
    parse(response)