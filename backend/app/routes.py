# [Routes - App]
# Authors: Nate Mount (ngm5540)
import re

from profanity_check import predict as predict_profanity
from flask import request, jsonify

from app import app
from app.models.brokers import RatHook

DISABLE_SAVING = False

def validate(rat):
    # make sure the hair is valid
    fc = rat.get('fur_color')
    if not fc or re.fullmatch('(B|W|r){2}', fc) == None:
        print(f'rejected {rat}: invalid fur color')
        return False

    # make sure name is alphabetic characters
    name = rat.get('name')
    if not name or re.fullmatch('([a-z]|[A-Z]|\\ )+', name) == None:
        print(f'rejected {rat}: name is not alphanumeric')
        return False

    return predict_profanity([rat['name']])[0] == 0

@app.route('/get/<rat_id>')
def get_rat(rat_id:int):
    return jsonify(RatHook.get(element_id=int(rat_id)))

@app.route('/all')
def get_all():
    return jsonify(RatHook.all())

@app.route('/save', methods=['POST','GET'])
def save_rat():
    OK = (jsonify({'message' : 'Success'}), 200)
    BAD_REQUEST = (jsonify({'message': 'Invalid response!'}), 400)

    if DISABLE_SAVING:
        return OK

    json = request.get_json()
    if not json:
        return jsonify({'message' : 'Json Required!!'}), 400

    if type(json) is not dict:
        return BAD_REQUEST

    if not validate(json):
        # the request is technically valid but we're ignoring it
        print('rat failed validation')
        return OK

    # ignore specified id; should be managed by the server
    if 'id' in json.keys():
        json.pop('id')
    RatHook.insert(**json)
    return OK
