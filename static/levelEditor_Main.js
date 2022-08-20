import { Tile } from "./levelEditor_Tile.js"

export class LevelEditorMain {
    tiles = []
    map_size_x = 32
    map_size_y = 32
    count = 0
    tile_size = 8 // This is pixels of tiles in loaded tilemap
    tile_map_name = "tileset.png"

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
        
        this.clear_all_tiles()
    }

    get_tile(id) {
        return this.tiles[id]
    }

    get_tile_by_db_id(id) {
        for (let i in tileset) {
            if (id == tileset[i][4]) {
                return `${tileset[i][0]},${tileset[i][1]},${tileset[i][2]},${tileset[i][3]},${tileset[i][4]}`
            }
        }
    }

    toggle_collision_visible(visible) {
        for (let i in this.tiles) {
            let tile = this.tiles[i]
            tile.toggle_collision_visible(visible)
        }
    }
    
    update_modal_group(category) {
        var group_select = document.getElementById("select-tile-group")
        group_select.innerHTML = '';
        var list_of_groups = new Set()
        for (let i in tileset) {
            if (tileset[i][1] != "Empty") {
                list_of_groups.add(tileset[i][1])
            }
        }

        for (let group of list_of_groups) {
            var opt = document.createElement('option')
            opt.value = group
            opt.innerHTML = group
            group_select.appendChild(opt)
        }
        
    }

    update_modal_tiles(category, group) {
        var tile_select = document.getElementById("select-tile-tile")
        tile_select.innerHTML = '';
        var list_of_tiles = new Set()
        for (let i in tileset) {
            if (tileset[i][1] === group) {
                var opt = document.createElement('option')
                //opt.value = `${tileset[i][2]},${tileset[i][3]}`
                opt.value = tileset[i]
                opt.innerHTML = tileset[i][0]
                tile_select.appendChild(opt)
            }
        }
    }

    get_tiles_export() {
        var level_1 = []
        var level_2 = []
        var level_3 = []
        var level_col = []
        for (let i in this.tiles) {
            let tile = this.tiles[i]
            let info = tile.get_tile_info()
            level_1.push(info.tile_1)
            level_2.push(info.tile_2)
            level_3.push(info.tile_3)
            level_col.push(info.collision)
        }

        var jsn = {
            'level_1' : level_1,
            'level_2' : level_2,
            'level_3' : level_3,
            'collision' : level_col
        }
        return jsn
    }

    set_tiles_import(data) {
        for (let i in this.tiles) {
            let tile = this.tiles[i]
            tile.clear_tile()
            tile.set_tile(this.get_tile_by_db_id(data['level_1'][i]), 1)
            tile.set_tile(this.get_tile_by_db_id(data['level_2'][i]), 2)
            tile.set_tile(this.get_tile_by_db_id(data['level_3'][i]), 3)
            tile.set_collision(data['collision'][i])
            tile.toggle_collision_visible(false)
        }
    }

    clear_all_tiles() {
        for (let i in this.tiles) {
            let tile = this.tiles[i]
            tile.clear_tile()
        }
    }

}
