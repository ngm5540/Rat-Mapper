# [Init - App]

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import app.config as config

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = config.DB_URI

db = SQLAlchemy(app)

from app import routes