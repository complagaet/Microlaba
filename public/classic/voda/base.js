let autopicker = 1,
coldwater_temp = 0,
coldwater_volume = 0,
hotwater_temp = 0,
hotwater_volume = 0,
water_temp = 0,
volume = 0,
coldwater_volume_mov = 1,
hotwater_volume_mov = 1, 
time = 0, 
timer_start = 0,
time_to_boil = 0,
step = 0,
calculated = 0,
calculated_1 = 0,
temp_count = 0,
plita_kw = 2500,
coldstep = 1.45,
diff_1 = 0,
step_1 = 0,
max = 0,
water_temp_1 = 0,
time_1 = 0,
term_status = "-"
const home = "../index.html"
let list = window.location.search,
parameters = new URLSearchParams(list),
backlink = parameters.get("backlink");
mobilebypass = parameters.get("mobilebypass");
//
function updater_level_of_liquid(target, value, start_pos, step) {
	$("#" + target).css({"clip-path": "inset(" + (start_pos - value * step) + "px 0px 0px 0px)"})
}
function timer(s, pripiska) {
	document.getElementById("clock_arrow_seconds" + pripiska).setAttribute("style", "transform: rotate(" + (s * 360/60) + "deg)")
	document.getElementById("clock_arrow_minutes" + pripiska).setAttribute("style", "transform: rotate(" + (s * 360/3600) + "deg)")
	document.getElementById("clock_arrow_hours" + pripiska).setAttribute("style", "transform: rotate(" + (s / 3600 * 360/12) + "deg)")
	document.getElementById("timer_value" + pripiska).innerHTML = s + " S"
	document.getElementById("clock_arrow_seconds" + pripiska + "_mobile").setAttribute("style", "transform: rotate(" + (s * 360/60) + "deg)")
	document.getElementById("clock_arrow_minutes" + pripiska + "_mobile").setAttribute("style", "transform: rotate(" + (s * 360/3600) + "deg)")
	document.getElementById("clock_arrow_hours" + pripiska + "_mobile").setAttribute("style", "transform: rotate(" + (s / 3600 * 360/12) + "deg)")
	document.getElementById("timer_value" + pripiska + "_mobile").innerHTML = s + " S"
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
function menzurka_overlay(idd, active) {
 	if (idd == "menzurka_l" && active == 1) {
		if (hotwater_volume_mov == 1 && hotwater_volume != 0 && hotwater_temp != 0) {
			document.getElementById("input_hotwater_volume").setAttribute("readonly", "")
			document.getElementById("input_hotwater_temp").setAttribute("readonly", "")
			new Experiment("menzurka_c_water", hotwater_volume).water_volume_update_big()
			updater_level_of_liquid("menzurka_l_water", 0, 470, 40)
			hotwater_volume_mov = 0
			timer_start = 3
			temp_count += 1
			new Experiment("", hotwater_temp).term_update_big()
		}
		else if (hotwater_volume == 0 && hotwater_temp == 0) {
			new Interface("input_hotwater_volume", 3).input()
			new Interface("input_hotwater_temp", 3).input()
		}
		else if (hotwater_volume == 0) {
			new Interface("input_hotwater_volume", 3).input()
		}
		else if (hotwater_temp == 0) {
			new Interface("input_hotwater_temp", 3).input()
		}
	}
	else if (idd == "menzurka_r" && active == 1) {
		if (coldwater_volume_mov == 1 && coldwater_volume != 0 && coldwater_temp != 0) {
			document.getElementById("input_coldwater_volume").setAttribute("readonly", "")
			document.getElementById("input_coldwater_temp").setAttribute("readonly", "")
			new Experiment("menzurka_c_water", coldwater_volume).water_volume_update_big()
			updater_level_of_liquid("menzurka_r_water", 0, 470, 40)
			coldwater_volume_mov = 0
			temp_count += 1
			new Experiment("", coldwater_temp).term_update_big()
		}
		else if (coldwater_volume == 0 && coldwater_temp == 0) {
			new Interface("input_coldwater_volume", 3).input()
			new Interface("input_coldwater_temp", 3).input()
		}
		else if (coldwater_volume == 0) {
			new Interface("input_coldwater_volume", 3).input()
		}
		else if (coldwater_temp == 0) {
			new Interface("input_coldwater_temp", 3).input()
		}
	}
}
class Interface {
	constructor(id, status) {
		this.status = status;
		this.id = id;
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
	menzurka_movement() {
		let active
		dragElement(document.getElementById((this.id)));
		function dragElement(elmnt) {
			var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
			if (document.getElementById(elmnt.id)) {
				document.getElementById(elmnt.id).onmousedown = dragMouseDown;
			} else {
				elmnt.onmousedown = dragMouseDown;
			}
			function dragMouseDown(e) {
				e = e || window.event;
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				document.onmousemove = elementDrag;
			}
			function elementDrag(e) {
				active = 1
				e = e || window.event;
				pos1 = pos3 - e.clientX;
				pos2 = pos4 - e.clientY;
				pos3 = e.clientX;
				pos4 = e.clientY;
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
				if (elmnt.id == "menzurka_r") {
					$("#" + elmnt.id).css({"transform": "rotate(-15deg)"})
				}
				else if (elmnt.id == "menzurka_l") {
					$("#" + elmnt.id).css({"transform": "rotate(15deg)"})
				}
				document.getElementById("menzurka_c").onmousemove = function() { 
					menzurka_overlay(elmnt.id, active)
				}
			}
			function closeDragElement() {
				if (elmnt.id == "menzurka_r") {
					elmnt.style.top = ("auto");
					elmnt.style.left = ("auto");
					$("#" + elmnt.id).css({"transform": "rotate(0deg)"})
				}
				else if (elmnt.id == "menzurka_l") {
					elmnt.style.top = ("auto");
					elmnt.style.left = ("auto");
					$("#" + elmnt.id).css({"transform": "rotate(0deg)"})
				}
				active = 0
				document.onmouseup = null;
				document.onmousemove = null;
			}
		}
	}
	menzurka_movement_touch() {
		let active
		dragElement(document.getElementById((this.id)));
		function dragElement(elmnt) {
			var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
			if (document.getElementById(elmnt.id)) {
				document.getElementById(elmnt.id).ontouchstart = dragMouseDown;
			} else {
				elmnt.ontouchstart = dragMouseDown;
			}
			function dragMouseDown(e) {
				e = e || window.event;
				pos3 = e.touches[0].clientX;
				pos4 = e.touches[0].clientY;
				document.ontouchend = closeDragElement;
				document.ontouchmove = elementDrag;
			}
			function elementDrag(e) {
				active = 1
				e = e || window.event;
				pos1 = pos3 - e.touches[0].clientX;
				pos2 = pos4 - e.touches[0].clientY;
				pos3 = e.touches[0].clientX;
				pos4 = e.touches[0].clientY;
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
				if (elmnt.id == "menzurka_r") {
					$("#" + elmnt.id).css({"transform": "rotate(-15deg)"})
				}
				else if (elmnt.id == "menzurka_l") {
					$("#" + elmnt.id).css({"transform": "rotate(15deg)"})
				}
				let menz_c = document.getElementById("menzurka_c").getBoundingClientRect(),
				menz_l = document.getElementById("menzurka_l").getBoundingClientRect(),
				menz_r = document.getElementById("menzurka_r").getBoundingClientRect();
				if (menz_c.right > (menz_r.left + 50) || menz_c.left < (menz_l.right - 50)) {
					menzurka_overlay(elmnt.id, active)
				}
			}
			function closeDragElement() {
				if (elmnt.id == "menzurka_r") {
					elmnt.style.top = ("auto");
					elmnt.style.left = ("auto");
					$("#" + elmnt.id).css({"transform": "rotate(0deg)"})
				}
				else if (elmnt.id == "menzurka_l") {
					elmnt.style.top = ("auto");
					elmnt.style.left = ("auto");
					$("#" + elmnt.id).css({"transform": "rotate(0deg)"})
				}
				active = 0
				document.ontouchend = null;
				document.ontouchmove = null;
			}
		}
	}
	input_values() {
		function level_update(target, value) {
			if (target.includes("volume")) {
				if (target.includes("cold")) {
					updater_level_of_liquid("menzurka_r_water", value, 470, 40)
					coldwater_volume = value
				}
				else {
					updater_level_of_liquid("menzurka_l_water", value, 470, 40)
					hotwater_volume = value
					calculated = 0
				}
			}
			else {
				if (target.includes("cold")) {
					updater_level_of_liquid("term_cold", value, 358, 3.53)
					coldwater_temp = value
				}
				else {
					updater_level_of_liquid("term_hot", value, 358, 3.53)
					hotwater_temp = value
					calculated = 0
				}
			}
			document.getElementById(target).value = value
		}
		document.getElementById(this.id).value = document.getElementById(this.id).value.replace(",",".")
		let value = document.getElementById(this.id).value
		if (!isNaN(parseFloat(value)) && isFinite(value)) {
			new Interface("", 1).sbros_appear();
			value = Number(document.getElementById(this.id).value)
			if (this.id.includes("volume")) {
				if (value <= 10 && value > 0) {
					level_update(this.id, value)
					new Interface(this.id, "pass").input();
				}
				else if (value > 10) {
					document.getElementById(this.id).value = 10;
					level_update(this.id, 10)
					new Interface(this.id, 2).input();
				}
				else {
					new Interface(this.id, 1).input();
				}
			}
			else if (this.id.includes("plitka")) {
				if (value <= 10000 && value > 0) {
					new Interface(this.id, "pass").input();
					plita_kw = value
					calculated = 0
				}
				else if (value > 10000) {
					document.getElementById(this.id).value = 10000;
					new Interface(this.id, 2).input();
					plita_kw = 10000
					calculated = 0
				}
				else {
					new Interface(this.id, 1).input();
					document.getElementById(this.id).value = plita_kw;
				}
			}
			else {
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
					new Interface(this.id, 1).input()
				}
			}
		}
		else {
			if (this.id.includes("plitka")) {
				new Interface(this.id, 1).input();
				document.getElementById(this.id).value = plita_kw;
			}
			else {
				new Interface(this.id, 1).input()
			}
		}
	}
	water_volume_update_big() {
		volume += this.status
		updater_level_of_liquid(this.id, volume, 570, 20)
		document.getElementById("output_water_volume").innerHTML = "V = " + volume.toFixed(2) + " L"
		document.getElementById("output_water_volume_mobile").innerHTML = "V = " + volume.toFixed(2) + " L"
	}
	term_update_big() {
		if (temp_count == 1) {
			updater_level_of_liquid("gradusnik_center_shkala_red", this.status, 443, 4.3)
			document.getElementById("output_water_temp").innerHTML = "t = " + this.status.toFixed(2) + " °C";
			document.getElementById("output_water_temp_mobile").innerHTML = "t = " + this.status.toFixed(2) + " °C";
			water_temp = this.status
		}
		else {
		}
	}
	sbros() {
		coldwater_temp = 0,
		coldwater_volume = 0,
		hotwater_temp = 0,
		hotwater_volume = 0,
		water_temp = 0,
		volume = 0,
		coldwater_volume_mov = 1,
		hotwater_volume_mov = 1, 
		time = 0, 
		timer_start = 0,
		time_to_boil = 0,
		step = 0,
		calculated = 0,
		calculated_1 = 0,
		temp_count = 0,
		diff_1 = 0,
		step_1 = 0,
		max = 0,
		water_temp_1 = 0,
		time_1 = 0,
		plita_kw = 2500
		term_status = "-"
		timer(time, "")
		timer(time_1, "_1")
		document.getElementById("timer_value").innerHTML = time_1 + " S"
		clockplay_button(0, 1)
		updater_level_of_liquid("term_cold", 0, 358, 3.53)
		updater_level_of_liquid("term_hot", 0, 358, 3.53)
		updater_level_of_liquid("gradusnik_center_shkala_red", 0, 443, 4.3)
		document.getElementById("output_water_temp").innerHTML = "t = 0.00 °C";
		document.getElementById("output_water_temp_mobile").innerHTML = "t = 0.00 °C";
		document.getElementById("output_water_volume").innerHTML = "V = 0.00 L";
		document.getElementById("output_water_volume_mobile").innerHTML = "V = 0.00 L";
		updater_level_of_liquid("menzurka_l_water", 0, 470, 40)
		updater_level_of_liquid("menzurka_r_water", 0, 470, 40)
		updater_level_of_liquid("menzurka_c_water", 0, 570, 20)
		document.getElementById("input_coldwater_temp").value = "";
		document.getElementById("input_coldwater_temp").removeAttribute("readonly")
		document.getElementById("input_hotwater_temp").value = "";
		document.getElementById("input_hotwater_temp").removeAttribute("readonly")
		document.getElementById("input_coldwater_volume").value = "";
		document.getElementById("input_coldwater_volume").removeAttribute("readonly")
		document.getElementById("input_hotwater_volume").value = "";
		document.getElementById("input_hotwater_volume").removeAttribute("readonly")
		document.getElementById("input_plitka_power").value = plita_kw;
		document.getElementById("input_plitka_power").removeAttribute("readonly")
	}
	boil_water() {
		setInterval(function() {
			if (hotwater_volume != 0 && hotwater_temp != 0) {
				if (calculated == 0) {
					time_to_boil = Math.round(4180 * hotwater_volume * (100 - hotwater_temp) / plita_kw);
					step = (100 - hotwater_temp) / time_to_boil;
					calculated = 1
				}
				if (hotwater_temp == 100) {
					timer_start = 3
					document.getElementById("input_hotwater_temp").setAttribute("readonly", "")
					document.getElementById("input_hotwater_volume").setAttribute("readonly", "")
				}
				else if (hotwater_volume_mov == 0) {
					timer_start = 3
				}
				else {
					clockplay_button(1, 0)
				}
				if (timer_start == 1) {
					if (time != time_to_boil) {
						time += 1
						timer(time, "");
						hotwater_temp += step;
						document.getElementById("input_hotwater_temp").value = hotwater_temp.toFixed(1)
						document.getElementById("input_hotwater_temp").setAttribute("readonly", "")
						document.getElementById("input_hotwater_volume").setAttribute("readonly", "")
						document.getElementById("input_plitka_power").setAttribute("readonly", "")
						$("#term_hot").css({"transition-duration": "0s"})
						updater_level_of_liquid("term_hot", hotwater_temp, 358, 3.53)
						clockplay_button(2, 0)
					}
					else if (time == time_to_boil) {
						timer_start = 3
						timer(time, "");
						$("#term_hot").css({"transition-duration": "0.4s"});
					}
				}
				else if (timer_start == 0) {
					time = 0
					timer(time, "")
					$("#term_hot").css({"transition-duration": "0.4s"});
				}
				else if (timer_start == 2){
					$("#term_hot").css({"transition-duration": "0.4s"})
					updater_level_of_liquid("term_hot", hotwater_temp, 358, 3.53)
					timer(time, "")
					clockplay_button(1, 0)
				}
				else if (timer_start == 3){
					$("#term_hot").css({"transition-duration": "0.4s"})
					updater_level_of_liquid("term_hot", hotwater_temp, 358, 3.53)
					document.getElementById("input_plitka_power").setAttribute("readonly", "")
					timer(time, "")
					clockplay_button(4, 1)
				}
			}
		}, 10)
	}
	calculate() {
		setInterval(function() {
			if (coldwater_volume_mov == 0 && hotwater_volume_mov == 0) {
				if (calculated_1 == 0) {
					water_temp_1 = water_temp 
					water_temp = (coldwater_temp * coldwater_volume + hotwater_temp * hotwater_volume) / (coldwater_volume + hotwater_volume);
					diff_1 = Math.abs(Math.max(hotwater_temp, coldwater_temp) - water_temp)
					step_1 = diff_1 / coldstep / water_temp
					if (water_temp < water_temp_1) {
						term_status = "reduction"
					}
					else if (water_temp > water_temp_1) {
						term_status = "increase"
					}
					calculated_1 = 1
				}
				else {
					if (term_status == "reduction") {
						time_1 += 1
						document.getElementById("timer_value").innerHTML = time_1 + " S"
						water_temp_1 -= step_1
						document.getElementById("output_water_temp").innerHTML = "t = " + water_temp_1.toFixed(2) + " °C";
						document.getElementById("output_water_temp_mobile").innerHTML = "t = " + water_temp_1.toFixed(2) + " °C";
						updater_level_of_liquid("gradusnik_center_shkala_red", water_temp_1, 443, 4.3)
						timer(time_1, "_1")
						if (water_temp > water_temp_1) {
							term_status = "stop"
						}

					}
					else if (term_status == "increase") {
						time_1 += 1
						document.getElementById("timer_value").innerHTML = time_1 + " S"
						water_temp_1 += step_1
						document.getElementById("output_water_temp").innerHTML = "t = " + water_temp_1.toFixed(2) + " °C";
						document.getElementById("output_water_temp_mobile").innerHTML = "t = " + water_temp_1.toFixed(2) + " °C";
						updater_level_of_liquid("gradusnik_center_shkala_red", water_temp_1, 443, 4.3)
						timer(time_1, "_1")
						if (water_temp < water_temp_1) {
							term_status = "stop"
						}
					}
					else if (term_status == "stop") {
						document.getElementById("timer_value").innerHTML = time_1 + " S"
						document.getElementById("output_water_temp").innerHTML = "t = " + water_temp.toFixed(2) + " °C";
						document.getElementById("output_water_temp_mobile").innerHTML = "t = " + water_temp_1.toFixed(2) + " °C";
						updater_level_of_liquid("gradusnik_center_shkala_red", water_temp, 443, 4.3)
						timer(time_1, "_1")
					}
				}
			}
		}, 100)
	}
}
function otladka() {
	document.getElementById("frame_otladka").setAttribute("style", "z-index: 6; position: absolute; display: flex; flex-direction: column; align-items: center; pointer-events: none; background-color: #c1deff;")
	setInterval(function() {
	document.getElementById("ppu").innerHTML = (coldstep + " / " + hotwater_temp.toFixed(2) + " / " + coldwater_temp.toFixed(2) + 
		" / temp = " + water_temp.toFixed(2) + " / diff = " + diff_1.toFixed(2) + " / temp_changing = "
		+ water_temp_1.toFixed(2) + " / time = " + time_1 + " / step = " + step_1);
	if (timer_start == 3) {
		document.getElementById("pu").style.color = "#FF0000"
	}
	else {
		document.getElementById("pu").style.color = "#000000"
	}
	if (term_status == "stop") {
		document.getElementById("ppu").style.color = "#FF0000"
	}
	else {
		document.getElementById("ppu").style.color = "#000000"
	}
	if (term_status == "stop") {
		document.getElementById("ppp").innerHTML = "completed"
	}
	else {
		document.getElementById("ppp").innerHTML = term_status
	}
	document.getElementById("pu").innerHTML = (plita_kw + " / " + time_to_boil + " / " + time + " / " + step + " / " + timer_start)
	}, 1)
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
function onstart() {
	new Experiment("", "").calculate();
	new Interface("switcher_autopicker", autopicker).switcher();
	new Experiment("menzurka_r", 0).menzurka_movement_touch();
	new Experiment("menzurka_l", 0).menzurka_movement_touch();
	new Experiment("menzurka_r", 0).menzurka_movement();
	new Experiment("menzurka_l", 0).menzurka_movement();
	new Experiment("", "").boil_water();
	$("input").change(function() {
		new Experiment(this.id, "").input_values();
	})
	$("#sbros").click(function() {
		new Experiment("", "").sbros()
		new Interface("", 0).sbros_appear()
	})
	document.getElementById("mobile_button_sbros").onclick = () => {
		new Experiment("", "").sbros()
		new Interface("", 0).sbros_appear()
	}
	$("#switcher_autopicker").click(function() {
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
	})
	document.getElementById("play_button").onclick = function() {
		if (timer_start == 0 || timer_start == 2) {
			timer_start = 1
		}
		else if (timer_start == 1) {
			timer_start = 2
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
	document.getElementById("microlab_logo").onclick = function() {
		redirect(home, "#FFFFFF")
	}
	document.getElementById("microlab_logo_m").onclick = function() {
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
})