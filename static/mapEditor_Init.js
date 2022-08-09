import { MapEditorMain } from "./mapEditor_Main.js"

let selected_tile_id = null;

window.tileOnClick = function (id) {
    let view = document.getElementById('view')
    let open = document.getElementById('open')

    if (selected_tile_id != id) {
        selected_tile_id = id
        mapMain.tile_selected(id)
        view.disabled = false;
        open.disabled = false;
    }
    else {
        selected_tile_id = null
        mapMain.tile_selected(null)
        view.disabled = true;
        open.disabled = true;
    }

    let modal = document.getElementById('modal')

    if (modal.style.display == "block" && selected_tile_id == null) {
        modal.style.display = "none"
    }

}

let mapMain = null;

window.addEventListener('load', function () {
	mapMain = new MapEditorMain()
	mapMain.init()
})


window.bar_tilename_update = function(value) {
    let elem = document.getElementById('tilename')
    elem.innerHTML = value
}

window.bar_export = function() {
    // Do the export function
    fetch(`/export`, {
            method: 'GET',
        })
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            console.log(data);
        });
}

window.bar_view = function() {
    if (selected_tile_id) {
        mapMain.update_modal_info(selected_tile_id)
        let modal = document.getElementById('modal')
        modal.style.display = 'block'
    }
}

window.bar_open = function() {
    // Open the modal
}

window.save_to_db = function() {
    let tile = mapMain.get_tile(selected_tile_id)
    const data = {id: tile.db_id, name: tile.db_name, group: tile.db_group, loc_col: tile.db_col, loc_row: tile.db_row}
    fetch(`/savetilemap/${JSON.stringify(data)}`, {
            method: 'POST',
        })
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            //console.log(data);
        });
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

window.modal_close = function () {
    modal.style.display = 'none';
}

window.view_modal_name = function(name) {
    let tile = mapMain.get_tile(selected_tile_id)
    tile.view_set_name(name)
}

window.view_modal_group = function(group) {
    let tile = mapMain.get_tile(selected_tile_id)
    tile.view_set_group(group)
}

window.view_modal_location_col = function(col) {
    let tile = mapMain.get_tile(selected_tile_id)
    tile.view_set_col(col)
}

window.view_modal_location_row = function(row) {
    let tile = mapMain.get_tile(selected_tile_id)
    tile.view_set_row(row)
}

window.view_modal_save = function() {
    save_to_db()
    mapMain.swap_tiles(selected_tile_id)
    mapMain.unselect_all_tiles()
}
