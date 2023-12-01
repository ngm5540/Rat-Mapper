# [Routes - App]
# Authors: Nate Mount (ngm5540)

from flask import request, jsonify

from app import app
from app.models.brokers import RatHook

@app.route('/get/<rat_id>')
def get_rat(rat_id:int):
    return jsonify(RatHook.get(id=int(rat_id)))


@app.route('/save')
def save_rat():
    if request.get_json():
        RatHook.insert(**request.get_json())
        return jsonify({'message' : 'Success'}), 200
    else:
        return jsonify({'message' : 'Json Required!!'}), 401