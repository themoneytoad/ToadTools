from flask import Flask, request, jsonify, render_template
import json
import click

app = Flask(__name__)

@app.route('/level')
def level():
	return render_template("level.html")

@app.route('/pyxled')
def pyxled():
	return render_template("pyxled.html")

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
