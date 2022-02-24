import { PyxledManager } from "./pyxledManager.js"

window.addEventListener('load', function () {
	const pyxlMan = new PyxledManager()
	pyxlMan.init()
	pyxlMan.newImage(16)
	pyxlMan.startLoop()
})

