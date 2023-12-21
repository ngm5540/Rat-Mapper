#!/usr/bin/python3
# wrapper script to run backend through wsgi
import sys
sys.path.insert(0, '/opt/rat-mapper/backend/')

from app import app
application = app
