# [Init - Models]
# Authors: Nate Mount (ngm5540)

from app import db

class Rat(db.Model):
   __table_name__:str = 'rat_warehouse'
   id = db.Column(db.Integer, primary_key=True, autoincrement=True)
   name = db.Column(db.String(64))
   fur_color = db.Column(db.String(32))
   eye_color = db.Column(db.String(32))
   size = db.Column(db.String(32))
   blood_type = db.Column(db.String(32))
   hair = db.Column(db.String(32))
   ear_size = db.Column(db.String(32))
   tail_size = db.Column(db.String(32))
   parent_1_id = db.Column(db.Integer)
   parent_2_id = db.Column(db.Integer)
   gender = db.Column(db.String(1))

