from flask import Flask, request, jsonify, render_template
from psycopg2.extras import Json
from uuid import uuid4
import json
import click
import os

from db import db
from imagemaker import imagemaker

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

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

@app.route('/savelevel',methods=['POST'])
def save_level():
    db.connect()
    data = json.loads(request.data)
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
    if (data['id'] != 'generate_new_uuid()'):
        db.execute_query(f"UPDATE tiles SET name='{data['name']}', location_column='{data['loc_col']}', location_row='{data['loc_row']}', number_of_pixels='{data['size']}', tile_group='{data['group']}', pixels={Json(data['pixels'])} WHERE id='{data['id']}';")
    else:
        db.execute_query(f"INSERT INTO tiles(id, name, location_column, location_row, number_of_pixels, tile_group, pixels) VALUES (gen_random_uuid(), '{data['name']}', '{data['loc_col']}', '{data['loc_row']}', '{data['size']}', '{data['group']}', {Json(data['pixels'])});")
    db.close()
    return "Success"

@app.route('/savetilemap/<tile>',methods=['POST'])
def save_tile_map(tile):
    db.connect()
    data = json.loads(tile)
    db.execute_query(f"UPDATE tiles SET name='{data['name']}', location_column='{data['loc_col']}', location_row='{data['loc_row']}', tile_group='{data['group']}' WHERE id='{data['id']}';")
    db.close()
    return "Success"

@app.route('/export', methods=['GET'])
def export():

    db.connect()
    tiles = db.execute_fetch(f"SELECT DISTINCT ON (name) * FROM tiles ORDER BY name, updated_at DESC")
    db.close()

    #imagemaker.generate_blank_image()
    
    for tile in tiles:
        tl = {
            'name':tile[1],
            'col':tile[2],
            'row':tile[7],
            'color':tile[6]['pixels'],
            'group':tile[4]
        }
        imagemaker.set_tile_in_image(tl)

    imagemaker.export_image()
    
    return "Success"

@app.route('/map')
def map():
    os.popen('cp /media/tileset.png /static/tileset.png')
    db.connect()
    tiles = db.execute_fetch(f"SELECT DISTINCT ON (name) * FROM tiles ORDER BY name, updated_at DESC")
    db.close()
    return render_template("map.html", tiles=tiles)


@app.route('/media/<filename>')
def grab_tileset(filename):
    return send_from_directory('media', filename)

@app.route('/level')
def level():
    db.connect()
    tiles = db.execute_fetch(f"SELECT DISTINCT ON (name) name, tile_group, location_row, location_column, id FROM tiles ORDER BY name, updated_at DESC")
    db.close()
    return render_template("level.html", tiles=tiles)

@app.route('/tiles')
def tiles():
    return render_template("tiles.html")

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
