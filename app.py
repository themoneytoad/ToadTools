from flask import Flask, request, jsonify, render_template
import json
import click
import os

app = Flask(__name__)

tile_filename = os.path.join(app.static_folder, 'levelEditor_List.json')

@app.route('/level')
def level():
    with open(tile_filename) as file:
        data = json.load(file)
    return render_template("level.html", data=data)

@app.route('/pyxled')
def pyxled():
    return render_template("pyxled.html")

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
