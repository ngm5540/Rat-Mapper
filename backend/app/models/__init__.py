# [Init - Models]
# Authors: Nate Mount (ngm5540)

from app import db

class Rat(db.Model):
   __table_name__:str = 'rat_warehouse'
   id = db.Column(db.Integer, primary_key=True, autoincrement=True)
   name = db.Column(db.String(64))
   fur_color = db.Column(db.Integer)
   eye_color = db.Column(db.Integer)
   size = db.Column(db.Integer)
   blood_type = db.Column(db.Integer)
   hair = db.Column(db.Integer)
   ear_size = db.Column(db.Integer)
   tail_size = db.Column(db.Integer)
   parent_1_id = db.Column(db.Integer)
   parent_2_id = db.Column(db.Integer)
   gender = db.Column(db.Integer)