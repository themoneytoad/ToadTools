import { PyxledManager } from "./pyxledManager.js"

(function () {
	const pyxlMan = new PyxledManager()
	pyxlMan.init()
	pyxlMan.newImage(16)
	pyxlMan.startLoop()
})();

