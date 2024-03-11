const link = {
	eds: "eds/index.html",
	voda: "voda/index.html",
	ice: "ice/index.html"
}
let list = window.location.search,
parameters = new URLSearchParams(list),
backlink = parameters.get("backlink");
mobilebypass = parameters.get("mobilebypass");


/*if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) != true || mobilebypass == "true") {
    document.getElementById("mobile").setAttribute("style", "display: none")
}
else {
	document.getElementById("menu").setAttribute("style", "display: none")
	document.getElementById("podval").setAttribute("style", "display: none")
	document.getElementById("header").setAttribute("style", "display: none")
	document.getElementById("body").setAttribute("style", "background-color: #000000;")
}*/
window.scrollTo(0, 0)
document.querySelector("body").setAttribute("style", "overflow: hidden")
window.addEventListener('load', function() {
	function poexali() {		
		document.getElementById("loader").setAttribute("style", "transform: translateY(-100%)")
		ClassName_Arttribute("loaderi", "style", "opacity: 0", "set")
		document.querySelector("body").setAttribute("style", "")
		window.scrollTo(0, 0)
		setTimeout(function() {
			document.getElementById("header").setAttribute("style", "transform: translateY(0px)")
			setTimeout(function() {
				document.getElementById("microlab_logo").setAttribute("style", "opacity: 1")
				if (backlink != null && backlink != "") {
					document.getElementById("schoolnet").setAttribute("style", "margin-left: 0px")
				}
			}, 400)
		}, 950)
	}
	setTimeout(poexali, 1200)
})
setTimeout(function(){
	ClassName_Arttribute("loaderi", "style", "opacity: 1", "set")
}, 200)
document.getElementById("voda").onclick = function() {
	redirect(link.voda, "#40ff65")
}
document.getElementById("eds").onclick = function() {
	redirect(link.eds, "#FFC900")
}
document.getElementById("ice").onclick = function() {
	redirect(link.ice, "#35d3fb")
}
/*document.getElementById("mobile_button").onclick = function() {
	if (list != null && list != "") {
		list = list + "&mobilebypass=true"
	}
	else {
		list = list + "?mobilebypass=true"
	}
	document.getElementById("loader").setAttribute("style", "transform: translateY(0); background-color: #FFFFFF")
	setTimeout(function() {
		window.location = list
	}, 1200)
}*/
document.getElementById("schoolnet").onclick = function() {
	redirect(backlink, "#FFFFFF")
}
function redirect(link, color) {
	document.getElementById("loader_header").setAttribute("style", "position: absolute; z-index: 4")
	document.getElementById("mobile_header_microlaba_wrapper").setAttribute("style", "position: fixed; z-index: 4; display: none; top: 0")
	document.getElementById("loader").setAttribute("style", "transform: translateY(0); background-color:" + color)
	setTimeout(function() {
		window.location = link + list
	}, 1200)
	if (backlink != null && backlink != "") {
		document.getElementById("schoolnet").setAttribute("style", "margin-left: -180px")
	}
}
function ClassName_Arttribute(classname, attribute, value, status) {
	for (let i = 0; i < document.getElementsByClassName(classname).length; i++) {
		if (status == "set") {
			document.getElementsByClassName(classname)[i].setAttribute(attribute, value)	
		}
		else if (status == "remove") {
			document.getElementsByClassName(classname)[i].removeAttribute(attribute)	
		}
	}
}