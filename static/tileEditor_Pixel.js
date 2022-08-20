export class Pixel {
	id = null
    element = null
    loc_col = 0;
    loc_row = 0;
    loc = '0 / 0 / 0 / 0'
    color = 'rgba(0,0,0,0)';
    opacity = 1

	constructor(conf) {
		this.id = conf.id || null
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
        this.element.className = "pixel"
        this.element.onmouseup = (e) => {window.pixel_on_click(this)}
        map.appendChild(this.element)
        this.clear()
    }

    set_id(id) {
        this.id = id
    }

    set_color(color, opacity) {
        this.color = convert_hex_to_rgba(color, opacity)
        this.element.style.backgroundColor = `rgba(${this.color['r']}, ${this.color['g']}, ${this.color['b']}, ${this.color['a']})` 
        this.opacity = this.color['a']
    }

    set_color_import(color) {
        if (typeof(color) === "string") {
            color = this.convert_old_export_to_rgb(color)
        }
        let clr = 'rgba(' + color['r'] + ',' + color['g'] + ',' + color['b'] + ',' + color['a'] + ')'
        this.color = clr
        this.element.style.backgroundColor = clr
        this.opacity = color['a']
    }

    clear() {
        this.color = null
        this.opacity = 0
        this.element.style.backgroundColor = 'rgba(0,0,0,0)'
    }

    get_element() {
        return this.element
    }

    get_pixel_info() {
        //return {id: this.id, tile_1: this.tile_1, tile_2: this.tile_2, tile_3: this.tile_3, collision: this.collision}
    }

}
