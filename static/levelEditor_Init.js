import { LevelEditorMain } from "./levelEditor_Main.js"
import { Tile } from "./levelEditor_Tile.js"

window.tileOnClick = function (id) {
    let currTile = levelMain.get_tile(id); // document.getElementById(`${id}`);
    currTile.set_tile(curr_tile_id);
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
let modal = document.getElementById('modal')
let modal_select_group = document.getElementById('select-tile-group')
let modal_select_tile = document.getElementById('select-tile-tile')

var curr_menu_type = "floor"
var last_menu_group = "grass"

var menu_tile_floor = new Tile({id:-1, tile:1})
menu_tile_floor.menu_init('floor', 1)

var menu_tile_wall = new Tile({id:-1, tile:1})
menu_tile_wall.menu_init('wall', 1)

var menu_tile_scenery = new Tile({id:-1, tile:1})
menu_tile_scenery.menu_init('scene', 1)

var modal_tile = new Tile({id:-1, tile:1})
modal_tile.menu_init('modal-tile', 1)

window.bar_first = function() {
    curr_tile_id = 1;
    curr_map_z_level = 1;
}

window.bar_second = function() {
    curr_tile_id = 2;
    curr_map_z_level = 2;
}

window.bar_third = function() {
    curr_tile_id = 3;
    curr_map_z_level = 3;
}

window.bar_collision = function() {
    curr_tile_id = 4;
    curr_map_z_level = 0;
}

window.bar_delete = function() {
    curr_tile_id = 0;
}

window.menu_tile_floor = function () {
    curr_menu_type = "floor"
    levelMain.update_modal_group(curr_menu_type) 
    levelMain.update_modal_tiles(curr_menu_type, last_floor_group) 
    modal_tile.set_tile(last_floor_id)
    modal_select_group.value = last_floor_group 
    modal_select_tile.value = last_floor_id
    console.log(last_floor_id)
    modal.style.display = 'block'
    var type = document.getElementById('modal-title')
    type.innerHTML = "FLOOR"
}

window.menu_tile_wall = function () {
    curr_menu_type = "walls"
    levelMain.update_modal_group(curr_menu_type) 
    levelMain.update_modal_tiles(curr_menu_type, last_wall_group) 
    modal_tile.set_tile(last_wall_id)
    modal_select_group.value = last_wall_group 
    modal_select_tile.value = last_wall_id
    console.log(last_wall_id)
    modal.style.display = 'block'
    var type = document.getElementById('modal-title')
    type.innerHTML = "WALL"
}

window.menu_tile_scene = function () {
    curr_menu_type = "scenery"
    levelMain.update_modal_group(curr_menu_type) 
    levelMain.update_modal_tiles(curr_menu_type, last_scene_group) 
    modal_tile.set_tile(last_scene_id)
    modal_select_group.value = last_scene_group 
    modal_select_tile.value = last_scene_id
    modal.style.display = 'block'
    var type = document.getElementById('modal-title')
    type.innerHTML = "SCENE"
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
        menu_tile_floor.set_tile(value)
        last_floor_id = value
    }
    else if (curr_menu_type == "walls") {
        menu_tile_wall.set_tile(value)
        last_wall_id = value
    }
    else if (curr_menu_type == "scenery") {
        menu_tile_scenery.set_tile(value)
        last_scene_id = value
    }
    else {}
    modal_tile.set_tile(value)
}

