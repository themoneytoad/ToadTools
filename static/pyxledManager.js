import {InputManager} from './inputManager.js'
import {Pixel} from './pixel.js'

export class PyxledManager {
	pixels = []

	constructor(){
		this.element = document.querySelector(".cnvDiv")
		this.canvas = this.element.querySelector(".cnv")
		this.ctx = this.canvas.getContext("2d")
		this.inputMan = new InputManager()
		this.alphaBackgroundRectWidth = this.canvas.width / 8
	}

	init() {
		console.log("Pyxled Manager Initialized")
		this.inputMan.init()
		console.log("Input Manager Initialized")
	}

	startLoop() {
		const step = () => {
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

}

