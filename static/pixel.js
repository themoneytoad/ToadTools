export class Pixel {
	color = {
		r: 255,
		g: 255,
		b: 255,
		a: 0
	}
	bShowGrid = true
	gridLineWidth = "1";
	bSelected = false
	size = 10
	id = {
		row: 0,
		col: 0
	}
	coordinates = {
		x: 0,
		y: 0
	}

	constructor(conf) {
		this.canvas = conf.canvas
		this.ctx = this.canvas.getContext("2d")
		this.id = conf.id
		this.size = conf.pixelSize || 10
	}

	init() {
		this.coordinates.x = this.id.col * this.size
		this.coordinates.y = this.id.row * this.size 
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.rect(this.coordinates.x, this.coordinates.y,
					this.size, this.size)
		if (this.bShowGrid === true) {
			this.ctx.lineWidth = this.gridLineWidth
		}
		else {
			this.ctx.lineWidth = "0"
		}
		this.ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`
		this.ctx.fill()
		this.ctx.stroke()
	}

	update() {
		this.draw()
	}

	checkMouseHover(mousePos) {
		if (mousePos.x > this.coordinates.x &&
			mousePos.x < this.coordinates.x + this.size &&
			mousePos.y > this.coordinates.y &&
			mousePos.y < this.coordinates.y + this.size) {
			this.bSelected = true
		}
		else {
			this.bSelected = false
		}
	}

	setColor(newColor) {
		this.color = newColor
	}
}
