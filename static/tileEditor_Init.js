import { TileEditorMain } from "./tileEditor_Main.js"
//import { pixel } from "./tileEditor_Pixel.js"

var tileMain = null // Class that holds tile editing info
var curr_tilename = "TILE" // name of our current tile that is being edited
var curr_tile_id = "generate_new_uuid()"
var curr_tile_group = ""
var curr_tile_location_col = null
var curr_tile_location_row = null
var curr_tile_number_of_pixels = 16
var curr_color_selector = 1; // first color selector
var curr_color = "#ffffff"; // color
var curr_opacity = 1.0;
var curr_tool_selected = 'paint'; // painting or bucketing.


window.addEventListener('load', function () {
	tileMain = new TileEditorMain()
	tileMain.init()
})

window.bar_clear = function() {
    let modal = document.getElementById("modal-clear");
    modal.style.display = "block";
    color_modal_close();
    save_modal_close();
    open_modal_close();
}

window.bar_color = function() {
    color_modal_open();
    save_modal_close();
    open_modal_close();
    clear_modal_close();
}

window.bar_open = function() {
    fetch(`/listtiless/`)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('GET response text: ');
            open_modal(data);
        });
     color_modal_close();
     save_modal_close();
     clear_modal_close();
}

window.bar_save = function() {
    save_modal_open();
    color_modal_close();
    open_modal_close();
    clear_modal_close();
}

window.bar_tilename_update = function(value) {
    console.log(value)
    curr_tilename = value
    let tilename = document.getElementById(`tilename`)
    let tilename_save = document.getElementById(`tilename-save`)
    tilename.value = curr_tilename
    tilename_save.value = curr_tilename
}

window.clear_all_tool_colors = function() {
    var pnt = document.getElementById('paint')
    var bck = document.getElementById('bucket')
    pnt.style.backgroundColor = 'black'
    bck.style.backgroundColor = 'black'
    
}

window.clear_modal_clear = function() {
    tileMain.clear_all_pixels()
    clear_modal_close();
}

window.clear_modal_close = function() {
    let modal = document.getElementById("modal-clear");
    modal.style.display = "none";
}

window.color_modal_close = function() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

window.color_modal_opacity = function(val) {
   curr_opacity = val
}

window.color_modal_open = function() {
    let opac = document.getElementById("color-opacity");
    opac.value = curr_opacity
    let modal = document.getElementById("modal");
    modal.style.display = "block";
}

window.color_picked = function(color) {
    let elm = document.getElementById(`paint_${curr_color_selector}`)
    elm.style.backgroundColor = color
    curr_color = color
    set_tool_color(curr_color)
}

window.convert_hex_to_rgba = function(color, opacity) {
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
                let breakdown = null;
                if (typeof(color) == "string") {
                    let spt = color.split("(")
                    let clr = spt[1].split(")")
                    breakdown = clr[0].split(",")
                    test['r'] = parseInt(breakdown[0])
                    test['g'] = parseInt(breakdown[1])
                    test['b'] = parseInt(breakdown[2])
                    if (breakdown.length > 3) {
                        test['a'] = parseFloat(breakdown[3])
                    }
                    else {
                        test['a'] = 1
                    }
                }
                else if (typeof(color) == "object") {
                    test['r'] = parseInt(color['r'])
                    test['g'] = parseInt(color['g'])
                    test['b'] = parseInt(color['b'])
                    test['a'] = parseFloat(opacity)
                }
                else {
                    console.log("How did we get here?")
                }
            }
        }
        return test
    }

window.menu_bucket = function() {
    clear_all_tool_colors()
    curr_tool_selected = 'bucket'
    set_tool_color(curr_color)
}

window.menu_delete = function() {
    clear_all_tool_colors()
    curr_tool_selected = 'delete'
}

window.menu_paint = function() {
    clear_all_tool_colors()
    curr_tool_selected = 'paint'
    set_tool_color(curr_color)
}

window.menu_set_color = function(colorId) {
    curr_color_selector = colorId
    let elm = document.getElementById(`paint_${curr_color_selector}`)
    curr_color = elm.style.backgroundColor
    if (curr_tool_selected === 'delete') {
        curr_tool_selected = 'paint'
    }
    set_tool_color(curr_color)
}


window.menu_zoom = function(val) {
    tileMain.zoom(val)
}

window.open_from_db = function(tile) {
    fetch(`/loadtile/${tile}`)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('GET response text: ');
            tileMain.set_pixels_import(data);
            curr_tilename = data[0][1];
            curr_tile_id = data[0][0];
            curr_tile_location_col = data[0][2];
            curr_tile_location_row = data[0][7];
            curr_tile_group = data[0][4];
            curr_tile_number_of_pixels = data[0][3];
            let elm = document.getElementById("tilename");
            elm.value = curr_tilename;
            let elm2 = document.getElementById("tilename-save");
            elm2.value = curr_tilename;
        });
}

window.open_modal = function(data) {
    let elm = document.getElementById("modal-open")
    elm.style.display = "block"
    var open_butt = document.getElementById("modal-open-button")
    open_butt.disabled = true;
    var tile_scroll = document.getElementById("modal-open-tiles")
    tile_scroll.innerHTML = ""
    console.log(data)
    for (let i in data) {
        let t = document.createElement("button")
        t.className = "modal-open-level-button"
        t.innerHTML = data[i][0] + " - " + data[i][1] + " - " + data[i][2]
        t.onmouseup = (e) => {open_modal_tile_select(data[i][0])}
        tile_scroll.appendChild(t)
    }
}

window.open_modal_close = function() {
    let elm = document.getElementById("modal-open")
    elm.style.display = "none"
}

window.open_modal_open = function() {
    open_from_db(curr_tilename)
    let elm = document.getElementById("modal-open")
    elm.style.display = "none"
}

window.open_modal_tile_select = function(name) {
    curr_tilename = name;
    var open_butt = document.getElementById("modal-open-button")
    open_butt.disabled = false;
}

window.pixel_on_click = function(pixelRef) {
    if (curr_tool_selected === 'paint') {
        pixelRef.set_color(curr_color, curr_opacity)
    }
    else if (curr_tool_selected === 'bucket') {
        tileMain.bucket(pixelRef, curr_color, curr_opacity)
    }
    else if (curr_tool_selected === 'delete') {
        pixelRef.clear()
    }
}

window.save_modal_close = function() {
    let modal = document.getElementById("modal-save");
    modal.style.display = "none";
}

window.save_modal_group = function(value) {
    curr_tile_group = value
}

window.save_modal_location_col = function(value) {
    curr_tile_location_col = value
}

window.save_modal_location_row = function(value) {
    curr_tile_location_row = value
}

window.save_modal_new_id = function() {
    curr_tile_id = "generate_new_uuid()"
    let id = document.getElementById("id-save");
    id.innerHTML = curr_tile_id;
}

window.save_modal_number_of_pixels = function(value) {
    if (value % 8 == 0) {
        curr_tile_number_of_pixels = value
        tileMain.clear_all_pixels()
        tileMain.resize(value)
    }
    else {
        let elm = document.getElementById("size-save")
        elm.value = curr_tile_number_of_pixels
    }
}

window.save_modal_open = function() {
    let id = document.getElementById("id-save");
    id.innerHTML = curr_tile_id;
    let group = document.getElementById("group-save");
    group.value = curr_tile_group;
    let locx = document.getElementById("location-save-x");
    let locy = document.getElementById("location-save-y");
    locx.value = curr_tile_location_col;
    locy.value = curr_tile_location_row;
    let size = document.getElementById("size-save");
    size.value = curr_tile_number_of_pixels;
    let modal = document.getElementById("modal-save");
    modal.style.display = "block";
}

window.save_modal_save = function(value) {
    save_to_db()
}

window.save_to_db = function() {
    let tile = tileMain.get_pixels_export()
    console.log(tile)
    const data = {id: curr_tile_id, name: curr_tilename, group: curr_tile_group, loc_col: curr_tile_location_col, loc_row: curr_tile_location_row, size: curr_tile_number_of_pixels, pixels: tile}
    fetch(`/savetile/${JSON.stringify(data)}`, {
            method: 'POST',
        })
        .then(function (response) {
            return response.text();
        }).then(function (data) {
            //console.log(data);
        });
    let modal = document.getElementById("modal-save");
    modal.style.display = "none";
}

window.set_tool_color = function(color) {
    var tool = null
    if (curr_tool_selected === 'paint') {
        tool = document.getElementById('paint')
    }
    else if (curr_tool_selected === 'bucket') {
        tool = document.getElementById('bucket')
    }
    else {
        tool = document.getElementById('paint')
    }
    tool.style.backgroundColor = curr_color

}


