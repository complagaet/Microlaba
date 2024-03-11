let scheme = 1, reostat_1_min = 0, reostat_1_max = 0, reostat_1_pass = false, supply = 0, glE = 0, glr = 0, resistor_1 = 0, resistor_1_pass = false, pokaz = 1, reostat_2_min = 0, reostat_2_max = 0, reostat_2_pass = false, onworkplace = false, onschemeinfo = false;
const home = "../../"
let list = window.location.search,
parameters = new URLSearchParams(list),
backlink = parameters.get("backlink");
mobilebypass = parameters.get("mobilebypass");
//
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) != true || mobilebypass == "true") {
    document.getElementById("mobile").setAttribute("style", "display: none")
}
else {
	document.getElementById("loader_header").setAttribute("style", "display: none")
	document.getElementById("menu").setAttribute("style", "display: none")
	document.getElementById("podval").setAttribute("style", "display: none")
	document.getElementById("main").setAttribute("style", "display: none")
	document.getElementById("body").setAttribute("style", "background-color: #000000")
}
setTimeout(function(){
	ClassName_Arttribute("loaderi", "style", "opacity: 1", "set")
}, 200)
window.addEventListener('load', function() {
	function poexali() {		
		document.getElementById("loader").setAttribute("style", "transform: translateY(-100%)")
		document.getElementById("microlab_logo").setAttribute("style", "cursor: pointer")
		ClassName_Arttribute("loaderi", "style", "opacity: 0", "set")
		if (backlink != null && backlink != "") {
			document.getElementById("schoolnet").setAttribute("style", "margin-left: 0px")
		}
	}
	document.getElementById("loadtrash").setAttribute("style", "display: none")
	setTimeout(poexali, 1200)
})
function redirect(link, color) {
	document.getElementById("loader_header").setAttribute("style", "position: absolute; z-index: 4")
	document.getElementById("loader").setAttribute("style", "transform: translateY(0); background-color:" + color)
	setTimeout(function() {
		window.location = link + list
	}, 1200)
}
document.getElementById("mobile_button").onclick = function() {
	if (list != null && list != "") {
		list = list + "&mobilebypass=true"
	}
	else {
		list = list + "?mobilebypass=true"
	}
	document.getElementById("loader").setAttribute("style", "transform: translateY(0); background-color: #FFC900")
	setTimeout(function() {
		window.location = list
	}, 1200)
}
document.getElementById("schoolnet").onclick = function() {
	redirect(backlink, "#FFFFFF")
}
document.getElementById("microlab_logo").onclick = function() {
	redirect(home, "#FFFFFF")
}
//
$(".button_gray").click(function() {
	scheme_changer(this.id)
})
$(".frame_utilites_input").change(function() {
	console.log(this.id)
	input_auditor(this.id)
	waiter_of_start()
});
$(".supplysel").click(function() {
	supply_changer(this.id)
});
document.getElementById("pokaz").onclick = function() {
	if (pokaz == 0) {
		pokaz = 1
		screen_changer("digital_output_big_icon", "digital_output_main_interface")
	}
	else { 
		pokaz = 0
		screen_changer("digital_output_main_interface", "digital_output_big_icon")
	}
	switcher_animator("pokaz", pokaz)
	document.getElementById("pokaz").setAttribute("style", "pointer-events: none");
	setTimeout(function() {
		document.getElementById("pokaz").removeAttribute("style", "");
	}, 600)
	supply_auditor()
}
document.getElementById("info_close").onclick = function() {
	screen_changer("scheme_info_screen", "workplace")
	document.getElementById("start_experiment").setAttribute("style", "width: 50%;");
	document.getElementById("start_experiment").removeAttribute("disabled", "");
	onschemeinfo = false 
}
document.getElementById("start_experiment").onclick = function() {
	if (onworkplace == false) {
		switcher_animator("pokaz", pokaz)
		screen_changer("digital_output_big_icon", "digital_output_main_interface")
		screen_changer("scheme_selection_screen", "workplace")
		setTimeout(function() {
			screen_changer("supply_big_icon", "supply_selector_big")
		}, 100)
		document.getElementById("hide_output_wrapper").setAttribute("style", "width: 50%;");
		document.getElementById("start_experiment").setAttribute("style", "width: 50%;");
		document.getElementById("start_experiment").innerHTML = "Информация о приборах";
		document.getElementById("scheme_selection_1").setAttribute("style", "opacity: 1; display: flex; width: 100%; height: 100%; justify-content: space-between; align-items: center; transition-duration: 0.3s");
		document.getElementById("scheme_selection").removeAttribute("disabled", "");
		document.getElementById("start_experiment").setAttribute("disabled", "");
		setTimeout(function() {
			document.getElementById("start_experiment").removeAttribute("disabled", "");
		}, 600)
		onworkplace = true
		info_clear()
	}
	else {
		screen_changer("workplace", "scheme_info_screen")
		document.getElementById("start_experiment").setAttribute("disabled", "");
		document.getElementById("start_experiment").setAttribute("style", "cursor: not-allowed; pointer-events: none; background-color: #999999; width: 50%")
		supply_auditor()
		onschemeinfo = true
	}
}
document.getElementById("lbp_slider").oninput = function() {
	supply_auditor()
}
document.getElementById("lbp_slider_2").oninput = function() {
	supply_auditor()
}
document.getElementById("reostat1_slider").oninput = function() {
	supply_auditor()
}
document.getElementById("reostat2_slider").oninput = function() {
	supply_auditor()
}
document.getElementById("reostat3_1_slider").oninput = function() {
	supply_auditor()
}
document.getElementById("reostat3_2_slider").oninput = function() {
	supply_auditor()
}
document.getElementById("scheme_selection").onclick = function() {
	reostat_1_min = 0
	reostat_1_max = 0
	reostat_1_pass = false
	reostat_2_min = 0
	reostat_2_max = 0
	reostat_2_pass = false
	supply = 0
	glE = 0
	resistor_1 = 0,
	resistor_1_pass = false
	onworkplace = false
	document.getElementById("battery_1").setAttribute("class", "battery battery_1");
	document.getElementById("battery_2").setAttribute("class", "battery battery_2");
	document.getElementById("battery_3").setAttribute("class", "battery battery_3");
	document.getElementById("hide_output_wrapper").setAttribute("style", "width: 0%;");
	document.getElementById("start_experiment").setAttribute("style", "width: 100%;");
	document.getElementById("start_experiment").innerHTML = "Старт!";
	if (pokaz == 1) {
		screen_changer("digital_output_main_interface", "digital_output_big_icon")
	}
	pokaz = 1
	if (glr != 0) {
		screen_changer("supply_main_interface", "supply_big_icon")
	}
	else {
		screen_changer("supply_selector_big", "supply_big_icon")
	}
	glr = 0
	if (onschemeinfo == true) {
		screen_changer("scheme_info_screen", "scheme_selection_screen")
	}
	else {
		screen_changer("workplace", "scheme_selection_screen")
	}
	onschemeinfo = false
	document.getElementById("reostat_1_max").value = "";
	document.getElementById("reostat_1_min").value = "";
	document.getElementById("reostat_2_max").value = "";
	document.getElementById("reostat_2_min").value = "";
	document.getElementById("resistor_1").value = "";
	waiter_of_start()
	document.getElementById("scheme_selection_1").setAttribute("style", "opacity: 0; display: flex; width: 100%; height: 100%; justify-content: space-between; align-items: center; transition-duration: 0.3s");
	document.getElementById("scheme_selection").setAttribute("disabled", "");
	document.getElementById("U1").innerHTML = "U = 0.00 V"
	document.getElementById("I1").innerHTML = "I = 0.00 A"
	arrow_update(0, "arrow_U1", 0, 12)
	arrow_update(0, "arrow_I1", 0, 6)
	arrow_update(0, "arrow_U2", 0, 12)
	arrow_update(0, "arrow_I2", 0, 6)
	arrow_update(0, "arrow_U3", 0, 12)
	arrow_update(0, "arrow_I3", 0, 6)
}
waiter_of_start()
switcher_animator("pokaz", pokaz)
scheme_changer("button_s1")
//
function info_clear() {
	document.getElementById("info_supply").innerHTML = "Не выбран источник питания!";
	document.getElementById("info_U1").innerHTML = "U = 0.00 V";
	document.getElementById("info_I1").innerHTML = "I = 0.00 A";
	document.getElementById("info_R1").innerHTML = "R1 = 0.00 Om";
	document.getElementById("info_R2").innerHTML = "R2 = 0.00 Om";
}
function scheme_changer(button) {
	reostat_1_min = 0
	reostat_1_max = 0
	reostat_1_pass = false
	reostat_2_min = 0
	reostat_2_max = 0
	reostat_2_pass = false
	supply = 0
	glE = 0
	glr = 0
	resistor_1 = 0,
	resistor_1_pass = false
	waiter_of_start()
	function clear() {
		document.getElementById("button_s1").classList.remove("button_green")
		document.getElementById("button_s2").classList.remove("button_green")
		document.getElementById("button_s3").classList.remove("button_green")
		document.getElementById("reostates").innerHTML = "Реостат"
		document.getElementById("reostat_1_max").value = "";
		document.getElementById("reostat_1_min").value = "";
		document.getElementById("reostat_2_max").value = "";
		document.getElementById("reostat_2_min").value = "";
		document.getElementById("resistor_1").value = "";
		document.getElementById("pripiska_reostat1").innerHTML = "R1";
		screen_changer("scheme_preview", "scheme_preview")
		setTimeout(function() {
			document.getElementById("scheme_preview").classList.remove("scheme_1_preview")
			document.getElementById("scheme_preview").classList.remove("scheme_2_preview")
			document.getElementById("scheme_preview").classList.remove("scheme_3_preview")
		}, 290)
		document.getElementById("scheme1").setAttribute("style", "display: none")
		document.getElementById("scheme2").setAttribute("style", "display: none")
		document.getElementById("scheme3").setAttribute("style", "display: none")
		document.getElementById("comp_resistor").setAttribute("style", "display: none")
		document.getElementById("frame_resistor").setAttribute("style", "display: none")
		document.getElementById("frame_reostat_2").setAttribute("style", "display: none")
		document.getElementById("info_R2_p").setAttribute("style", "")
		document.getElementById("info_R1_icon").classList.remove("icon_resistor_frame")
		document.getElementById("info_R1_icon").classList.add("icon_reostat_frame")
		info_clear()
	}
	if (button == "button_s1") {
		scheme = 1
		clear()
		document.getElementById(button).classList.add("button_green")
		setTimeout(function() {
			document.getElementById("scheme_preview").classList.add("scheme_1_preview")
		}, 300)
		document.getElementById("scheme1").setAttribute("style", "")
		document.getElementById("info_R2_p").setAttribute("style", "display: none")	
	}
	else if (button == "button_s2") {
		scheme = 2
		clear()
		document.getElementById(button).classList.add("button_green")
		setTimeout(function() {
			document.getElementById("scheme_preview").classList.add("scheme_2_preview")
		}, 300)
		document.getElementById("scheme2").setAttribute("style", "")
		document.getElementById("pripiska_reostat1").innerHTML = "R2"
		document.getElementById("comp_resistor").setAttribute("style", "")
		document.getElementById("frame_resistor").setAttribute("style", "display: flex")
		document.getElementById("info_R1_icon").classList.add("icon_resistor_frame")
		document.getElementById("info_R1_icon").classList.remove("icon_reostat_frame")
	}
	else if (button == "button_s3") {
		scheme = 3
		clear()
		document.getElementById(button).classList.add("button_green")
		setTimeout(function() {
			document.getElementById("scheme_preview").classList.add("scheme_3_preview")
		}, 300)
		document.getElementById("scheme3").setAttribute("style", "")
		document.getElementById("reostates").innerHTML = "Реостат ×2"
		document.getElementById("frame_reostat_2").setAttribute("style", "display: flex")
	}
}
function waiter_of_start() {
	if (scheme == 1) {
		if (reostat_1_pass == false) {
			document.getElementById("start_experiment").setAttribute("style", "cursor: not-allowed; pointer-events: none; background-color: #999999")
			document.getElementById("start_experiment").setAttribute("disabled", "")
		}
		else {
			document.getElementById("start_experiment").setAttribute("style", "")
			document.getElementById("start_experiment").removeAttribute("disabled", "")
		}
	}
	else if (scheme == 2) {
		if (reostat_1_pass == false || resistor_1_pass == false) {
			document.getElementById("start_experiment").setAttribute("style", "cursor: not-allowed; pointer-events: none; background-color: #999999")
			document.getElementById("start_experiment").setAttribute("disabled", "")
		}
		else {
			document.getElementById("start_experiment").setAttribute("style", "")
			document.getElementById("start_experiment").removeAttribute("disabled", "")
		}
	}
	else if (scheme == 3) {
		if (reostat_1_pass == false || reostat_2_pass == false) {
			document.getElementById("start_experiment").setAttribute("style", "cursor: not-allowed; pointer-events: none; background-color: #999999")
			document.getElementById("start_experiment").setAttribute("disabled", "")
		}
		else {
			document.getElementById("start_experiment").setAttribute("style", "")
			document.getElementById("start_experiment").removeAttribute("disabled", "")
		}
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
function switcher_animator(targ, status) {
		let target = document.getElementById(targ)
		if (status == 0) {
			target.classList.add("switcher_off")
			target.classList.remove("switcher_on")
		}
		else {
			target.classList.add("switcher_on")
			target.classList.remove("switcher_off")
		}
	}
function supply_changer(eid) {
	function battery_kvass() {
		document.getElementById("battery_1").setAttribute("class", "battery battery_1 battery_kvass");
		document.getElementById("battery_2").setAttribute("class", "battery battery_2 battery_kvass");
		document.getElementById("battery_3").setAttribute("class", "battery battery_3 battery_kvass");
		document.getElementById("frame_lbp").setAttribute("style", "display: none")
		document.getElementById("kvass_1").setAttribute("style", "display: none")
		document.getElementById("lbp_1").setAttribute("style", "");
		document.getElementById("frame_kvass").setAttribute("style", "");
		supply = "kvass"
		supply_auditor()
	}
	function battery_lbp() {
		document.getElementById("battery_1").setAttribute("class", "battery battery_1 battery_lbp");
		document.getElementById("battery_2").setAttribute("class", "battery battery_2 battery_lbp");
		document.getElementById("battery_3").setAttribute("class", "battery battery_3 battery_lbp");
		document.getElementById("frame_kvass").setAttribute("style", "display: none")
		document.getElementById("lbp_1").setAttribute("style", "display: none")
		document.getElementById("kvass_1").setAttribute("style", "");
		document.getElementById("frame_lbp").setAttribute("style", "");
		supply = "lbp"
		supply_auditor()
	}
	if (eid == "kvass") {
		battery_kvass()
		screen_changer("supply_selector_big", "supply_main_interface");
	}
	else if (eid == "lbp") {
		battery_lbp()
		screen_changer("supply_selector_big", "supply_main_interface");
		
	}
	else if (eid == "kvass_1") {
		battery_kvass()
	}
	else if (eid == "lbp_1") {
		battery_lbp()
	}
}
function supply_auditor() {
	if (supply == "kvass") {
		glE = 12;
		glr = 0.06;
		document.getElementById("info_supply").innerHTML = "ε = " + glE.toFixed(2) + " V | r = " + glr.toFixed(2) + " Om"
	}
	else if (supply == "lbp") {
		glE = document.getElementById("lbp_slider").value * 20 / 100;
		glr = document.getElementById("lbp_slider_2").value * 1.5 / 100;
		document.getElementById("info_supply").innerHTML = "ε = " + glE.toFixed(2) + " V | r = " + glr.toFixed(2) + " Om"
		if (pokaz == 1) {
			document.getElementById("lbp_u").innerHTML = "ε = " + glE.toFixed(2) + " V | r = " + glr.toFixed(2) + " Om"
		}
		else {
			document.getElementById("lbp_u").innerHTML = "ε = ### V | r = ### Om"
		}
	}
	if (scheme == 1) {
		Calculate_1(glE, (document.getElementById("reostat1_slider").value / (100 / (reostat_1_max - reostat_1_min)) + reostat_1_min), glr);
	}
	else if (scheme == 2) {
		Calculate_2(glE, resistor_1, (document.getElementById("reostat2_slider").value / (100 / (reostat_1_max - reostat_1_min)) + reostat_1_min), glr);
	}
	else if (scheme == 3) {
		let R1, R2;
		R1 = (document.getElementById("reostat3_1_slider").value / (100 / (reostat_1_max - reostat_1_min)) + reostat_1_min);
		R2 = (document.getElementById("reostat3_2_slider").value / (100 / (reostat_2_max - reostat_2_min)) + reostat_2_min);
		Calculate_3(glE, R1, R2, glr)
	}
}
function screen_changer(toHide, toShow) {
	let hide = document.getElementById(toHide), show = document.getElementById(toShow);
	hide.setAttribute("style", "transition-duration: 0.3s; transform: scale(0); opacity: 0;")
	setTimeout(function() {
		hide.setAttribute("style", "display: none");
		show.setAttribute("style", "display: flex; transform: scale(0); opacity: 0;");
		setTimeout(function() {
			show.setAttribute("style", "transition-duration: 0.3s; transform: scale(1); opacity: 1;")
		}, 200);
	}, 330);
}
function input_auditor(target) {
	function mistakes_animator(target, anim_id, reset) {
		let wrapper = document.getElementById(target + "_wrapper");
		if (anim_id == "input_fail" || anim_id == "input_fail_variant") {
			document.getElementById(target).value = ""
			if (target == "reostat_1_min") { reostat_1_min = 0 }
			else if (target == "reostat_1_max") { reostat_1_max = 0 }
			else if (target == "resistor_1") { resistor_1 = 0 }
			else if (target == "reostat_2_min") { reostat_2_min = 0 }
			else if (target == "reostat_2_max") { reostat_2_max = 0 }
			wrapper.classList.add(anim_id);
			setTimeout(function() {
				wrapper.classList.remove(anim_id)
			}, 700);
		}
		else if (anim_id == "input_warning") {
			wrapper.classList.add(anim_id)
			if (reset == true) {
				wrapper.classList.remove(anim_id)
				wrapper.classList.add("input_pass")
				setTimeout(function() {
					wrapper.classList.remove("input_pass")
				}, 1500);
			}
		}
	}
	function mistake_reporter(text, target, toHide, toShow) {
		document.getElementById(target).innerHTML = text
		screen_changer (toHide, toShow);
		ClassName_Arttribute("frame_utilites_input", "readonly", "", "set")
		switched_reostat_1 = true
		setTimeout(function() {
			screen_changer (toShow, toHide);
			ClassName_Arttribute("frame_utilites_input", "readonly", "", "remove")
		}, 3000);
	}
	function check() {
		if (target == "reostat_1_min" || target == "reostat_1_max") {
			if ((reostat_1_min >= reostat_1_max) || ((reostat_1_min * reostat_1_max) <= 0)) {
				mistakes_animator("reostat_1_min", "input_warning", false);
				mistakes_animator("reostat_1_max", "input_warning", false);
				if ((reostat_1_min >= reostat_1_max) && ((reostat_1_min * reostat_1_max) != 0)) {
					mistakes_animator(target, "input_fail", false);
					mistake_reporter("Rmin не может быть больше<br>или равно Rmax!", "reostat_1_mistake_bar", "reostat_1_header", "reostat_1_mistake_bar")
				}
				reostat_1_pass = false
			}
			else {
				mistakes_animator("reostat_1_min", "input_warning", true);
				mistakes_animator("reostat_1_max", "input_warning", true);
				reostat_1_pass = true
			}
		}
		else if (target == "reostat_2_min" || target == "reostat_2_max") {
			if ((reostat_2_min >= reostat_2_max) || ((reostat_2_min * reostat_2_max) <= 0)) {
				mistakes_animator("reostat_2_min", "input_warning", false);
				mistakes_animator("reostat_2_max", "input_warning", false);
				if ((reostat_2_min >= reostat_2_max) && ((reostat_2_min * reostat_2_max) != 0)) {
					mistakes_animator(target, "input_fail", false);
					mistake_reporter("Rmin не может быть больше<br>или равно Rmax!", "reostat_2_mistake_bar", "reostat_2_header", "reostat_2_mistake_bar")
				}
				reostat_2_pass = false
			}
			else {
				mistakes_animator("reostat_2_min", "input_warning", true);
				mistakes_animator("reostat_2_max", "input_warning", true);
				reostat_2_pass = true
			}
		}
		else if (target == "resistor_1") {
			if (resistor_1 > 0) {
				mistakes_animator("resistor_1", "input_warning", true);
				resistor_1_pass = true
			}
		}
	}
	document.getElementById(target).value = document.getElementById(target).value.replace(",",".");
	let value = document.getElementById(target).value;
	if (!isNaN(parseFloat(value)) && isFinite(value)) {
		value = Number(document.getElementById(target).value)
		if (target == "reostat_1_min" || target == "reostat_1_max") {
			if (value <= 0) {
				mistake_reporter("Значение не может быть<br>меньше или равно нулю!", "reostat_1_mistake_bar", "reostat_1_header", "reostat_1_mistake_bar")
				mistakes_animator(target, "input_fail", false);
			}
			else {
				if (target == "reostat_1_min") { reostat_1_min = value }
				else if (target == "reostat_1_max") { reostat_1_max = value }
			}
		}
		else if (target == "reostat_2_min" || target == "reostat_2_max") {
			if (value <= 0) {
				mistake_reporter("Значение не может быть<br>меньше или равно нулю!", "reostat_2_mistake_bar", "reostat_2_header", "reostat_2_mistake_bar")
				mistakes_animator(target, "input_fail", false);
			}
			else {
				if (target == "reostat_2_min") { reostat_2_min = value }
				else if (target == "reostat_2_max") { reostat_2_max = value }
			}
		}
		else if (target == "resistor_1") {
			if (value <= 0) {
				mistakes_animator(target, "input_fail_variant", false);
				resistor_1_pass = false
			}
			else {
				if (target == "resistor_1") { resistor_1 = value }
			}
		}
	}
	else {
		if (target == "reostat_1_min" || target == "reostat_1_max") {
			mistake_reporter("Некорректный ввод!", "reostat_1_mistake_bar", "reostat_1_header", "reostat_1_mistake_bar");
			mistakes_animator(target, "input_fail", false);	
		}
		else if (target == "reostat_2_min" || target == "reostat_2_max") {
			mistake_reporter("Некорректный ввод!", "reostat_2_mistake_bar", "reostat_2_header", "reostat_2_mistake_bar");
			mistakes_animator(target, "input_fail", false);	
		}
		else if (target == "resistor_1") {
			mistakes_animator(target, "input_fail_variant", false);
		}	
	}
	check()
}
//
function AVmeter(U, I) {
	document.getElementById("U1").innerHTML = "U = " + U.toFixed(2) + " V"
	document.getElementById("I1").innerHTML = "I = " + I.toFixed(2) + " A"
	document.getElementById("info_U1").innerHTML = "U = " + U.toFixed(2) + " V"
	document.getElementById("info_I1").innerHTML = "I = " + I.toFixed(2) + " A"
}
function Calculate_1(E, R, r) {
	let U, I
	U = (E * R) / (R + r)
	I = U / (R + r)
	AVmeter(U, I)
	document.getElementById("info_R1").innerHTML = "R1 = " + R.toFixed(2) + " Om"
	arrow_update(U, "arrow_U1", 0, 12)
	arrow_update(I, "arrow_I1", 0, 6)
}
function Calculate_2(E, R1, R2, r) {
	let U, I
	U = (E * (R1 + R2)) / ((R1 + R2) + r)
	I = U / ((R1 + R2) + r)
	AVmeter(U, I)
	document.getElementById("info_R1").innerHTML = "R1 = " + R1.toFixed(2) + " Om"
	document.getElementById("info_R2").innerHTML = "R2 = " + R2.toFixed(2) + " Om"
	arrow_update(U, "arrow_U2", 0, 12)
	arrow_update(I, "arrow_I2", 0, 6)
}
function Calculate_3(E, R1, R2, r) {
	let U, I, R
	R = (R1 * R2) / (R1 + R2)
	U = (E * R) / (R + r)
	I = U / (R + r)
	AVmeter(U, I)
	document.getElementById("info_R1").innerHTML = "R1 = " + R1.toFixed(2) + " Om"
	document.getElementById("info_R2").innerHTML = "R2 = " + R2.toFixed(2) + " Om"
	arrow_update(U, "arrow_U3", 0, 12)
	arrow_update(I, "arrow_I3", 0, 6)
}
function arrow_update(value, target, min, max) {
	let step = 152 / (Math.abs(max) - Math.abs(min));
	document.getElementById(target).setAttribute("style", "transform: rotate(" + (284 + value * step) + "deg);")
	if (value * step > 175) {
		document.getElementById(target).setAttribute("style", "transform: rotate(" + (305 + max * step) + "deg);")
	}
}