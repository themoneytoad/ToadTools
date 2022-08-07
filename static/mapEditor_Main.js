import { Tile } from "./mapEditor_Tile.js"

export class MapEditorMain {
    tiles = []
    map_size_x = 128
    map_size_y = 128
    tile_map_name = "tileset.png"
    count = 0
    init() {
        for (var i=0; i< this.map_size_x; i++) {
            for (var j=0; j< this.map_size_y; j++) {
                /*
                let map = document.getElementById("map")
                let tileDom = document.createElement("button")
                let loc = `${i+1} / ${j+1} / ${i+1} / ${j+1}`
                tileDom.style.gridArea = loc
                let index = `${this.count}`
                tileDom.textContent = index
                tileDom.id = index
                tileDom.className = "tile"
                tileDom.onmouseup = (e) => {window.tileOnClick(index)}
                map.appendChild(tileDom)
                */

                let index = `${this.count}`
                let tile = new Tile({id: index, tile: 0, collision: false, loc_row: i+1, loc_col: j+1})
                tile.init();
                this.tiles.push(tile)
                this.count += 1

            }
        }

        // tiles is the global tiles
        console.log(tileset)
        for (var i=0; i<tileset.length; i++) {
            let tmp_id = (tileset[i][7] * 128) + tileset[i][2]
            this.tiles[tmp_id].set_import_info({
                'id': tileset[i][0],
                'name': tileset[i][1],
                'col': tileset[i][2],
                'row': tileset[i][7],
                'group': tileset[i][4],
            })
        }
    }

    get_tile(id) {
        return this.tiles[id]
    }

}
