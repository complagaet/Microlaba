lessonName = `${lessonName}/laba`, lessonNameL = lessonName.split("/"),
lessonLocation = [window.location.href, `${contents[lessonNameL[1]].headerCategory}: ${lessonLocation[1]}`];
let main = () => {
	let onload = 1,
	ontest = 0,
	onSideMenu = 0
	function getCookie(name) {
		let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	let list = window.location.search,
	parameters = new URLSearchParams(list),
	importUserdata = parameters.get("data");

	window.addEventListener("load", () => {
		document.getElementById("body").style.backgroundColor = "#eadcff"
		interface.menuEntryAdaptive()
		bobatron.scanner()
		cAud.start()
		init()
		if (importUserdata) {
			window.location.href = window.location.href.replace(/\/*/g, '')
		}
		else {
			setTimeout(() => {
				userdataControl.locationIssuesCheck()
			}, 1000)
		}	
	})

	let init = () => {
		window.addEventListener("resize", () => {
			interface.menuEntryAdaptive()
			bobatron.scanner()
		})

		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 0) { document.getElementById("header").style.zIndex = 2 }
			else { document.getElementById("header").style.zIndex = 0 }
			if (window.pageYOffset > 0 && onload == 1) { window.scrollTo(0, 0) }
		})

		document.getElementById("burger").onclick = () => {
			if (onSideMenu == 0) {
				for (let i of [document.getElementById("main_screen"), document.getElementById("side_menu")]) {
					i.style.transitionDuration = "0.3s"
				}
				interface.menuEntrySwitch("main_screen", "side_menu")
				document.getElementById("burger").classList.add("arrow_left_b")
				onSideMenu = 1
				document.getElementById("body").style.overflow = "overlay";
			}
			else {
				interface.menuEntrySwitch("side_menu", "main_screen")
				document.getElementById("burger").classList.remove("arrow_left_b")
				onSideMenu = 0
				document.getElementById("body").style.overflow = "hidden";
			}
		}

		document.getElementById("button_goback").onclick = () => {
			interface.redirect("../", ["menu", ""], "show")
		}

		document.getElementById("microlaba_header_icon").onclick = () => {
			interface.redirect("../../", ["menu", ""], "show")
		}

		document.getElementById("sbros_button").onclick = () => {
			labaHandler.sbros()
			labaHandler.labaSwitcher(0)
		}
	}

	let userdataControl = {
		write: (c) => {
			document.cookie = `u=${encodeURIComponent(JSON.stringify(userdata))}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`
			cAud.log(`write -> ${document.cookie}`)
			if (c == "stAnim") { userdataControl.alright("stAnim") }
		},
		locationIssuesCheck: () => {
			try {
				let content = `
					<div class="flex flex_alignitems_center flex_gap_10" style="width: 100%;">
						<div class="icon_warning bobatron" Bt-CM="0.5"></div>
						<h3>Внимание!</h3>
					</div>
				`
				let u = JSON.parse(getCookie("u"))
				cAud.log("locationIssuesCheck -> started")
				function check() { return u.profile.location[0] != "menu" && u.profile.location[0] != window.location.href }
				function check2() { return u.lessons[lessonNameL[0]][lessonNameL[1]].open == 0 }
				if (check()) {
					interface.horisScroll("microlaba_big_logo", "location_issues_wrapper", -100, 0)
					content += `
						<div class="flex flex_column" style="gap: 5px; width: 300px">
							<h4 style="width: 300px">Похоже, что вы не закрыли урок <span style="font-weight: bold">«${u.profile.location[1]}»</span>.</h4>
							<button class="bobatron button_go" Bt-CM="0.7" id="location_issues_goback" style="width: 100%;">Вернуться<div class="arrow_right_b"></div></button>
						</div>
						<div class="flex flex_column" style="gap: 5px; width: 300px">
							<h4 style="width: 300px">Не рекомендуется открывать несколько вкладок Микролабы одновременно.</h4>
							<button class="bobatron button_warning" Bt-CM="0.7" id="location_issues_ignore" style="width: 100%;">Проигнорировать<div class="arrow_right_b"></div></button>
						</div>
					`
					cAud.log("locationIssuesCheck -> location issues! (1)")
					document.getElementById("location_issues_wrapper").innerHTML = content					
					document.getElementById("location_issues_goback").onclick = () => {
						window.location = u.profile.location[0]
					}
					document.getElementById("location_issues_ignore").onclick = () => {
						document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
						interface.horisScroll("location_issues_wrapper", "microlaba_big_logo", -100, 0)
						userdata = u
						userdata.profile.location = lessonLocation
						userdataControl.write()
						setTimeout(() => { document.getElementById("location_issues_wrapper").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s") }, 410)
						setTimeout(() => { userdataControl.locationIssuesCheck() }, 1200)
					}
				}
				else if (check2()) {
					interface.horisScroll("microlaba_big_logo", "location_issues_wrapper", -100, 0)
					content += `
						<div class="flex flex_column" style="gap: 5px; width: 300px">
							<h4 style="width: 300px">Похоже, что урок <span style="font-weight: bold">«${lessonLocation[1]}»</span> пока вам недоступен.</h4>
							<button class="bobatron button_go" Bt-CM="0.7" id="location_issues_goback" style="width: 100%;">Главная страница<div class="arrow_right_b"></div></button>
						</div>
					`
					cAud.log("locationIssuesCheck -> location issues! (2)")
					document.getElementById("location_issues_wrapper").innerHTML = content
					document.getElementById("location_issues_goback").onclick = () => {
						document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
						interface.horisScroll("location_issues_wrapper", "microlaba_big_logo", -100, 0)
						userdata = u
						userdata.profile.location = ["menu", ""]
						userdataControl.write()
						window.location = "../../"
					}
				}
				else {
					cAud.log("locationIssuesCheck -> location ok!")
					userdata = u
					userdata.profile.location = lessonLocation
					userdataControl.write()
					userdataControl.read("stAnim")
				}
			}
			catch(e) { cAud.log(e) }
		},
		read: (c) => {
			try {
				let u = JSON.parse(getCookie("u"))
				userdata.profile = u.profile
				userdata.lessons = u.lessons
				if (userdata.lessons[lessonNameL[0]][lessonNameL[1]]) {
					try {
						cAud.log(`load -> success!`)
					}
					catch(e) {
						cAud.log(`load -> fail!`)
					}
				}
				else {
					cAud.log(`load -> no-data!`)
				}
				if (c == "stAnim") { userdataControl.alright("stAnim") }
			}
			catch(e) {
				cAud.log(e)
				//window.location.href = location.host;
			}
		},
		alright: (c) => {
			if (userdata.lessons[lessonNameL[0]][lessonNameL[1]].progress == 0) { userdataControl.lessonProgressing(5) } 
			document.getElementById("main_header").innerHTML = lessonLocation[1]
			document.getElementById("header_username").innerHTML = userdata.profile.username
			document.getElementById("header_ava").setAttribute("class", `${userdata.profile.ava} small_avatar`)
			let k = userdata.lessons[lessonNameL[0]], b = k[lessonNameL[1]]
			interface.lessonStatsBlockCreate(`lesson_stats`, lessonNameL[1], contents[lessonNameL[1]].headerCategory, contents[lessonNameL[1]].header, contents[lessonNameL[1]].color)
			interface.lessonStats(`main`, k.main.grade, k.main.progress, k.main.progressMax)
			interface.lessonStats(lessonNameL[1], b.grade, b.progress, b.progressMax)
			if (c == "stAnim") { setTimeout (() => { interface.loadscreen("startup") }, 0)}
			labaHandler.labaInit()
			bobatron.scanner()
			document.title = `Микролаба | ${contents[lessonNameL[1]].header}`
		},
		lessonProgressing: (score) => {
			let u = JSON.parse(getCookie("u"))
			userdata.lessons = u.lessons
			let k = userdata.lessons[lessonNameL[0]][lessonNameL[1]]
			userdata.lessons[lessonNameL[0]].main.progress += score
			k.progress += score
			cAud.log(`lessonProgressing -> scored +${score}`)			
			if (k.progress == k.progressMax) { 
				try { 
					userdata.lessons[lessonNameL[0]][lessList[lessList.indexOf(lessonNameL[1]) + 1]].open = 1 
					cAud.log(`lessonProgressing -> next lesson opened`)
				}
				catch(e) { cAud.log(`lessonProgressing -> no next lesson`) }
			}
			userdataControl.write()
		},
		gradeProgressing: (grade) => {
			let u = JSON.parse(getCookie("u"))
			userdata.lessons = u.lessons
			let k = userdata.lessons[lessonNameL[0]][lessonNameL[1]]
			k.grade = grade
			cAud.log(`gradeProgressing -> scored ${grade}`)
			userdataControl.write()
		}
	}

	let coldwater_temp = 0,
	coldwater_volume = 0,
	hotwater_temp = 0,
	hotwater_volume = 0,
	where = 0,
	coldwater_volume_mov = 1,
	hotwater_volume_mov = 1,
	volume = 0,
	timer_start = 0,
	temp_count = 0,
	water_temp,
	calculated_1 = 0,
	diff_1 = 0,
	step_1 = 0,
	time_1 = 0,
	time = 0,
	coldstep = 1.45,
	term_status = 0,
	plita_kw = 2500;

	let labaHandler = {
		labaInit: () => {
			if (userdata.lessons[lessonNameL[0]][lessonNameL[1]].data == 0) {
				//coldwater_temp, coldwater_volume, hotwater_temp, hotwater_volume, COMPLETED, volume, water_temp
				userdata.lessons[lessonNameL[0]][lessonNameL[1]].data = [0, 0, 0, 0, 0, 0, 0]
				userdataControl.write()
			}
			if (userdata.lessons[lessonNameL[0]][lessonNameL[1]].data[4] == 1) {
				let data = userdata.lessons[lessonNameL[0]][lessonNameL[1]].data
				coldwater_temp = data[0]
				coldwater_volume = data[1]
				hotwater_temp = data[2]
				hotwater_volume = data[3]
				volume = data[5]
				water_temp = data[6]
				labaHandler.updater_level_of_liquid("menzurka_c_water", volume, 570, 20)
				labaHandler.updater_level_of_liquid("gradusnik_center_shkala_red", water_temp, 443, 4.3)
				let k = 0
				for (let i of ["input_coldwater_temp", "input_coldwater_volume", "input_hotwater_temp", "input_hotwater_volume"]) {
					document.getElementById(i).setAttribute("readonly", "")
					document.getElementById(i).value = data[k].toFixed(2)
					k++
				}
				let pokazPrib = `
				<div class="flex flex_column" style="gap: 5px">
					<h4>Показания приборов</h3>
					<div class="flex flex_gap_10">
						<div class="frame_output_probirka bobatron" Bt-CM="0.7">
							<p id="output_water_volume">V = ${volume.toFixed(2)} L</p>
						</div>
						<div class="frame_output_termometer bobatron" Bt-CM="0.7">
							<p id="output_water_temp">t = ${water_temp.toFixed(2)} °C</p>
						</div>
					</div>
				</div>
				`
				document.getElementById("lessonStatsBlockCreate").innerHTML += pokazPrib
				labaHandler.labaRender(1)
			}
			else {
				let data = userdata.lessons[lessonNameL[0]][lessonNameL[1]].data
				labaHandler.menzurka_movement("menzurka_l")
				labaHandler.menzurka_movement("menzurka_r")
				labaHandler.menzurka_movement_touch("menzurka_l")
				labaHandler.menzurka_movement_touch("menzurka_r")
				for (let i of ["input_hotwater_volume", "input_hotwater_temp", "input_coldwater_volume", "input_coldwater_temp"]) {
					document.getElementById(i).onchange = () => { labaHandler.input_values(i) }
				}
				labaHandler.labaRender(where)
				labaHandler.calculate()
				labaHandler.boil_water()
				document.getElementById("play_button").onclick = function() {
					if (timer_start == 0 || timer_start == 2) {
						timer_start = 1
					}
					else if (timer_start == 1) {
						timer_start = 2
					}
				}
				labaHandler.labaDashboard()
			}
		},
		labaRender: (loc) => {
			if (loc == 0) { 
				document.getElementById("save_screen").style.display = "none"
				document.getElementById("menzurki").style.display = "none"
				document.getElementById("laba_input_screen").style.display = "flex"
				labaHandler.labaHeader("Ввод данных")
			}
			else if (loc == 1) { 
				document.getElementById("save_screen").style.display = "none"
				document.getElementById("laba_input_screen").style.display = "none"
				document.getElementById("menzurki").style.display = "flex" 
				labaHandler.labaHeader("Лабораторная работа")
				document.getElementById("output_hotwater_volume_wrapper").children[0].innerHTML = `${hotwater_volume.toFixed(0)} L`
				document.getElementById("output_hotwater_temp_wrapper").children[0].innerHTML = `${hotwater_temp.toFixed(0)} °C`
				document.getElementById("output_coldwater_volume_wrapper").children[0].innerHTML = `${coldwater_volume.toFixed(0)} L`
				document.getElementById("output_coldwater_temp_wrapper").children[0].innerHTML = `${coldwater_temp.toFixed(0)} °C`
			}
			else if (loc == 2) {
				document.getElementById("menzurki").style.display = "none"
				document.getElementById("laba_input_screen").style.display = "none"
				document.getElementById("save_screen").style.display = "flex" 
				labaHandler.labaHeader("Сохранение результатов")
				document.getElementById("save_button").onclick = () => {
					//coldwater_temp, coldwater_volume, hotwater_temp, hotwater_volume, COMPLETED, volume, water_temp
					userdata.lessons[lessonNameL[0]][lessonNameL[1]].data = [coldwater_temp, coldwater_volume, hotwater_temp, hotwater_volume, 1, volume, water_temp]
					userdataControl.write()
					interface.lessonComplete()
				}
			}
			console.log(loc)
			labaHandler.labaNavigator(loc)
			bobatron.scanner()
			setTimeout(() => { document.getElementById("laba_content").style.height = `${document.getElementsByClassName("menu_container")[0].offsetHeight - 170}px` }, 10)
		},
		labaHeader: (msg) => {
			let header = document.getElementById("laba_window_header")
			header.innerHTML = `<h4>${msg}</h4>`
		},
		labaNavigator: (loc) => {
			let content
			content = `<div class="flex flex_gap_10" style="width: 100%; justify-content: space-between">
				<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="test_navigator_go_back" style="width: fit-content; justify-content: flex-start"><div class="arrow_left_b"></div></button>
				<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="test_navigator_end" style="width: fit-content">Завершить</button>
				<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="test_navigator_go_next" style="width: fit-content"><div class="arrow_right_b"></div></button>
			</div>`
			document.getElementById("laba_navigator").innerHTML = content
			if (loc > 0) { document.getElementById("test_navigator_go_back").onclick = () => { labaHandler.labaSwitcher(loc - 1) } }
			else { 
				document.getElementById("test_navigator_go_back").style.opacity = 0 
				document.getElementById("test_navigator_go_back").style.pointerEvents = "none"
			}
			if (loc == 0) { document.getElementById("test_navigator_go_next").onclick = () => { labaHandler.labaSwitcher(loc + 1) } }
			else {
				document.getElementById("test_navigator_go_next").style.opacity = 0 
				document.getElementById("test_navigator_go_next").style.pointerEvents = "none"
			}
			if (userdata.lessons[lessonNameL[0]][lessonNameL[1]].data[4] == 0) {
				document.getElementById("test_navigator_end").onclick = () => { labaHandler.labaSwitcher(2) }
				document.getElementById("test_navigator_end").style.opacity = 0 
				document.getElementById("test_navigator_end").style.pointerEvents = "none"
			}
			else {
				document.getElementById("test_navigator_end").onclick = () => { interface.lessonComplete() }
				document.getElementById("test_navigator_end").style.opacity = 1
				document.getElementById("test_navigator_end").style.pointerEvents = ""
			}
		},
		labaSwitcher: (to) => {
			where = to
			userdataControl.write()
			document.getElementById("laba_content").style.transitionDuration = "0.4s"
			document.getElementById("laba_content").style.transform = "translateY(30px)"
			document.getElementById("laba_content").style.opacity = "0"
			setTimeout(() => {
				labaHandler.labaRender(to)
				document.getElementById("laba_content").style.transform = ""
				document.getElementById("laba_content").style.opacity = ""
				setTimeout(() => { document.getElementById("laba_content").style.transitionDuration = "0s"}, 410)
			}, 400) 
		},
		labaDashboard: () => {
			let content = `
			<div class="flex flex_column" style="gap: 5px">
				<h4>Электроплитка</h3>
				<div class="flex flex_gap_10">
					<div class="frame_plitka bobatron" Bt-CM="0.7"></div>
					<div class="frame_small_clock bobatron" Bt-CM="0.7">
						<div class="clock_face">
							<div class="clock_arrows">
								<div class="clock_arrow_minutes" id="clock_arrow_minutes" style="transform: rotate(0deg)"></div>
								<div class="clock_arrow_hours" id="clock_arrow_hours" style="transform: rotate(0deg)"></div>
								<div class="clock_arrow_seconds" id="clock_arrow_seconds" style="transform: rotate(0deg)"></div>
							</div>
						</div>
					</div>
					<div class="frame_small_clock bobatron" Bt-CM="0.7">
						<div id="timer_value" class="frame_clocktimer_value">0 S</div>
					</div>
				</div>
			</div>
			<div class="flex flex_column" style="gap: 5px">
				<h4>Смешивание воды</h3>
				<div class="flex flex_gap_10">
					<div class="frame_water_mixing bobatron" Bt-CM="0.7"></div>
					<div class="frame_small_clock bobatron" Bt-CM="0.7">
						<div class="clock_face">
							<div class="clock_arrows">
								<div class="clock_arrow_minutes" id="clock_arrow_minutes_1" style="transform: rotate(0deg)"></div>
								<div class="clock_arrow_hours" id="clock_arrow_hours_1" style="transform: rotate(0deg)"></div>
								<div class="clock_arrow_seconds" id="clock_arrow_seconds_1" style="transform: rotate(0deg)"></div>
							</div>
						</div>
					</div>
					<div class="frame_small_clock bobatron" Bt-CM="0.7">
						<div id="timer_value_1" class="frame_clocktimer_value">0 S</div>
					</div>
				</div>
			</div>
			<div class="flex flex_column" style="gap: 5px">
				<h4>Показания приборов</h3>
				<div class="flex flex_gap_10">
					<div class="frame_output_probirka bobatron" Bt-CM="0.7">
						<p id="output_water_volume">V = 0.00 L</p>
					</div>
					<div class="frame_output_termometer bobatron" Bt-CM="0.7">
						<p id="output_water_temp">t = 0.00 °C</p>
					</div>
				</div>
			</div>
			`
			document.getElementById("lessonStatsBlockCreate").innerHTML += content
		},
		sbros() {
			coldwater_temp = 0
			coldwater_volume = 0
			hotwater_temp = 0
			hotwater_volume = 0
			where = 0
			coldwater_volume_mov = 1
			hotwater_volume_mov = 1
			volume = 0
			timer_start = 0
			temp_count = 0
			water_temp
			calculated_1 = 0
			diff_1 = 0
			step_1 = 0
			time_1 = 0
			time = 0
			coldstep = 1.45
			term_status = 0
			plita_kw = 2500
			labaHandler.timer(time, "")
			labaHandler.timer(time_1, "_1")
			document.getElementById("timer_value").innerHTML = time_1 + " S"
			labaHandler.clockplay_button(0, 1)
			labaHandler.updater_level_of_liquid("term_cold", 0, 358, 3.53)
			labaHandler.updater_level_of_liquid("term_hot", 0, 358, 3.53)
			labaHandler.updater_level_of_liquid("gradusnik_center_shkala_red", 0, 443, 4.3)
			document.getElementById("output_water_temp").innerHTML = "t = 0.00 °C";
			document.getElementById("output_water_volume").innerHTML = "V = 0.00 L";
			labaHandler.updater_level_of_liquid("menzurka_l_water", 0, 470, 40)
			labaHandler.updater_level_of_liquid("menzurka_r_water", 0, 470, 40)
			labaHandler.updater_level_of_liquid("menzurka_c_water", 0, 570, 20)
			document.getElementById("input_coldwater_temp").value = "";
			document.getElementById("input_coldwater_temp").removeAttribute("readonly")
			document.getElementById("input_hotwater_temp").value = "";
			document.getElementById("input_hotwater_temp").removeAttribute("readonly")
			document.getElementById("input_coldwater_volume").value = "";
			document.getElementById("input_coldwater_volume").removeAttribute("readonly")
			document.getElementById("input_hotwater_volume").value = "";
			document.getElementById("input_hotwater_volume").removeAttribute("readonly")
		},
		timer(s, pripiska) {
			document.getElementById("clock_arrow_seconds" + pripiska).setAttribute("style", "transform: rotate(" + (s * 360/60) + "deg)")
			document.getElementById("clock_arrow_minutes" + pripiska).setAttribute("style", "transform: rotate(" + (s * 360/3600) + "deg)")
			document.getElementById("clock_arrow_hours" + pripiska).setAttribute("style", "transform: rotate(" + (s / 3600 * 360/12) + "deg)")
			document.getElementById("timer_value" + pripiska).innerHTML = s + " S"
		},
		updater_level_of_liquid(target, value, start_pos, step) {
			document.getElementById(target).style.clipPath = `inset(${start_pos - value * step}px 0px 0px 0px)`
		},
		water_volume_update_big(id, status) {
			volume += status
			labaHandler.updater_level_of_liquid(id, volume, 570, 20)
			console.log("V = " + volume.toFixed(2) + " L")
		},
		term_update_big(id, status) {
			if (temp_count == 1) {
				labaHandler.updater_level_of_liquid("gradusnik_center_shkala_red", status, 443, 4.3)
				console.log("t = " + status.toFixed(2) + " °C");
				water_temp = status
			}
			else {
			}
		},
		clockplay_button(status, block) {
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
		},
		boil_water() {
			let step, time_to_boil = 0
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
					}
					else if (hotwater_volume_mov == 0) {
						timer_start = 3
					}
					else {
						labaHandler.clockplay_button(1, 0)
					}
					if (timer_start == 1) {
						if (time != time_to_boil) {
							time += 1
							labaHandler.timer(time, "");
							hotwater_temp += step;
							document.getElementById("output_hotwater_temp_wrapper").children[0].innerHTML = `${hotwater_temp.toFixed(0)} °C`
							document.getElementById("input_hotwater_temp").value = hotwater_temp.toFixed(1)
							document.getElementById("input_hotwater_temp").setAttribute("readonly", "")
							document.getElementById("input_hotwater_volume").setAttribute("readonly", "")
							document.getElementById("term_hot").style.transitionDuration = "0s"
							labaHandler.updater_level_of_liquid("term_hot", hotwater_temp, 358, 3.53)
							labaHandler.clockplay_button(2, 0)
						}
						else if (time == time_to_boil) {
							timer_start = 3
							labaHandler.timer(time, "");
							document.getElementById("term_hot").style.transitionDuration = "0.4s"
						}
					}
					else if (timer_start == 0) {
						time = 0
						labaHandler.timer(time, "")
						document.getElementById("term_hot").style.transitionDuration = "0.4s"
					}
					else if (timer_start == 2){
						document.getElementById("term_hot").style.transitionDuration = "0.4s"
						labaHandler.updater_level_of_liquid("term_hot", hotwater_temp, 358, 3.53)
						labaHandler.timer(time, "")
						labaHandler.clockplay_button(1, 0)
					}
					else if (timer_start == 3){
						document.getElementById("term_hot").style.transitionDuration = "0.4s"
						labaHandler.updater_level_of_liquid("term_hot", hotwater_temp, 358, 3.53)
						labaHandler.timer(time, "")
						labaHandler.clockplay_button(4, 1)
					}
				}
			}, 10)
		},
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
						else {
							term_status = "stop"
						}
						calculated_1 = 1
					}
					else {
						if (term_status == "reduction") {
							time_1 += 1
							water_temp_1 -= step_1
							document.getElementById("output_water_temp").innerHTML = `t = ${water_temp_1.toFixed(2)} °C`
							labaHandler.updater_level_of_liquid("gradusnik_center_shkala_red", water_temp_1, 443, 4.3)
							labaHandler.timer(time_1, "_1")
							if (water_temp > water_temp_1) {
								term_status = "stop"
							}

						}
						else if (term_status == "increase") {
							time_1 += 1
							water_temp_1 += step_1
							document.getElementById("output_water_temp").innerHTML = `t = ${water_temp_1.toFixed(2)} °C`
							labaHandler.updater_level_of_liquid("gradusnik_center_shkala_red", water_temp_1, 443, 4.3)
							labaHandler.timer(time_1, "_1")
							if (water_temp < water_temp_1) {
								term_status = "stop"
							}
						}
						else if (term_status == "stop") {
							document.getElementById("output_water_temp").innerHTML = `t = ${water_temp_1.toFixed(2)} °C`
							labaHandler.updater_level_of_liquid("gradusnik_center_shkala_red", water_temp, 443, 4.3)
							labaHandler.timer(time_1, "_1")
							if (where != 2) {
								document.getElementById("test_navigator_end").style.opacity = 1
								document.getElementById("test_navigator_end").style.pointerEvents = ""
							}
							else {
								document.getElementById("test_navigator_end").style.opacity = 0
								document.getElementById("test_navigator_end").style.pointerEvents = ""
							}
						}
					}
				}
			}, 100)
		},
		input_animation(id, status) {
			function incorrect(id, type) {
				let target = document.getElementById(id)
				if (type == 1) {
					target.value = ""
					target.classList.add("frame_data_values_wrapper_incorrect_1")
					setTimeout(function() {
						target.classList.remove("frame_data_values_wrapper_incorrect_1")
					}, 600)	
				}
				else if (type == 2) {
					target.classList.add("frame_data_values_wrapper_incorrect_2")
					setTimeout(function() {
						target.classList.remove("frame_data_values_wrapper_incorrect_2")
					}, 600)
				}
				else if (type == 3) {
					target.classList.add("frame_data_values_wrapper_lookatme")
					setTimeout(function() {
						target.classList.remove("frame_data_values_wrapper_lookatme")
					}, 600)
				}
				else if (type == "pass") {
					target.classList.add("input_pass")
					setTimeout(function() {
						target.classList.remove("input_pass")
					}, 1600)
				}
			}
			incorrect(id, status)
		},
		input_values(id) {
			function level_update(target, value) {
				if (target.includes("volume")) {
					if (target.includes("cold")) {
						labaHandler.updater_level_of_liquid("menzurka_r_water", value, 470, 40)
						coldwater_volume = value
					}
					else {
						labaHandler.updater_level_of_liquid("menzurka_l_water", value, 470, 40)
						hotwater_volume = value
						calculated = 0
					}
				}
				else {
					if (target.includes("cold")) {
						labaHandler.updater_level_of_liquid("term_cold", value, 358, 3.53)
						coldwater_temp = value
					}
					else {
						labaHandler.updater_level_of_liquid("term_hot", value, 358, 3.53)
						hotwater_temp = value
						calculated = 0
					}
				}
				document.getElementById(target).value = value
			}
			document.getElementById(id).value = document.getElementById(id).value.replace(",",".")
			let value = document.getElementById(id).value
			if (!isNaN(parseFloat(value)) && isFinite(value)) {
				//new Interface("", 1).sbros_appear();
				value = Number(document.getElementById(id).value)
				if (id.includes("volume")) {
					if (value <= 10 && value > 0) {
						level_update(id, value)
						labaHandler.input_animation(id, "pass");
					}
					else if (value > 10) {
						document.getElementById(id).value = 10;
						level_update(id, 10)
						labaHandler.input_animation(id, 2);
					}
					else {
						labaHandler.input_animation(id, 1);
					}
				}
				else {
					if (value <= 100 && value > 0) {
						level_update(id, value)
						labaHandler.input_animation(id, "pass")
					}
					else if (value > 100) {
						document.getElementById(id).value = 100;
						level_update(id, 100)
						labaHandler.input_animation(id, 2)
					}
					else {
						labaHandler.input_animation(id, 1)
					}
				}
			}
			else {
				labaHandler.input_animation(id, 1);
			}
		},
		water_volume_update_big(id, status) {
			volume += status
			labaHandler.updater_level_of_liquid(id, volume, 570, 20)
			document.getElementById("output_water_volume").innerHTML = `V = ${volume.toFixed(2)} L`
		},
		term_update_big(id, status) {
			if (temp_count == 1) {
				water_temp = status
				labaHandler.updater_level_of_liquid("gradusnik_center_shkala_red", status, 443, 4.3)
				document.getElementById("output_water_temp").innerHTML = `t = ${status.toFixed(2)} °C`
			}
			else {
			}
		},
		menzurka_overlay(idd, active) {
		 	if (idd == "menzurka_l" && active == 1) {
				if (hotwater_volume_mov == 1 && hotwater_volume != 0 && hotwater_temp != 0) {
					hotwater_volume_mov = 0
					document.getElementById("input_hotwater_volume").setAttribute("readonly", "")
					document.getElementById("input_hotwater_temp").setAttribute("readonly", "")
					labaHandler.water_volume_update_big("menzurka_c_water", hotwater_volume)
					labaHandler.updater_level_of_liquid("menzurka_l_water", 0, 470, 40)
					timer_start = 3
					temp_count += 1
					labaHandler.term_update_big("", hotwater_temp)
				}
				if (hotwater_volume == 0) {
					labaHandler.input_animation("output_hotwater_volume_wrapper", 3)
				}
				if (hotwater_temp == 0) {
					labaHandler.input_animation("output_hotwater_temp_wrapper", 3)
				}
			}
			else if (idd == "menzurka_r" && active == 1) {
				if (coldwater_volume_mov == 1 && coldwater_volume != 0 && coldwater_temp != 0) {
					coldwater_volume_mov = 0
					document.getElementById("input_coldwater_volume").setAttribute("readonly", "")
					document.getElementById("input_coldwater_temp").setAttribute("readonly", "")
					labaHandler.water_volume_update_big("menzurka_c_water", coldwater_volume)
					labaHandler.updater_level_of_liquid("menzurka_r_water", 0, 470, 40)				
					temp_count += 1
					labaHandler.term_update_big("", coldwater_temp)
				}
				if (coldwater_volume == 0) {
					labaHandler.input_animation("output_coldwater_volume_wrapper", 3)
				}
				if (coldwater_temp == 0) {
					labaHandler.input_animation("output_coldwater_temp_wrapper", 3)
				}
			}
		},
		menzurka_movement(id) {
			let active
			dragElement(document.getElementById(id));
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
						elmnt.style.transform = "rotate(-15deg)"
					}
					else if (elmnt.id == "menzurka_l") {
						elmnt.style.transform = "rotate(15deg)"
					}
					document.getElementById("menzurka_c").onmousemove = function() { 
						labaHandler.menzurka_overlay(elmnt.id, active)
					}
				}
				function closeDragElement() {
					if (elmnt.id == "menzurka_r") {
						elmnt.style.top = ("auto");
						elmnt.style.left = ("auto");
						elmnt.style.transform = "rotate(0deg)"
					}
					else if (elmnt.id == "menzurka_l") {
						elmnt.style.top = ("auto");
						elmnt.style.left = ("auto");
						elmnt.style.transform = "rotate(0deg)"
					}
					active = 0
					document.onmouseup = null;
					document.onmousemove = null;
				}
			}
		},
		menzurka_movement_touch(id) {
			let active
			dragElement(document.getElementById(id));
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
						elmnt.style.transform = "rotate(-15deg)"
					}
					else if (elmnt.id == "menzurka_l") {
						elmnt.style.transform = "rotate(15deg)"
					}
					let menz_c = document.getElementById("menzurka_c").getBoundingClientRect(),
					menz_l = document.getElementById("menzurka_l").getBoundingClientRect(),
					menz_r = document.getElementById("menzurka_r").getBoundingClientRect();
					if (menz_c.right > (menz_r.left + 50) || menz_c.left < (menz_l.right - 50)) {
						labaHandler.menzurka_overlay(elmnt.id, active)
					}
				}
				function closeDragElement() {
					if (elmnt.id == "menzurka_r") {
						elmnt.style.top = ("auto");
						elmnt.style.left = ("auto");
						elmnt.style.transform = "rotate(0deg)"
					}
					else if (elmnt.id == "menzurka_l") {
						elmnt.style.top = ("auto");
						elmnt.style.left = ("auto");
						elmnt.style.transform = "rotate(0deg)"
					}
					active = 0
					document.ontouchend = null;
					document.ontouchmove = null;
				}
			}
		}
	}

	let interface = {
		lessonComplete: () => {
			interface.horisScroll("microlaba_big_logo", "lesson_complete_wrapper", -100, 0)
			let u = JSON.parse(getCookie("u"))
			userdata.lessons = u.lessons
			let k = userdata.lessons[lessonNameL[0]][lessonNameL[1]]
			userdataControl.lessonProgressing(k.progressMax - k.progress)
			if (k.grade == 0) { userdataControl.gradeProgressing(10) }
			interface.loadscreen("openExp")
			let grade = userdata.lessons[lessonNameL[0]][lessonNameL[1]].grade, grade_c, grade_cFg
			if (grade >= 0 && grade < 5) { grade_c = `#FF2B2B`; grade_cFg = `#fae4e4`}
			else if (grade > 4 && grade < 8) { grade_c = `#FFCE6A`; grade_cFg = `#fefcda` }
			else { grade_c = `#37DB27`; grade_cFg = `#e9ffe3`}
			content = `
			<h1>Урок пройден!</h1>
			<br>
			<div class="flex bobatron" style="justify-content: center; align-items: center; height: 200px; width: 300px; background-color: ${grade_cFg}">
				<div class="pie animate" style="--p: ${grade / 10 * 100}; --c: ${grade_c}">${grade}</div>
			</div>
			`
			let b
			if (lessList[lessList.indexOf(lessonNameL[1]) + 1]) {
				b = lessList[lessList.indexOf(lessonNameL[1]) + 1]
				content += `
				<div class="flex flex_gap_10" style="width: 100%">
					<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="lesson_complete_go_back" style="width: 100%; justify-content: flex-start"><div class="arrow_left_b"></div>Меню</button>
					<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="lesson_complete_go_next" style="width: 100%">Далее<div class="arrow_right_b"></div></button>
				</div>
				<div class="flex flex_alignitems_center flex_gap_10" style="width: 100%">
					<div class="bobatron" Bt-CM="0.5" style="min-height: 50px; min-width: 50px; background-size: contain; background-image: url(SVG/icon_${b}.svg); background-color: ${contents[b].color}"></div>
					<h4 style="width: 100%">Далее<br><span style="font-weight: bold">${contents[b].header}</span></h4>
				</div>
				`
			}
			else {
				content += `
				<div class="flex flex_column" style="gap: 5px; width: 100%">
					<button class="bobatron button_go_lessonComplete" Bt-CM="0.7" id="lesson_complete_go_back" style="width: 100%; justify-content: flex-start"><div class="arrow_left_b"></div>Меню</button>
					<h4 style="width: 100%">Поздравляем! Вы прошли этот курс.</h4>
				</div>
				`
			}
			document.getElementById("lesson_complete_wrapper").innerHTML = content
			document.getElementById("lesson_complete_go_back").onclick = () => { 
				document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
				interface.horisScroll("lesson_complete_wrapper", "microlaba_big_logo", -100, 0)
				setTimeout(() => {
					interface.redirect("../", ["menu", ""], "")
				}, 1000)
			}
			try {
				document.getElementById("lesson_complete_go_next").onclick = () => { 
					document.getElementById("microlaba_big_logo").setAttribute("style", "display: none; transform: translateX(100px); margin-top: 0px; opacity: 0; transition-duration: 0.5s")
					interface.horisScroll("lesson_complete_wrapper", "microlaba_big_logo", -100, 0)
					setTimeout(() => {
						let dest = window.location.href
						dest = dest.slice(0, dest.lastIndexOf(lessonNameL[1])) + b + "/"
						interface.redirect(dest, [dest, `${b}`], "")
					}, 1000)
				}
			}
			catch (e) {}
		},
		redirect: (location, cookieLocation, loadscreen) => {
			cookieLocation[1] = "loading"
			userdata.profile.location = cookieLocation
			userdataControl.write()
			let timeout = 0
			if (loadscreen == "show") { interface.loadscreen("openExp"); timeout = 2200 }
			setTimeout(() => {
				window.location = location;
				let timer = setInterval(() => { 
					if (JSON.parse(getCookie("u")).profile.location[1] != "loading") { 
						userdataControl.locationIssuesCheck()
						cAud.log("redirect -> loading")
						clearInterval(timer)
					} 
				}, 300)
			}, timeout)
		},
		menuEntryAdaptive: () => {
			let side_menu = document.getElementById("side_menu"),
			main_screen = document.getElementById("main_screen"),
			burger = document.getElementById("burger"),
			menuContainer = document.getElementsByClassName("menu_container")[0];
			setTimeout(() => { document.getElementById("laba_content").style.height = `${document.getElementsByClassName("menu_container")[0].offsetHeight - 170}px` }, 10)
			if (window.innerWidth < 860) {
				for (let i of document.getElementsByClassName("menu_entry")) {
					i.style.width = "100%"
					i.style.maxWidth = "100%"
				}
				if (onSideMenu == 0) {
					side_menu.style.height = "100%"
					side_menu.style.display = "none"
					side_menu.style.opacity = 0
					side_menu.style.transform = "translateY(30px)"
				}
				else {
					main_screen.style.height = "100%"
				}
				side_menu.style.width = "100%"
				side_menu.style.maxWidth = "100%"
				burger.style.marginLeft = "0px"
				burger.style.opacity = "1"
			}
			else {
				onSideMenu = 0
				document.getElementById("body").style.overflow = "hidden";
				for (let i of document.getElementsByClassName("menu_entry")) {
					i.style.width = "330px"
					i.style.maxWidth = "330px"
				}
				side_menu.style.width = "330px"
				side_menu.style.maxWidth = "330px"
				side_menu.style.height = window.innerHeight - 141 + "px"
				side_menu.style.display = "flex"
				side_menu.style.transform = "translateY(0)"
				side_menu.style.transitionDuration = "0s"
				side_menu.style.opacity = "1"

				main_screen.style.transitionDuration = "0s"
				main_screen.style.display = "flex"
				main_screen.style.transform = "translateX(0)"
				main_screen.style.opacity = "1"
				burger.style.marginLeft = "-46px"
				burger.style.opacity = "0"
				burger.classList.remove("arrow_left_b")
			}
			let heightWithoutHeader = window.innerHeight - document.getElementById("header").offsetHeight - 41
			main_screen.style.height = heightWithoutHeader + "px"
		},
		loadscreen(state) {
			let loaderWindow = document.getElementById("loader_window"), loaderWrapper = document.getElementById("loader_wrapper"),
			buttonsHeader = document.getElementById("buttons_header"), microlabaHeader = document.getElementById("microlaba_header")
			if (state == "startup") {
				document.getElementById("body").setAttribute("style", "transition-duration: 0.3s; background-color: #eadcff")
				buttonsHeader.style.transitionDelay = "0.1s"
				loaderWindow.style.transitionDuration = "1.5s"
				if (document.getElementById("header").offsetHeight > 100) { loaderWindow.style.transform = `translateY(-${loaderWindow.offsetHeight - 130}px)` }
				else { loaderWindow.style.transform = `translateY(-${loaderWindow.offsetHeight - 53}px)` }
				document.getElementById("microlaba_big_logo").style.transitionDelay = "0s"
				document.getElementById("microlaba_big_logo").style.opacity = "0"
				setTimeout(() => {
					loaderWindow.style.transitionDuration = "0s"
					loaderWrapper.style.display = "none"
					microlabaHeader.style.opacity = "1"
					buttonsHeader.style.opacity = "1"
					microlabaHeader.style.transform = "translateY(0px)"
					buttonsHeader.style.transform = "translateY(0px)"
					document.getElementsByClassName("menu_container")[0].style.opacity = "1"
					document.getElementsByClassName("menu_container")[0].style.transform = "translateY(0px)"
					onload = 0
				}, 1200)
				setTimeout(() => {
					document.getElementById("body").style.transitionDuration = "0s"
					document.getElementsByClassName("menu_container")[0].style.transitionDuration = "0s"
				}, 2500)
				setTimeout(() => {
					document.getElementsByClassName("header_white_plate_shadow")[0].style.opacity = "1"
				}, 850)
			}
			else if (state == "openExp") {
				microlabaHeader.style.opacity = "0"
				microlabaHeader.style.transform = ""
				buttonsHeader.style.transitionDelay = "0s"
				buttonsHeader.style.opacity = "0"
				buttonsHeader.style.transform = ""
				document.getElementsByClassName("menu_container")[0].style.transitionDuration = "0.4s"
				document.getElementsByClassName("menu_container")[0].style.opacity = "0"
				document.getElementsByClassName("menu_container")[0].style.transform = "translateY(30px)"
				document.getElementsByClassName("header_white_plate_shadow")[0].style.opacity = "0"
				setTimeout(() => {
					window.scrollTo(0, 0)
				}, 350)
				setTimeout(() => {
					loaderWrapper.style.display = "flex"
					bobatron.scanner()
					loaderWindow.style.transitionDuration = "1.5s"
				}, 400)
				setTimeout(() => {
					loaderWindow.style.transform = "translateY(0)"
					document.getElementById("microlaba_big_logo").style.transitionDelay = "0.5s"
					document.getElementById("microlaba_big_logo").style.opacity = "1"
					onload = 1
				}, 450)
				setTimeout(() => {
					document.getElementById("body").setAttribute("style", "transition-duration: 0.3s; background-color: #FFFFFF")
				}, 1200)
			}
		},
		lessonStatsBlockCreate(mainTarget, target, headerCategory, header, color) {
			try {
				cAud.log(`lessonStatsBlockCreate -> ${target} ${headerCategory} ${header} ${color}`)
				let content = `
				<div class="flex flex_gap_10 flex_column" id="lessonStatsBlockCreate">
					<div class="flex flex_gap_10">
						<div class="menu_entry_mini_inside_window_icon bobatron" Bt-CM="0.7" style="background-image: url(SVG/icon_${target}.svg); background-color: ${color}"></div>
						<div class="flex flex_column">
							<h4>${headerCategory}</h4>
							<h3>${header}</h3>
						</div>
					</div>
					<div class="progress bobatron" Bt-CM="0.7" style="margin: 0">
						<span style="z-index: 1" id="${target}_progress_percent">0%</span>
						<div class="progress_green" id="${target}_progress_green"></div>
					</div>
				</div>
				`
				document.getElementById(mainTarget).innerHTML = content
			}
			catch (e) { cAud.log(`lessonStatsBlockCreate -> ${target} FAIL!`) }
		},
		lessonStats: (target, grade, progress, progressMax) => {
			try {
				cAud.log(`lessonStats -> ${target} ${grade} ${progress} ${progressMax}`)
				let green = document.getElementById(`${target}_progress_green`), percent_c = document.getElementById(`${target}_progress_percent`),
				percent = Math.trunc(progress / progressMax * 100)
				green.style.width = `${percent}%`
				percent_c.innerHTML = `${percent}%`
				if (percent > 0) {
					percent_c.style.color = `#000000`
				}
			}
			catch (e) { cAud.log(`lessonStats -> ${target} FAIL!`) }
		},
		horisScroll: (from, to, pos1, pos2) => {
			document.getElementById(from).style.transform = `translateX(${pos1}px)`
			document.getElementById(from).style.opacity = "0"
			setTimeout(() => {
				document.getElementById(from).style.display = "none"
				document.getElementById(to).style.display = "flex"
			}, 350)
			setTimeout(() => {
				document.getElementById(to).style.transform = `translateX(${pos2}px)`
				document.getElementById(to).style.marginTop = "0"
				document.getElementById(to).style.opacity = "1"
				bobatron.scanner()
			}, 400)
		},
		menuEntrySwitch: (from, to) => {
			let a = document.getElementById(from), b = document.getElementById(to)
			a.style.transitionDuration = "0.4s"
			a.style.opacity = "0"
			a.style.transform = "translateY(30px)"
			setTimeout(() => {
				window.scrollTo(0, 0)
				a.style.display = "none"
				b.style.display = "flex"
				bobatron.scanner()
			}, 410)
			setTimeout(() => {
				b.style.transitionDuration = "0.4s"
				b.style.opacity = "1"
				b.style.transform = "translateY(0px)"
				document.getElementById("laba_content").style.height = `${document.getElementsByClassName("menu_container")[0].offsetHeight - 170}px`
				setTimeout(() => {
					document.getElementById("laba_content").style.height = `${document.getElementsByClassName("menu_container")[0].offsetHeight - 170}px` 
					bobatron.scanner()
				}, 1000)
			}, 415)
		},
	}
}
main()