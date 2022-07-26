import { Tile } from "./levelEditor_Tile.js"

export class LevelEditorMain {
    tiles = []
    map_size_x = 32
    map_size_y = 32
    count = 0
    tile_size = 8 // This is pixels of tiles in loaded tilemap
    tile_map_name = "tilemap.png"

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
    }

    get_tile(id) {
        return this.tiles[id]
    }
    
    update_modal_group(category) {
        var group_select = document.getElementById("select-tile-group")
        group_select.innerHTML = '';
        for (let group in tileset[category]) {
            var opt = document.createElement('option')
            opt.value = group
            opt.innerHTML = group
            group_select.appendChild(opt)
        }
    }

    update_modal_tiles(category, group) {
        var tile_select = document.getElementById("select-tile-tile")
        tile_select.innerHTML = '';
        let arry = tileset[category][group]
        for (var i=0; i< arry.length; i++) {
            var opt = document.createElement('option')
            opt.value = arry[i]
            opt.innerHTML = arry[i]
            tile_select.appendChild(opt)
        }
    }

}
