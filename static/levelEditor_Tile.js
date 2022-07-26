export class Tile {
	id = null
	tile = 0
    collision = false
    element = null
    container = null;
    loc_col = 0;
    loc_row = 0;
    loc = '0 / 0 / 0 / 0'

	constructor(conf) {
		this.id = conf.id || null
		this.tile = conf.tile || 0
        this.collision = conf.collision || false
        this.loc_col = conf.loc_col || 0
        this.loc_row = conf.loc_row || 0
	}
    
    init() {
        this.loc = `${this.loc_row} / ${this.loc_col} / ${this.loc_row} / ${this.loc_col}`
        let map = document.getElementById("map")
        //this.container = document.createElement("div")
        //this.container.style.gridArea = this.loc
        //this.container.className = "tile-container"
        this.element = document.createElement("button")
        this.element.style.gridArea = this.loc
        this.element.textContent = this.id
        this.element.id = this.id
        this.element.className = "tile"
        this.element.onmouseup = (e) => {window.tileOnClick(this.id)}
        this.element.style.backgroundImage = "url('/static/tileset.png')"
        //this.element.style.backgroundPosition = `-${8*(this.tile%256)}px -${8*Math.floor(this.tile/256)}px`
        this.element.style.backgroundPosition = `${(this.tile%256)*(100 / (255))}% ${Math.floor(this.tile/256)*(100 / (255))}%`
        //this.element.style.height = "8px"
        //this.element.style.width = "8px"
        this.element.style.backgroundSize = "25600%"
        //this.container.appendChild(this.element)
        //map.appendChild(this.container)
        map.appendChild(this.element)
    }

    menu_init(domName, tile) {
        this.tile = tile
        this.element = document.getElementById(domName)
        this.element.style.backgroundImage = "url('/static/tileset.png')"
        this.element.style.backgroundPosition = `${(this.tile%256)*(100 / (255))}% ${Math.floor(this.tile/256)*(100 / (255))}%`
        this.element.style.backgroundSize = "25600%"
    }

    set_id(id) {
        this.id = id
    }

    set_tile(tilemap_index) {
        this.tile = tilemap_index
        //this.element.style.backgroundPosition = `-${8*(this.tile%256)}px -${8*Math.floor(this.tile/256)}px`
        this.element.style.backgroundPosition = `${(this.tile%256)*(100 / (255))}% ${Math.floor(this.tile/256)*(100 / (255))}%`
    }

    set_collitions(collision) {
        this.collision = collision
    }

    get_element() {
        return this.element
    }

    get_tile_info() {
        return {id: this.id, tile: this.tile, collision: this.collision}
    }

}
