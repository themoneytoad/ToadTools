import { MapEditorMain } from "./mapEditor_Main.js"

window.tileOnClick = function (id) {
    let currTile = mapMain.get_tile(id); // document.getElementById(`${id}`);
}

let mapMain = null;

window.addEventListener('load', function () {
	mapMain = new MapEditorMain()
	mapMain.init()
})

let curr_tile_id = 1;
let last_selection_id = 0;

window.bar_tilename_update = function(value) {
    let elem = document.getElementById('tilename')
    elem.innerHTML = value
}

window.bar_export = function() {
    // Do the export function
}

window.bar_open = function() {
    // Open the modal
}

window.save_to_db = function() {
}

window.modal_close = function () {
    modal.style.display = 'none';
}
