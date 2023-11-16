# [Brokers - Models]
# Authors: Nate Mount (ngm5540)

from app.models import Rat

class RatBroker():

    def new(**kwargs) -> None:
        pass

    def get(**filters) -> dict:
        pass

    def delete(**filters) -> None:
        pass


RatHook = RatBroker()