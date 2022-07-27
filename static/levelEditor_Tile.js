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

	constructor(conf) {
		this.id = conf.id || null
		this.tile_1 = conf.tile_1 || 0
		this.tile_2 = conf.tile_2 || 0
		this.tile_3 = conf.tile_3 || 0
        this.collision = conf.collision || false
        this.loc_col = conf.loc_col || 0
        this.loc_row = conf.loc_row || 0
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
        this.img1.className = "tile-image"
        this.img1.style.backgroundImage = "url('/static/tileset.png')"
        this.img1.style.backgroundPosition = `${(this.tile_1%128)*(100 / (127))}% ${Math.floor(this.tile_1/128)*(100 / (127))}%`
        this.img1.style.backgroundSize = "12800%"
        this.element.appendChild(this.img1);
        this.img2 = document.createElement("div")
        this.img2.className = "tile-image"
        this.img2.style.backgroundImage = "url('/static/tileset.png')"
        this.img2.style.backgroundPosition = `${(this.tile_2%128)*(100 / (127))}% ${Math.floor(this.tile_2/128)*(100 / (127))}%`
        this.img2.style.backgroundSize = "12800%"
        this.element.appendChild(this.img2);
        this.img3 = document.createElement("div")
        this.img3.className = "tile-image"
        this.img3.style.backgroundImage = "url('/static/tileset.png')"
        this.img3.style.backgroundPosition = `${(this.tile_3%128)*(100 / (127))}% ${Math.floor(this.tile_3/128)*(100 / (127))}%`
        this.img3.style.backgroundSize = "12800%"
        this.element.appendChild(this.img3);
        this.colbox = document.createElement("div")
        this.colbox.className = "tile-coll"
        this.toggle_collision_visible(false)
        this.element.appendChild(this.colbox);
        //this.element.style.backgroundImage = "url('/static/tileset.png')"
        //this.element.style.backgroundPosition = `${(this.tile_1%256)*(99 / (255))}% ${Math.floor(this.tile_1/256)*(99 / (255))}%`
        //this.element.style.backgroundSize = "25600%"
        map.appendChild(this.element)
    }

    menu_init(domName, tile, type) {
        this.tile_1 = tile
        this.element = document.getElementById(domName);
        //this.element.style.backgroundImage = "url('/static/tileset.png')"
        //this.element.style.backgroundPosition = `${(this.tile%256)*(99 / (255))}% ${Math.floor(this.tile/256)*(99 / (255))}%`
        //this.element.style.backgroundSize = "25600%"
        this.img1 = document.createElement("div")
        this.img1.className = "tile-image"
        this.img1.style.backgroundImage = "url('/static/tileset.png')"
        this.img1.style.backgroundPosition = `${(this.tile_1%128)*(100 / (127))}% ${Math.floor(this.tile_1/128)*(100 / (127))}%`
        this.img1.style.backgroundSize = "12800%"
        this.img1.innerHTML = type
        this.element.appendChild(this.img1);
    }

    set_id(id) {
        this.id = id
    }

    set_tile(tilemap_index, z_index) {
        if (z_index == 1) {
            this.tile_1 = tilemap_index
        this.img1.style.backgroundPosition = `${(this.tile_1%128)*(100 / (127))}% ${Math.floor(this.tile_1/128)*(100 / (127))}%`
        }
        else if (z_index == 2) {
            this.tile_2 = tilemap_index
        this.img2.style.backgroundPosition = `${(this.tile_2%128)*(100 / (127))}% ${Math.floor(this.tile_2/128)*(100 / (127))}%`
        }
        else if (z_index == 3) {
            this.tile_3 = tilemap_index
        this.img3.style.backgroundPosition = `${(this.tile_3%128)*(100 / (127))}% ${Math.floor(this.tile_3/128)*(100 / (127))}%`
        }
    }

    set_collision(collision) {
        this.collision = collision
        this.toggle_collision_visible(this.collision)
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
        return {id: this.id, tile_1: this.tile_1, tile_2: this.tile_2, tile_3: this.tile_3, collision: this.collision}
    }

}
