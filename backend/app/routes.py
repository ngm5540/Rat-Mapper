# [Routes - App]
# Authors: Nate Mount (ngm5540)
import re

from profanity_check import predict as predict_profanity
from flask import request, jsonify

from app import app
from app.models.brokers import RatHook

DISABLE_SAVING = False

def validate(rat):
    print(f'validating {rat}')
    # make sure the hair is valid
    fc = rat.get('fur_color')
    if not fc or re.fullmatch('(B|W|r){2}', fc) == None:
        print('invalid fur_color')
        return False

    # make sure name is alphabetic characters
    name = rat.get('name')
    if not name or re.fullmatch('([a-z]|[A-Z]|\\ )+', name) == None:
        print('name is not alphanumeric')
        return False

    if 1 in predict_profanity([name, name.replace(' ', '')]):
        print(f'{name} failed profanity check!')
        return False

    return True

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
        print('rejecting - no body!')
        return jsonify({'message' : 'Json Required!!'}), 400

    if type(json) is not dict:
        print('rejecting - invalid body!')
        return BAD_REQUEST

    if not validate(json):
        # the request is technically valid but we're ignoring it
        print('rejecting - failed data validation!')
        return OK

    # ignore specified id; should be managed by the server
    if 'id' in json.keys():
        json.pop('id')
    RatHook.insert(**json)
    print('accepted submission')
    return OK
