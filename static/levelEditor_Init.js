import { LevelEditorMain } from "./levelEditor_Main.js"

window.tileOnClick = function (id) {
    let currTile = levelMain.get_tile(id); // document.getElementById(`${id}`);
    currTile.set_tile(1);
}

let levelMain = null;

window.addEventListener('load', function () {
	//const levelMain = new LevelEditorMain()
	levelMain = new LevelEditorMain()
	levelMain.init()
})

