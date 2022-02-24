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
	bHovered = false
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
		console.log(this.size)
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
		if (this.mouseInsidePixelCheck(mousePos)) {
			this.bHovered = true
		}
		else {
			this.bHovered = false
		}
	}

	mouseInsidePixelCheck(mousePos) {
		if (mousePos.x > this.coordinates.x &&
			mousePos.x < this.coordinates.x + this.size &&
			mousePos.y > this.coordinates.y &&
			mousePos.y < this.coordinates.y + this.size) {
			return true
		}
		return false
	}

	checkMouseClick(mousePos, color) {
		if (this.mouseInsidePixelCheck(mousePos)) {
			this.bSelected = true
			this.setColor(color)
		}
		else {
			this.bSelected = false
		}
	}

	setColor(newColor) {
		const translated = this.hexToRgbA(newColor)
		this.color = {
			r: translated[0],
			g: translated[1],
			b: translated[2],
			a: 255
		}
		//console.log(this.hexToRgbA(newColor))
	}

	hexToRgbA(hex) {
		var c
		if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c=hex.substring(1).split('');
			if(c.length == 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = '0x'+c.join('')
			return [(c>>16)&255, (c>>8)&255, c&255]
		}
		throw new Error('Bad Hex')
	}
}
