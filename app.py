from flask import Flask, request, jsonify, render_template
from psycopg2.extras import Json
from uuid import uuid4
import json
import click
import os

from db import db

app = Flask(__name__)

tile_filename = os.path.join(app.static_folder, 'levelEditor_List.json')

@app.route('/listlevels/',methods=['GET'])
def list_levels():
    db.connect()
    levels = db.execute_fetch(f"SELECT DISTINCT ON (name) name, updated_at FROM levels ORDER BY name, updated_at DESC")
    db.close()
    return jsonify(levels)

@app.route('/listtiless/',methods=['GET'])
def list_tiles():
    db.connect()
    tiles = db.execute_fetch(f"SELECT DISTINCT ON (name) name, tile_group, updated_at FROM tiles ORDER BY name, tile_group, updated_at DESC")
    db.close()
    return jsonify(tiles)

@app.route('/loadlevel/<name>',methods=['GET'])
def load_level(name):
    db.connect()
    level = db.execute_fetch(f"SELECT DISTINCT ON (name) * FROM levels WHERE name='{name}' ORDER BY name, updated_at DESC")
    db.close()
    return jsonify(level)

@app.route('/loadtile/<name>',methods=['GET'])
def load_tile(name):
    db.connect()
    level = db.execute_fetch(f"SELECT DISTINCT ON (name) * FROM tiles WHERE name='{name}' ORDER BY name, updated_at DESC")
    db.close()
    return jsonify(level)

@app.route('/savelevel/<level>',methods=['POST'])
def save_level(level):
    db.connect()
    data = json.loads(level)
    #print(type((data['data'])))
    if (data['id'] != 'generate_new_uuid()'):
        db.execute_query(f"UPDATE levels SET name='{data['name']}', data={Json(data['data'])} WHERE id='{data['id']}';")
    else:
        db.execute_query(f"INSERT INTO levels(id, name, data) VALUES (gen_random_uuid(), '{data['name']}', {Json(data['data'])});")
    db.close()
    return "Success"

@app.route('/savetile/<tile>',methods=['POST'])
def save_tile(tile):
    db.connect()
    data = json.loads(tile)
    #print(type((data['data'])))
    if (data['id'] != 'generate_new_uuid()'):
        db.execute_query(f"UPDATE tiles SET name='{data['name']}', location_column=data['loc_col'], location_row=data['loc_row'], number_of_pixels=data['size'], tile_group=data['group'], pixels={Json(data['pixels'])} WHERE id='{data['id']}';")
    else:
        db.execute_query(f"INSERT INTO tiles(id, name, location_column, location_row, number_of_pixels, tile_group, pixels) VALUES (gen_random_uuid(), '{data['name']}', '{data['loc_col']}', '{data['loc_row']}', '{data['size']}', '{data['group']}', {Json(data['pixels'])});")
    db.close()
    return "Success"

@app.route('/level')
def level():
    db.connect()
    levels = db.execute_fetch("SELECT * FROM levels WHERE name='test_level_1';")
    db.close()
    with open(tile_filename) as file:
        data = json.load(file)
    return render_template("level.html", data=data, levels=levels)

@app.route('/tiles')
def tiles():
    return render_template("tiles.html")

@app.route('/pyxled')
def pyxled():
    return render_template("pyxled.html")

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
