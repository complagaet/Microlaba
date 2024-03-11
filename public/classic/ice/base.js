let ice_temp = 0,
ice_mass = 0,
water_temp = 0,
water_volume = 0,
autopicker = 1,
calculated = 0,
time = 0,
exp_time = 0,
temp_step = 0,
water_step = 0,
timer_start = 0,
exp_water_temp = 0,
ice_step = 0,
on_workplace = 0,
checker_to_start = [0, 0, 0, 0];
//
const home = "../../"
let list = window.location.search,
parameters = new URLSearchParams(list),
backlink = parameters.get("backlink");
mobilebypass = parameters.get("mobilebypass");

function timer_reveal(status) {
	if (status == 0) {
		document.getElementById("timer_1").setAttribute("style", "translate: 370px; transition-delay: 0.1s")
		document.getElementById("timer_2").setAttribute("style", "translate: 400px; transition-delay: 0.05s")
		document.getElementById("timer_3").setAttribute("style", "translate: 430px; transition-delay: 0s")
		document.getElementById("timer_label").setAttribute("style", "opacity: 0; transition-duration: 0.3s")
	}
	else {
		document.getElementById("timer_1").setAttribute("style", "translate: 0px; transition-delay: 0s")
		document.getElementById("timer_2").setAttribute("style", "translate: 0px; transition-delay: 0.05s")
		document.getElementById("timer_3").setAttribute("style", "translate: 0px; transition-delay: 0.1s")
		document.getElementById("timer_label").setAttribute("style", "opacity: 1; transition-duration: 0.3s")
	}
}
function updater_level_of_liquid(target, value, start_pos, step) {
	$("#" + target).css({"clip-path": "inset(" + (start_pos - value * step) + "px 0px 0px 0px)"})
}
function ice_scaler(target, arg) {
	document.getElementById(target).setAttribute("style", "scale: " + (arg * 0.5 + 0.1) + "; opacity: 1")
}
function ice_pos(target, water_volumee, ice_maass) {
	document.getElementById(target).setAttribute("style", "margin-bottom: " + (-98 + (ice_maass * 35) + water_volumee * 18) + "px; scale: " + (ice_maass * 0.5 + 0.1) + "; opacity: 1")
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
function timer(s) {
	for (let pripiska of ["", "_mobile"]) {
		document.getElementById("clock_arrow_seconds" + pripiska).setAttribute("style", "transform: rotate(" + (s * 360/60) + "deg)")
		document.getElementById("clock_arrow_minutes" + pripiska).setAttribute("style", "transform: rotate(" + (s * 360/3600) + "deg)")
		document.getElementById("clock_arrow_hours" + pripiska).setAttribute("style", "transform: rotate(" + (s / 3600 * 360/12) + "deg)")
		document.getElementById("timer_value" + pripiska).innerHTML = s + " S"
	}
}
function clockplay_button(status, block) {
	let znachok = document.getElementById("znachok"), play_button = document.getElementById("play_button") 
	if (status == 0) {
		znachok.classList.add("button_stop")
		znachok.classList.remove("button_pause", "button_play")
		play_button.classList.add("frame_clockplay_stopped")
		play_button.classList.remove("frame_clockplay_pause", "frame_clockplay_play")
	}
	else if (status == 1) {
		znachok.classList.add("button_play")
		znachok.classList.remove("button_pause", "button_stop")
		play_button.classList.add("frame_clockplay_play")
		play_button.classList.remove("frame_clockplay_pause", "frame_clockplay_stopped")
	}
	else if (status == 2) {
		znachok.classList.add("button_pause")
		znachok.classList.remove("button_play", "button_stop")
		play_button.classList.add("frame_clockplay_pause")
		play_button.classList.remove("frame_clockplay_play", "frame_clockplay_stopped")
	}
	else if (status == 4) {
		znachok.classList.add("button_stop")
		znachok.classList.remove("button_pause", "button_play")
		play_button.classList.add("frame_clockplay_play")
		play_button.classList.remove("frame_clockplay_pause", "frame_clockplay_stopped")
	}
	if (block == 1) {
		play_button.classList.add("pointer-events_none")
	}
	else {
		play_button.classList.remove("pointer-events_none")
	}
}
function calculate() {
	let calorimeter_mass = 0.2, calorimeter_c = 100
	exp_water_temp = (1000*(water_volume/1000)*4200*water_temp-ice_mass*333000-ice_mass*2100*0-ice_mass*2100*ice_temp+ice_mass*4200*0)/((water_volume/1000)*4200*1000+calorimeter_c*calorimeter_mass+ice_mass*4200);
	temp_step = (water_temp - exp_water_temp) * water_volume / water_temp / 20
	exp_water_volume = water_volume + ice_mass * 0.917
	let a = water_temp, b = exp_water_temp;
	for (exp_time; a > b; exp_time++) {
		a = a - temp_step
	}
	water_step = (exp_water_volume - water_volume) / exp_time
	ice_step = ice_mass / exp_time 
	calculated = 1
}
class Interface {
	constructor(id, status) {
		this.id = id;
		this.status = status;
	}
	switcher() {
		let target = document.getElementById(this.id)
		if (this.status == 0) {
			target.classList.add("switcher_off")
			target.classList.remove("switcher_on")
		}
		else {
			target.classList.add("switcher_on")
			target.classList.remove("switcher_off")
		}
	}
	input() {
		function incorrect(id, type) {
			let target = document.getElementById(id), target_wrapper = document.getElementById(id + "_wrapper")
			if (type == 1) {
				target.value = ""
				target_wrapper.classList.add("frame_data_values_wrapper_incorrect_1")
				setTimeout(function() {
					target_wrapper.classList.remove("frame_data_values_wrapper_incorrect_1")
				}, 600)	
			}
			else if (type == 2) {
				target_wrapper.classList.add("frame_data_values_wrapper_incorrect_2")
				setTimeout(function() {
					target_wrapper.classList.remove("frame_data_values_wrapper_incorrect_2")
				}, 600)
			}
			else if (type == 3) {
				target_wrapper.classList.add("frame_data_values_wrapper_lookatme")
				setTimeout(function() {
					target_wrapper.classList.remove("frame_data_values_wrapper_lookatme")
				}, 600)
			}
			else if (type == "pass") {
				target_wrapper.classList.add("input_pass")
				setTimeout(function() {
					target_wrapper.classList.remove("input_pass")
				}, 1600)
			}
		}
		incorrect(this.id, this.status)
	}
	sbros_appear() {
		if (this.status == 0) {
			document.getElementById("sbros").setAttribute("disabled", "")
			document.getElementById("sbros").setAttribute("style", "pointer-events: none")
			document.getElementById("mobile_button_sbros").setAttribute("disabled", "")
			document.getElementById("mobile_button_sbros").setAttribute("style", "pointer-events: none")
		}
		else {
			document.getElementById("sbros").removeAttribute("disabled")
			document.getElementById("sbros").removeAttribute("style")
			document.getElementById("mobile_button_sbros").removeAttribute("disabled")
			document.getElementById("mobile_button_sbros").removeAttribute("style")
		}
	}
}
class Experiment {
	constructor(id, status) {
		this.id = id;
		this.status = status;
	}
	waiter_of_start() {
		if (checker_to_start[0] * checker_to_start[1] * checker_to_start[2] * checker_to_start[3] == 1) {
			document.getElementById("start_experiment").setAttribute("style", "")
			document.getElementById("start_experiment").removeAttribute("disabled", "")
			document.getElementById("start_experiment_mobile").setAttribute("style", "")
			document.getElementById("start_experiment_mobile").removeAttribute("disabled", "")
			ice_pos("led_workplace", water_volume, ice_mass)		
			new Interface("switcher_autopicker", autopicker).switcher();
		}
		else {
			document.getElementById("start_experiment").setAttribute("style", "cursor: not-allowed; pointer-events: none; background-color: #999999")
			document.getElementById("start_experiment").setAttribute("disabled", "")
			document.getElementById("start_experiment_mobile").setAttribute("disabled", "")
		}
	}
	input_values() {
		function level_update(target, value) {
			if (target.includes("water_volume")) {
				updater_level_of_liquid("menz_water_menu", value, 345, 20)
				updater_level_of_liquid("menz_water_workplace", value, 345, 20)
				document.getElementById("data_water_volume").innerHTML = value + " L"
				document.getElementById("output_water_volume").innerHTML = "V = " + value + " L"
				water_volume = value
				checker_to_start[0] = 1
			}
			else if (target.includes("water_temp")) {
				updater_level_of_liquid("gradusnik_water_shkala_red", value, 443, 4.3)
				updater_level_of_liquid("gradusnik_workplace_shkala_red", value, 443, 4.3)
				document.getElementById("data_water_temp").innerHTML = value + " °C"
				document.getElementById("output_water_temp").innerHTML = "t = " + value + " °C"
				water_temp = value
				checker_to_start[1] = 1
			}
			else if (target.includes("ice_mass")) {
				ice_scaler("led_menu", value)
				document.getElementById("data_ice_mass").innerHTML = value + " kg"
				ice_mass = value
				checker_to_start[2] = 1
			}
			else if (target.includes("ice_temp")) {
				updater_level_of_liquid("gradusnik_ice_shkala_red", 50 + value, 443, 4.3)
				document.getElementById("data_ice_temp").innerHTML = value + " °C"
				ice_temp = value
				checker_to_start[3] = 1
			}
			document.getElementById(target).value = value
		}
		document.getElementById(this.id).value = document.getElementById(this.id).value.replace(",",".")
		let value = document.getElementById(this.id).value
		if (!isNaN(parseFloat(value)) && isFinite(value)) {
			new Interface("", 1).sbros_appear();
			value = Number(document.getElementById(this.id).value)
			if (this.id.includes("water_volume")) {
				if (value <= 6 && value > 0) {
					level_update(this.id, value)
					new Interface(this.id, "pass").input();
				}
				else if (value > 6) {
					document.getElementById(this.id).value = 6;
					level_update(this.id, 6)
					new Interface(this.id, 2).input();
				}
				else {
					checker_to_start[0] = 0
					new Interface(this.id, 1).input();
				}
			}
			else if (this.id.includes("water_temp")) {
				if (value <= 100 && value > 0) {
					level_update(this.id, value)
					new Interface(this.id, "pass").input();
				}
				else if (value > 100) {
					document.getElementById(this.id).value = 100;
					level_update(this.id, 100)
					new Interface(this.id, 2).input();
				}
				else {
					checker_to_start[1] = 0
					new Interface(this.id, 1).input();
				}
			}
			else if (this.id.includes("ice_mass")) {
				if (value <= 2 && value > 0) {
					level_update(this.id, value)
					new Interface(this.id, "pass").input();
				}
				else if (value > 2) {
					document.getElementById(this.id).value = 2;
					level_update(this.id, 2)
					new Interface(this.id, 2).input();
				}
				else {
					checker_to_start[2] = 0
					new Interface(this.id, 1).input()
				}
			}
			else if (this.id.includes("ice_temp")) {
				if (value >= -50 && value < 0) {
					level_update(this.id, value)
					new Interface(this.id, "pass").input();
				}
				else if (value < -50) {
					document.getElementById(this.id).value = -50;
					level_update(this.id, -50)
					new Interface(this.id, 2).input();
				}
				else {
					checker_to_start[3] = 0
					new Interface(this.id, 1).input()
				}
			}
		}
		else {
			new Interface(this.id, 1).input()
		}
		new Experiment().waiter_of_start();
	}
	melting() {
		setInterval(function() {
			if (timer_start == 1) {
				if (time < exp_time) {
					clockplay_button(2, 0)
					time += 1
					timer(time)
					water_temp = water_temp - temp_step
					document.getElementById("output_water_temp").innerHTML = "t = " + water_temp.toFixed(2) + " °C";
					document.getElementById("output_water_temp_mobile").innerHTML = "t = " + water_temp.toFixed(2) + " °C";
					updater_level_of_liquid("gradusnik_workplace_shkala_red", water_temp, 443, 4.3)
					ice_mass = ice_mass - ice_step
					water_volume = water_volume + water_step
					document.getElementById("output_water_volume").innerHTML = "V = " + water_volume.toFixed(2) + " L";
					document.getElementById("output_water_volume_mobile").innerHTML = "V = " + water_volume.toFixed(2) + " L";
					updater_level_of_liquid("menz_water_workplace", water_volume, 345, 20)
					ice_pos("led_workplace", water_volume, ice_mass)
				}
				else {
					water_temp = exp_water_temp
					document.getElementById("output_water_temp").innerHTML = "t = " + water_temp.toFixed(2) + " °C";
					updater_level_of_liquid("gradusnik_workplace_shkala_red", water_temp, 443, 4.3)
					ice_mass = 0
					ice_pos("led_workplace", water_volume, -0.2)
					clockplay_button(4, 1)
				}
			}
			else if (timer_start == 2) {
				clockplay_button(1, 0)
			}
		}, 50)
	}
	sbros() {
		ice_temp = 0,
		ice_mass = 0,
		water_temp = 0,
		water_volume = 0,
		calculated = 0,
		time = 0,
		exp_time = 0,
		temp_step = 0,
		water_step = 0,
		timer_start = 0,
		exp_water_temp = 0,
		ice_step = 0,
		checker_to_start = [0, 0, 0, 0];
		if (on_workplace == 1) {
			screen_changer("workplace", "configuration_screen")
		}
		if (autopicker == 1 && on_workplace == 1) {
			screen_changer("frame_output_interface", "frame_output_big_icon")
		}
		autopicker = 1, on_workplace = 0;
		document.getElementById("input_water_volume").value = ""
		document.getElementById("input_water_temp").value = ""
		document.getElementById("input_ice_mass").value = ""
		document.getElementById("input_ice_temp").value = ""
		document.getElementById("output_water_volume").innerHTML = "V = 0 L"
		document.getElementById("output_water_temp").innerHTML = "t = 0 °C"
		document.getElementById("output_water_volume_mobile").innerHTML = "V = 0 L"
		document.getElementById("output_water_temp_mobile").innerHTML = "t = 0 °C"
		updater_level_of_liquid("gradusnik_water_shkala_red", 0, 443, 4.3)
		updater_level_of_liquid("gradusnik_ice_shkala_red", 50, 443, 4.3)
		updater_level_of_liquid("menz_water_menu", 0, 345, 20)
		document.getElementById("led_menu").setAttribute("style", "scale: 0.1; opacity: 0")
		document.getElementById("switcher_wrapper").setAttribute("style", "width: 0%")
		document.getElementById("start_experiment").setAttribute("style", "width: 100%; transition-duration: 1s; pointer-events: none ")
		document.getElementById("start_experiment").setAttribute("disabled", "")
		document.getElementById("start_experiment_mobile").setAttribute("disabled", "")
		document.getElementById("start_experiment_mobile").setAttribute("style", "cursor: not-allowed; pointer-events: none; background-color: #999999")
		new Experiment().waiter_of_start();
		document.getElementById("sbros").setAttribute("disabled", "")
		document.getElementById("sbros").setAttribute("style", "pointer-events: none")
		document.getElementById("mobile_button_sbros").setAttribute("disabled", "")
		document.getElementById("mobile_button_sbros").setAttribute("style", "pointer-events: none")
		timer(0)
		timer_reveal(0)
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
function redirect(link, color) {
	document.getElementById("loader_header").setAttribute("style", "position: absolute; z-index: 4")
	document.getElementById("mobile_header_microlaba_wrapper").setAttribute("style", "position: fixed; z-index: 4; display: none; top: 0")
	document.getElementById("loader").setAttribute("style", "transform: translateY(0); background-color:" + color)
	setTimeout(function() {
		window.location = link + list
	}, 1200)
}
setTimeout(function(){
	ClassName_Arttribute("loaderi", "style", "opacity: 1", "set")
}, 200)
function onstart() {
	for (let i = 0, obj = document.getElementsByClassName("frame_data_valuestext_input"); i < obj.length; i++) {
		obj[i].onchange = function() {
			new Experiment(obj[i].id, "").input_values();
		}
	}
	new Experiment().melting()
	document.getElementById("mobile_button_sbros").onclick = () => new Experiment().sbros();
	document.getElementById("sbros").onclick = () => new Experiment().sbros();
	document.getElementById("play_button").onclick = function() {
		if (timer_start == 0 || timer_start == 2) {
			timer_start = 1
		}
		else if (timer_start == 1) {
			timer_start = 2
		}
	}
	document.getElementById("switcher_autopicker").onclick = function() {
		let a = this.id
		document.getElementById(a).setAttribute("style", "pointer-events: none")
		setTimeout(function() {
			document.getElementById(a).removeAttribute("style")
		}, 600)
		if (autopicker == 0) {
			screen_changer("frame_output_big_icon", "frame_output_interface")
			new Interface("switcher_autopicker", autopicker = 1).switcher();
		}
		else {
			screen_changer("frame_output_interface", "frame_output_big_icon")
			new Interface("switcher_autopicker", autopicker = 0).switcher();
		}
	}
	let start_exper = () => {
		calculate()
		if (exp_water_temp < 0) {
			document.getElementById("mistake").setAttribute("style", "translate: 0 -65px")
			new Experiment().sbros()
			for (let i = 0, obj = document.getElementsByClassName("frame_data_valuestext_input"); i < obj.length; i++) {
				new Interface(obj[i].id, 1).input()
			}
			setTimeout(function() {
				document.getElementById("mistake").setAttribute("style", "translate: 0 0px; opacity: 1")
			}, 2500)
		}
		else {
			timer(0)
			timer_reveal(1)
			on_workplace = 1
			clockplay_button(1, 0)
			screen_changer("configuration_screen", "workplace")
			screen_changer("frame_output_big_icon", "frame_output_interface")
			document.getElementById("switcher_wrapper").setAttribute("style", "width: 100%")
			document.getElementById("start_experiment").setAttribute("style", "width: 0%; transition-duration: 0.8s; pointer-events: none")
			document.getElementById("start_experiment").setAttribute("disabled", "")
			document.getElementById("start_experiment_mobile").setAttribute("style", "pointer-events: none")
			document.getElementById("start_experiment_mobile").setAttribute("disabled", "")
		}
	}
	document.getElementById("start_experiment_mobile").onclick = () => start_exper();
	document.getElementById("start_experiment").onclick = () => start_exper();
}
window.addEventListener('load', function() {
	/*if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false || mobilebypass == "true") {
		document.getElementById("mobile").setAttribute("style", "display: none")
	}
	else {
		document.getElementById("loader_header").setAttribute("style", "display: none")
		document.getElementById("main").setAttribute("style", "display: none")
		document.getElementById("menu").setAttribute("style", "display: none")
		document.getElementById("body").setAttribute("style", "background-color: #000000;")
	}
	document.getElementById("mobile_button").onclick = function() {
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
	document.getElementById("mobile_header_microlaba_wrapper").onclick = function() {
		redirect(home, "#FFFFFF")
	}
	document.getElementById("microlab_logo").onclick = function() {
		redirect(home, "#FFFFFF")
	}
	document.getElementById("schoolnet").onclick = function() {
		redirect(backlink, "#FFFFFF")
	}
	onstart()
	function poexali() {	
		document.getElementById("loader").setAttribute("style", "transform: translateY(-100%)")
		document.getElementById("microlab_logo").setAttribute("style", "cursor: pointer")
		ClassName_Arttribute("loaderi", "style", "opacity: 0", "set")
		if (backlink != null && backlink != "") {
			document.getElementById("schoolnet").setAttribute("style", "margin-left: 0px")
		}
	}
	setTimeout(poexali, 1200)
});