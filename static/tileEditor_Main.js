import { Pixel } from "./tileEditor_Pixel.js"

export class TileEditorMain {
    pixels = []
    tile_size_x = 16
    tile_size_y = 16
    tile_name = ""
    tile_id = null
    count = 0
    colors = [
        '#2e232f',
        '#3f3546','#625565','#966c6c','#ab947a','#694f62','#80708a','#9bacb2',
        '#c7dcd0','#ffffff','#6e2728','#b33831','#eb4f36','#f47d4a','#ae2334',
        '#e83b3b','#fb6b1d','#f79615','#f9c22c','#7a2f45','#9e453a','#cd683d',
        '#e6904e','#fbb954','#4c3d23','#676633','#a2a947','#d5e04b','#fbff86',
        '#175a4c','#229062','#1ebc73','#90db69','#cddf6d','#313638','#374e4a',
        '#547e64','#92a984','#b1ba90','#0e5d65','#0c8a8f','#11af9b','#31e1b9',
        '#8ff8e2','#323353','#484a77','#4d65b4','#4d9be6','#8fd3ff','#45293f',
        '#6b3e75','#905ea9','#a884f3','#eaaced','#743c54','#a24b6f','#ce657f',
        '#ed8099','#831c5d','#c32554','#f04f78','#f68181','#fca790','#fdcbb0'
    ]
    opacity = 1.0
    zoom_value = 11

    init() {
        console.log('init')
        for (var i=0; i< this.tile_size_x; i++) {
            var row = []
            for (var j=0; j< this.tile_size_y; j++) {
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
                let pixel = new Pixel({id: index, loc_row: i+1, loc_col: j+1})
                pixel.init();
                row.push(pixel)
                this.count += 1

            }
            this.pixels.push(row)
        }

        let colorPicks = document.getElementById("color-picks");
        colorPicks.innerHTML = ''

        for (var i=0; i<this.colors.length; i++) {
            let elm = document.createElement("button");
            elm.id = this.colors[i]
            elm.className = "color-options";
            elm.onmouseup = (e) => {window.color_picked(elm.id)}
            elm.style.backgroundColor = this.colors[i]
            colorPicks.appendChild(elm);
        }

        // setup colors
        let c1 = document.getElementById('paint_1')
        c1.style.backgroundColor = '#ffffff'
        let c2 = document.getElementById('paint_2')
        c2.style.backgroundColor = '#625565'
        let c3 = document.getElementById('paint_3')
        c3.style.backgroundColor = '#2e232f'
        let tool = document.getElementById('paint')
        tool.style.backgroundColor = '#ffffff'

        let grid = document.getElementById('map')
        grid.style.height = `${screen.height * 0.85}px`
    }

    bucket(pixelRef, color) {
        var tmp = [pixelRef]
        let row = pixelRef.loc_row - 1
        let col = pixelRef.loc_col - 1
        this.flood_fill(row, col, pixelRef.color, color)
    }

    flood_fill(row, col, target, color) {
        if (row < 0 || row >= this.pixels.length || col < 0 || col >= this.pixels[0].length || this.pixels[row][col].color == color) {
            return
        }

        if (this.pixels[row][col].color != target) {
            return
        }

        this.pixels[row][col].set_color(color)
        this.flood_fill(row + 1, col, target, color)
        this.flood_fill(row - 1, col, target, color)
        this.flood_fill(row, col + 1, target, color)
        this.flood_fill(row, col - 1, target, color)

        return
    }

    clear_all_pixels() {
        for (let i in this.pixels) {
            for (let j in this.pixels[i]) {
                let pxl = this.pixels[i][j]
                pxl.clear()
            }
        }
    }

    get_pixels_export() {
        var expt = []
        for (let i in this.pixels) {
            var row = []
            for (let j in this.pixels[i]) {
                let pxl = this.pixels[i][j]
                let color = pxl.color;
                row.push(convert_hex_to_rgba(color, pxl.opacity))
            }
            expt.push(row);
        }

        var jsn = {
            'pixels' : expt,
        }
        return jsn
    }
/*
    convert_hex_to_rgba(color, opacity) {
        var test = {
           "r":0,
           "g":0,
           "b":0,
           "a":0
        }
        if (color) {
            var c;
            if(/^#([A-Fa-f0-9]{3}){1,3}$/.test(color)){
                c = color.substring(1).split('');
                if(c.length==3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x'+c.join('');
                test = {"r":(c>>16)&255,"g":(c>>8)&255, "b":c&255,"a":parseFloat(opacity)};
            }
            else {
                let spt = color.split("(")
                let clr = spt[1].split(")")
                let breakdown = clr[0].split(",")
                test['r'] = parseInt(breakdown[0])
                test['g'] = parseInt(breakdown[1])
                test['b'] = parseInt(breakdown[2])
                test['a'] = parseFloat(opacity)
            }
        }
        console.log(opacity)
        return test
    }
*/
    resize(size) {
        for (let i in this.pixels) {
            for (let j in this.pixels[i]) {
                this.pixels[i][j].element.remove();
            }
        }

        this.pixels = []

        this.tile_size_x = size
        this.tile_size_y = size

        this.init()
    }

    set_pixels_import(data) {
        let grid_size = data[0][3]
        this.resize(grid_size)

        let pixel_data = data[0][6]['pixels']
        for (let i in this.pixels) {
            for (let j in this.pixels[i]) {
                let pxl = this.pixels[i][j]
                pxl.clear();
                pxl.set_color_import(pixel_data[i][j])
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

    zoom(val) {
        this.zoom_value += val
        if (this.zoom_value < 1) {
            this.zoom_value = 1
        }
        if (this.zoom_value > 40) {
            this.zoom_value = 40
        }
        for (let i in this.pixels) {
            for (let j in this.pixels[i]) {
                let pxl = this.pixels[i][j]
                pxl.element.style.height = `${2*this.zoom_value}px`
                pxl.element.style.width = `${2*this.zoom_value}px`
            }
        }
        let grid = document.getElementById('map')
        grid.style.height = `${screen.height * 0.85}px`
    }

}
