import requests
import json
import sys

endpoint = "https://api.assemblyai.com/v2/transcript"

json = {
"audio_url": sys.argv[1]
}

headers = {
"Authorization": "c2a41970d9d811ec9d640242ac12",
"Content-Type": "application/json"
}

response = requests.post(endpoint, json=json, headers=headers)
ans = response.json()
result = ""
for x in ans["words"]:
    result += ans["words"]["text"]
    result += " "

print(result)