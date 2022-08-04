export class Pixel {
	id = null
    element = null
    loc_col = 0;
    loc_row = 0;
    loc = '0 / 0 / 0 / 0'
    color = "";
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

    set_color(color) {
        this.color = color
        this.element.style.backgroundColor = color
        this.opacity = 1
        this.element.opacity = 1
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

    convert_old_export_to_rgb(color_string) {
        let digits = color_string.substring(5,color_string.length-1)
        let breakdown = digits.split(",")
        let out = {
            'r': breakdown[0],
            'g': breakdown[1],
            'b': breakdown[2],
            'a': breakdown[3],
        }
        return out
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
