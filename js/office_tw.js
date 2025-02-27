var office_area = document.querySelectorAll("[name=office_area]");
var office_count = null;
var area_group = document.querySelectorAll("[name=area_group]");
var screen = window.innerWidth <= 1024 ? "ph" : "pc";
window.onresize = function() {
	if (screen == "pc" && window.innerWidth <= 1024) {
		screen = "ph";
	} else if (screen == "ph" && window.innerWidth > 1024) {
		screen = "pc";
	}
};
for (let i = 0; i < office_area.length; i++) {
	const element = office_area[i];
	element.onclick = function() {
		if (screen !== "ph") return;
		if (office_count == null) {
			element.classList.add("on");
			office_count = i;
			getAreaGroup();
		} else if (office_count == i) {
			area_group[office_count].style.height = "";
			element.classList.remove("on");
			office_count = null;
		} else {
			area_group[office_count].style.height = "";
			office_area[office_count].classList.remove("on");
			element.classList.add("on");
			office_count = i;
			getAreaGroup();
		}
	};
}

function getAreaGroup() {
	var item = area_group[office_count].children;
	var setH = 0;
	for (let i = 0; i < item.length; i++) {
		setH += item[i].offsetHeight;
	}
	area_group[office_count].style.height = setH + "px";
}
