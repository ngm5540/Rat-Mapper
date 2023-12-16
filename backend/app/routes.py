# [Routes - App]
# Authors: Nate Mount (ngm5540)

from flask import request, jsonify

from app import app
from app.models.brokers import RatHook

# dirty hack because I don't want to dive into the backend code
DISABLE_SAVING=True

@app.route('/get/<rat_id>')
def get_rat(rat_id:int):
    return jsonify(RatHook.get(element_id=int(rat_id)))

@app.route('/all')
def get_all():
    return jsonify(RatHook.all())

@app.route('/save', methods=['POST','GET'])
def save_rat():
    if request.get_json():
        if DISABLE_SAVING:
            return jsonify({'message' : 'Success'}), 200

        json = request.get_json()
        # ignore specified id; should be managed by the server
        if type(json) is dict and 'id' in json.keys():
            json.pop('id')
        RatHook.insert(**json)
        return jsonify({'message' : 'Success'}), 200
    else:
        return jsonify({'message' : 'Json Required!!'}), 401
