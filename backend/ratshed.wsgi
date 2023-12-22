#!/usr/bin/python3
# wrapper script to run backend through wsgi
import sys
# virtual environment
sys.path.insert(0, '/opt/pypkgs/lib/python3.11/site-packages')
# app
sys.path.insert(1, '/opt/rat-mapper/backend/')

from app import app
application = app
