export class LevelEditorMain {
    tiles = []
    map_size_x = 32
    map_size_y = 32
    count = 0

    init() {
        for (var i=0; i< this.map_size_x; i++) {
            for (var j=0; j< this.map_size_y; j++) {
                let map = document.getElementById("map")
                let tile = document.createElement("button")
                let loc = `${i+1} / ${j+1} / ${i+1} / ${j+1}`
                tile.style.gridArea = loc
                let index = `${this.count}`
                tile.textContent = index
                tile.id = index
                tile.className = "tile"
                tile.onmouseup = (e) => {window.tileOnClick(index)}
                map.appendChild(tile)
                this.count += 1
            }
        }
    }

}
