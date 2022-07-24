import { LevelEditorMain } from "./levelEditor_Main.js"

window.tileOnClick = function (id) {
    let currTile = document.getElementById(`${id}`);
    currTile.style.backgroundColor = "green";
}

let levelMain = null;

window.addEventListener('load', function () {
	//const levelMain = new LevelEditorMain()
	levelMain = new LevelEditorMain()
	levelMain.init()
})

