export class Tile {
	id = null
	tile_1 = 0
    tile_2 = 0
    tile_3 = 0
    collision = false
    element = null
    img1 = null
    img2 = null
    img3 = null
    colbox = null
    container = null;
    loc_col = 0;
    loc_row = 0;
    loc = '0 / 0 / 0 / 0'
    tile_size = 128 // how many tiles can fit. 2048 / 8 px -> 256
    tile_background_zoom = '12800%' // zoom in on the tile for editor
    db_id = null

	constructor(conf) {
		this.id = conf.id || null
		this.tile_1 = conf.tile_1 || 0
		this.tile_2 = conf.tile_2 || 0
		this.tile_3 = conf.tile_3 || 0
        this.collision = conf.collision || false
        this.loc_col = conf.loc_col || 0
        this.loc_row = conf.loc_row || 0
        this.db_id = conf.db_id || null
	}
    
    init() {
        this.loc = `${this.loc_row} / ${this.loc_col} / ${this.loc_row} / ${this.loc_col}`
        let map = document.getElementById("map")
        this.element = document.createElement("button")
        this.element.style.gridArea = this.loc
        //this.element.textContent = this.id
        this.element.id = this.id
        this.element.className = "tile"
        this.element.onmouseup = (e) => {window.tileOnClick(this.id)}
        this.img1 = document.createElement("div")
        this.img1.textContent = this.id
        this.img1.style.color = "rgba(255,255,255,0.1)"
        this.img1.className = "tile-image"
        this.img1.style.backgroundImage = "url('/static/tileset.png')"
        this.img1.style.backgroundPosition = `${(this.tile_1%this.tile_size)*(100 / (this.tile_size-1))}% ${Math.floor(this.tile_1/this.tile_size)*(100 / (this.tile_size-1))}%`
        this.img1.style.backgroundSize = this.tile_background_zoom
        this.element.appendChild(this.img1);
        this.img2 = document.createElement("div")
        this.img2.className = "tile-image"
        this.img2.style.backgroundImage = "url('/static/tileset.png')"
        this.img2.style.backgroundPosition = `${(this.tile_2%this.tile_size)*(100 / (this.tile_size-1))}% ${Math.floor(this.tile_2/this.tile_size)*(100 / (this.tile_size-1))}%`
        this.img2.style.backgroundSize = this.tile_background_zoom
        this.element.appendChild(this.img2);
        this.img3 = document.createElement("div")
        this.img3.className = "tile-image"
        this.img3.style.backgroundImage = "url('/static/tileset.png')"
        this.img3.style.backgroundPosition = `${(this.tile_3%this.tile_size)*(100 / (this.tile_size-1))}% ${Math.floor(this.tile_3/this.tile_size)*(100 / (this.tile_size-1))}%`
        this.img3.style.backgroundSize = this.tile_background_zoom
        this.element.appendChild(this.img3);
        this.colbox = document.createElement("div")
        this.colbox.className = "tile-coll"
        this.toggle_collision_visible(false)
        this.element.appendChild(this.colbox);
        map.appendChild(this.element)
    }

    menu_init(domName, tile, type) {
        this.tile_1 = tile
        this.element = document.getElementById(domName);
        this.img1 = document.createElement("div")
        this.img1.className = "tile-image"
        this.img1.style.backgroundImage = "url('/static/tileset.png')"
        this.img1.style.backgroundPosition = `${(this.tile_1%this.tile_size)*(100 / (this.tile_size-1))}% ${Math.floor(this.tile_1/this.tile_size)*(100 / (this.tile_size-1))}%`
        this.img1.style.backgroundSize = this.tile_background_zoom
        this.img1.innerHTML = type
        this.element.appendChild(this.img1);
    }

    set_id(id) {
        this.id = id
    }

    set_tile(tileRef, z_index) {
        if (tileRef) {
     
            let breakdown = tileRef.split(',')
            let tilemap_index = parseInt(breakdown[2]) * 128 + parseInt(breakdown[3])
            let tileLoc = `${(tilemap_index%this.tile_size)*(100 / (this.tile_size-1))}% ${Math.floor(tilemap_index/this.tile_size)*(100 / (this.tile_size-1))}%`
            if (z_index == 1) {
                this.tile_1 = breakdown
                //this.img1.style.backgroundPosition = `${(this.tile_1%this.tile_size)*(100 / (this.tile_size-1))}% ${Math.floor(this.tile_1/this.tile_size)*(100 / (this.tile_size-1))}%`
                this.img1.style.backgroundPosition = tileLoc
            }
            else if (z_index == 2) {
                this.tile_2 = breakdown
                //this.img2.style.backgroundPosition = `${(this.tile_2%this.tile_size)*(100 / (this.tile_size-1))}% ${Math.floor(this.tile_2/this.tile_size)*(100 / (this.tile_size-1))}%`
                this.img2.style.backgroundPosition = tileLoc
            }
            else if (z_index == 3) {
                this.tile_3 = breakdown
                //this.img3.style.backgroundPosition = `${(this.tile_3%this.tile_size)*(100 / (this.tile_size-1))}% ${Math.floor(this.tile_3/this.tile_size)*(100 / (this.tile_size-1))}%`
                this.img3.style.backgroundPosition = tileLoc
            }
        }
    }

    set_collision(collision) {
        this.collision = collision
        this.toggle_collision_visible(this.collision)
    }

    clear_tile() {
        let empty = 'Empty,Empty,0,0,adb1964e-f4a2-47e4-ab58-0a3bba3ccb35'
        this.set_tile(empty, 1); 
        this.set_tile(empty, 2); 
        this.set_tile(empty, 3);
        this.set_collision(false);
    }

    toggle_collision_visible(visible) {
        if (visible) {
            if (this.collision) {
                this.colbox.style.display = 'block'
            }
        }
        else {
            this.colbox.style.display = 'none'
        }
    }

    get_collision() {
        return this.collision
    } 

    get_element() {
        return this.element
    }

    get_tile_info() {
        return {id: this.id, tile_1: this.tile_1[4], tile_2: this.tile_2[4], tile_3: this.tile_3[4], collision: this.collision}
    }

}
