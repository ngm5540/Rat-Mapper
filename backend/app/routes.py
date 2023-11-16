# [Routes - App]
# Authors: Nate Mount (ngm5540)

from flask import request

from app import app
from app.models.brokers import RatHook

@app.route('/get/<rat_id>')
def get_rat(rat_id:int):

    data = RatHook.get(id=int(rat_id))

@app.route('/save')
def save_rat():
    if request.get_json():
        RatHook.new(**request.get_json())