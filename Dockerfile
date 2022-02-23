# syntax=docker/dockerfile:1
from python:3.8-slim-buster
WORKDIR .
COPY . .
RUN if [ -e requirements.txt ]; then pip install -r requirements.txt; fi
EXPOSE 5000
CMD ["python", "-m", "flask", "run", "-h", "0.0.0.0", "-p", "5000"]
