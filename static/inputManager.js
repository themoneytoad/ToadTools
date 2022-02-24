export class InputManager {
	mousePos = {
		x: 0,
		y: 0
	}
	constructor(conf) {
		this.pyxled = conf.pyxled
		this.canvas = this.pyxled.canvas
	}

	init() {
		this.canvas.addEventListener('click', e=>this.mouseDown(e))
	}

    mouseMove() {
		
	}

	mouseDown(e) {
		this.mousePos.x = e.offsetX
		this.mousePos.y = e.offsetY
		this.pyxled.mouseClick(this.mousePos)
	}
}
