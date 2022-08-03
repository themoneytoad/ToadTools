import { LevelEditorMain } from "./levelEditor_Main.js"
import { Tile } from "./levelEditor_Tile.js"

console.log(levels)

window.tileOnClick = function (id) {
    let currTile = levelMain.get_tile(id); // document.getElementById(`${id}`);
    if (selecting_collision) {
        currTile.set_collision(!currTile.get_collision());
    }
    else {
        currTile.set_tile(curr_tile_id, curr_map_z_level);
    }
}

let levelMain = null;

window.addEventListener('load', function () {
	//const levelMain = new LevelEditorMain()
	levelMain = new LevelEditorMain()
	levelMain.init()
})



let curr_tile_id = 1;
let last_floor_id = 1;
let last_floor_group = "grass";
let last_wall_id = 1;
let last_wall_group = "cliffs";
let last_scene_id = 1;
let last_scene_group = "trees";
let curr_map_z_level = 1;
let selecting_collision = false;
let last_selection_id = 0;

let modal = document.getElementById('modal')
let modal_select_group = document.getElementById('select-tile-group')
let modal_select_tile = document.getElementById('select-tile-tile')

let zfirst = document.getElementById('zfirst')
let zsecond = document.getElementById('zsecond')
let zthird = document.getElementById('zthird')
let zcollision = document.getElementById('col')

var curr_menu_type = "floor"
var last_menu_group = "grass"

var menu_tile_floor = new Tile({id:-1, tile_1:1})
menu_tile_floor.menu_init('floor', 1, 'FLOOR')

var menu_tile_wall = new Tile({id:-1, tile_1:1})
menu_tile_wall.menu_init('wall', 1, 'WALL')

var menu_tile_scenery = new Tile({id:-1, tile_1:1})
menu_tile_scenery.menu_init('scene', 1, 'SCENE')

var modal_tile = new Tile({id:-1, tile_1:1})
modal_tile.menu_init('modal-tile', 1, '')

var curr_filename = 'NEW_FILE.lvl'
var curr_level_id = 'generate_new_uuid()'

var modal_open = document.getElementById('modal-open')

window.bar_filename_update = function(value) {
    curr_filename = value
}

var menu_filename = document.getElementById('filename')
menu_filename.value = curr_filename
menu_filename.dispatchEvent(new Event('change', bar_filename_update));

window.bar_collision = function() {
    selecting_collision = !selecting_collision
    levelMain.toggle_collision_visible(selecting_collision)
    reset_bar_button_colors()
    if (selecting_collision) {
        zcollision.style.backgroundColor = "#E1E1E1"
        zcollision.style.color = "#2D3134"
    }
}

window.bar_delete = function() {
    var del_button = document.getElementById('del')
    if (curr_tile_id != 0) {
        last_selection_id = curr_tile_id
        curr_tile_id = 0
        del.style.backgroundColor = "#E1E1E1"
        del.style.color = "#2D3134"
    }
    else {
        curr_tile_id = last_selection_id
        del.style.backgroundColor = "#1A1A1A"
        del.style.color = "#F7F8FB"
    }
}

window.bar_save = function() {
    save_to_db()
}

window.save_to_db = function() {
    let level = levelMain.get_tiles_export()
    const data = {id: curr_level_id, name: curr_filename, data: level}
    fetch(`/savelevel/${JSON.stringify(data)}`, {
            method: 'POST',
        })
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            //console.log(data);
        });
}

window.bar_open = function() {
    fetch(`/listlevels/`)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('GET response text: ');
            open_modal(data);
        });
}

window.bar_clear = function() {
    levelMain.clear_all_tiles()
}

window.open_modal = function(data) {
    modal_open.style.display = 'block'
    var open_butt = document.getElementById("modal-open-button")
    open_butt.disabled = true;
    var lvl_scroll = document.getElementById("modal-open-levels")
    lvl_scroll.innerHTML = ""
    for (let i in data) {
        let l = document.createElement("button")
        l.className = "modal-open-level-button"
        l.innerHTML = data[i][0] + " - " + data[i][1]
        l.onmouseup = (e) => {open_modal_level_select(data[i][0])}
        lvl_scroll.appendChild(l)
    } 
}

window.open_modal_level_select = function(name) {
    curr_filename = name; 
    var open_butt = document.getElementById("modal-open-button")
    open_butt.disabled = false;
}

window.open_modal_open = function() {
    open_from_db(curr_filename)
    modal_open.style.display = 'none'
}

window.open_modal_close = function() {
    modal_open.style.display = 'none'
}

window.open_from_db = function(level) {
    fetch(`/loadlevel/${level}`)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('GET response text: ');
            levelMain.set_tiles_import(data[0][2]);
            curr_filename = data[0][1];
            menu_filename.value = curr_filename
        });
}

window.menu_tile_floor = function () {
    curr_menu_type = "floor"
    levelMain.update_modal_group(curr_menu_type) 
    levelMain.update_modal_tiles(curr_menu_type, last_floor_group) 
    modal_tile.set_tile(last_floor_id, 1)
    modal_select_group.value = last_floor_group 
    modal_select_tile.value = last_floor_id
    console.log(last_floor_id)
    modal.style.display = 'block'
}

window.menu_tile_wall = function () {
    curr_menu_type = "walls"
    levelMain.update_modal_group(curr_menu_type) 
    levelMain.update_modal_tiles(curr_menu_type, last_wall_group) 
    modal_tile.set_tile(last_wall_id, 1)
    modal_select_group.value = last_wall_group 
    modal_select_tile.value = last_wall_id
    console.log(last_wall_id)
    modal.style.display = 'block'
}

window.menu_tile_scene = function () {
    curr_menu_type = "scenery"
    levelMain.update_modal_group(curr_menu_type) 
    levelMain.update_modal_tiles(curr_menu_type, last_scene_group) 
    modal_tile.set_tile(last_scene_id, 1)
    modal_select_group.value = last_scene_group 
    modal_select_tile.value = last_scene_id
    modal.style.display = 'block'
}

window.menu_tile_actor = function () {
    modal.style.display = 'block'
    var type = document.getElementById('modal-title')
    type.innerHTML = "ACTOR"
}

window.modal_close = function () {
    modal.style.display = 'none';
}

window.modal_group_select_update = function (value) {
    last_menu_group = value
    levelMain.update_modal_tiles(curr_menu_type, last_menu_group);
    if (curr_menu_type == "floor") {
        last_floor_group = value
    }
    else if (curr_menu_type == "walls") {
        last_wall_group = value
    }
    else if (curr_menu_type == "scenery") {
        last_scene_group = value
    }
    else {}
}

window.modal_tile_select_update = function (value) {
    curr_tile_id = value;
    if (curr_menu_type == "floor") {
        menu_tile_floor.set_tile(value, 1)
        last_floor_id = value
    }
    else if (curr_menu_type == "walls") {
        menu_tile_wall.set_tile(value, 1)
        last_wall_id = value
    }
    else if (curr_menu_type == "scenery") {
        menu_tile_scenery.set_tile(value, 1)
        last_scene_id = value
    }
    else {}
    modal_tile.set_tile(value, 1)
}

window.reset_z_layer_icons = function () {

}

window.set_z_layer = function (id) {
    reset_z_layer_icons()
    curr_map_z_level = id
    reset_bar_button_colors();
    if (selecting_collision) {
        bar_collision()
    }
    if (id == 1) {
        zfirst.style.backgroundColor = "#E1E1E1"
        zfirst.style.color = "#2D3134"
    }
    if (id == 2) {
        zsecond.style.backgroundColor = "#E1E1E1"
        zsecond.style.color = "#2D3134"
    }
    if (id == 3) {
        zthird.style.backgroundColor = "#E1E1E1"
        zthird.style.color = "#2D3134"
    }
}

window.reset_bar_button_colors = function() {
        zfirst.style.backgroundColor = "#1A1A1A"
        zfirst.style.color = "#F7F8FB"
        zsecond.style.backgroundColor = "#1A1A1A"
        zsecond.style.color = "#F7F8FB"
        zthird.style.backgroundColor = "#1A1A1A"
        zthird.style.color = "#F7F8FB"
        zcollision.style.backgroundColor = "#1A1A1A"
        zcollision.style.color = "#F7F8FB"
}
