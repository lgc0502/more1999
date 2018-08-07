release: python manage.py migrate
web: gunicorn --pythonpath more1999 more1999.wsgi
worker: python manage.py qcluster
