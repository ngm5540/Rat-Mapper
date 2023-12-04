# [Brokers - Models]
# Authors: Nate Mount (ngm5540)

from app import db
from app.models import Rat

class NeoBroker():

    def __init__(self, table:str) -> None:
        self.table = table

    def insert(self, **kwargs) -> None:
        db.session.add(self.table(**kwargs))
        db.session.commit()
    
    def select(self, **filters) -> list:
        return [ { k:d.__dict__[k] for k in d.__dict__ if not k.startswith('_')} for d in self.table.query.filter_by(**filters) ]
    
    def all(self) -> list:
        return [ { k:d.__dict__[k] for k in d.__dict__ if not k.startswith('_')} for d in self.table.query.all() ]
    
    def delete(self, **filters) -> None:
        for data in self.table.query.filter_by(**filters).all():
            (db.session.delete(data), db.session.commit())
    
    def update(self, feature:str, val:object, **filters):
        for data in self.table.query.filter_by(**filters):
            setattr(data, feature, val)
            db.session.commit()
    
    def get(self, element_id:int) -> dict:
        data = self.table.query.get(element_id).__dict__
        return {k:data[k] for k in data if not k.startswith('_')}


RatHook = NeoBroker(Rat)