import {InputManager} from './inputManager.js'
import {Pixel} from './pixel.js'

export class PyxledManager {
	pixels = []

	constructor(conf){
		this.element = document.querySelector(".cnvDiv")
		this.canvas = this.element.querySelector(".cnv")
		this.ctx = this.canvas.getContext("2d")
		this.canvas.width = this.element.getBoundingClientRect().width
		this.canvas.height = this.element.getBoundingClientRect().height
		this.canvas.style.width = this.element.innerWidth
		this.canvas.style.height = this.element.innerHeight
		this.inputMan = new InputManager({pyxled:this})
		this.alphaBackgroundRectWidth = this.canvas.width / 8
	}

	init() {
		document.getElementById("file").addEventListener("click", (e)=>this.optionsFile());
		document.getElementById("paint").addEventListener("click", (e)=>this.optionsPaint());
		document.getElementById("eraser").addEventListener("click", (e)=>this.optionsEraser());
		document.getElementById("bucket").addEventListener("click", (e)=>this.optionsBucket());
		document.getElementById("palette").addEventListener("click", (e)=>this.optionsPalette());
		document.getElementById("undo").addEventListener("click", (e)=>this.optionsUndo());
		document.getElementById("redo").addEventListener("click", (e)=>this.optionsRedo());
		console.log("Pyxled Manager Initialized")
		this.inputMan.init()
		console.log("Input Manager Initialized")
	}

	startLoop() {
		const step = () => {
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
			// do stuff
			this.generateAlphaBackgroundGrid()
			this.loopToUpdatePixels()	
			//
			requestAnimationFrame(() => {
				step();
			})
		}
		step();
	}
	
	newImage(size) {
		this.clearGridDiv()
		this.generateGrid(size)
	}

	clearGridDiv() {
		this.pixels = []
	}

	generateGrid(size) {
		for (var i=0; i<size; i++) {
			for (var j=0; j<size; j++) {
				const pixel = new Pixel({
					canvas: this.canvas,
					id: {row: j, col: i},
					pixelSize: this.canvas.width / size
				})
				this.pixels.push(pixel)
				pixel.init()
			}
		}
	}

	loopToUpdatePixels() {
		for (const pixel of this.pixels) {
			pixel.update()
			pixel.checkMouseHover(this.inputMan.mousePos)
		}
	}

	generateAlphaBackgroundGrid() {
		this.alphaBackgroundRectWidth = this.canvas.width / 8
		for (var i=0; i<8; i++) {
			for (var j=0; j<8; j++) {
				this.ctx.beginPath()
				if ((i+j) % 2 == 0) {
					this.ctx.fillStyle = '#fff'
				}
				else {
					this.ctx.fillStyle = '#aaa'
				}
				this.ctx.fillRect(j * this.alphaBackgroundRectWidth, i * this.alphaBackgroundRectWidth, this.alphaBackgroundRectWidth, this.alphaBackgroundRectWidth)
				this.ctx.stroke()
			}
		}
	}

	mouseClick(mousePos) {
		const colorPicker = document.getElementById("color")
		for (const pixel of this.pixels) {
			pixel.checkMouseClick(mousePos, color.value)
		}
	}
	
	optionsFile() {
		console.log('file')
	}

	optionsPaint() {
		console.log('paint')

	}

	optionsEraser() {
		console.log('eraser')

	}

	optionsBucket() {
		console.log('bucket')

	}

	optionsPalette() {
		console.log('palette')

	}

	optionsUndo() {
		console.log('undo')

	}

	optionsRedo() {
		console.log('redo')

	}
}

