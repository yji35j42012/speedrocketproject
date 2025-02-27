var body = document.querySelector("body");
var lang = document.querySelector("#lang");
var lang_group = document.querySelector(".lang_group");
var lang_txt = document.querySelector("#lang_txt");
var lang_group_item = document.querySelectorAll(".lang_group > li");
var href = location.href;
function langHnadler() {
	lang.classList.contains("on")
		? lang.classList.remove("on")
		: lang.classList.add("on");
}
lang.addEventListener("click", langHnadler);

(function() {
	if (href.indexOf("zh-tw") !== -1) {
		lang_txt.innerHTML = "繁中";
	} else if (href.indexOf("zh-cn") !== -1) {
		lang_txt.innerHTML = "简中";
	} else if (href.indexOf("en-us") !== -1) {
		lang_txt.innerHTML = "EN";
		body.classList.add("en")
	}
})();

for (let i = 0; i < lang_group_item.length; i++) {
	const element = lang_group_item[i];
	element.onclick = function() {
		event.stopPropagation();
		lang_txt.innerHTML = element.innerHTML;
		lang.classList.remove("on");
		var changeLang = element.getAttribute("data-lang");
		var num = null;
		var newHref = "";
		if (href.indexOf(changeLang) == -1) {
			let hrefS = href.split("/");
			if (hrefS.indexOf("zh-tw") !== -1) {
				num = hrefS.indexOf("zh-tw");
			} else if (hrefS.indexOf("zh-cn") !== -1) {
				num = hrefS.indexOf("zh-cn");
			} else if (hrefS.indexOf("en-us") !== -1) {
				num = hrefS.indexOf("en-us");

			}

			hrefS.splice(num, 1, changeLang);

			for (let i = 0; i < hrefS.length; i++) {
				if (i == hrefS.length - 1) {
					newHref += hrefS[i];
				} else {
					newHref += hrefS[i] + "/";
				}
			}
			location.href = newHref;
		}
	};
}

// nav

var nav_btn = document.querySelector("#nav_btn");
var nav_box = document.querySelector("#nav_box");
nav_btn.onclick = function() {
	nav_box.classList.contains("on")
		? nav_box.classList.remove("on")
		: nav_box.classList.add("on");
};

var secNav = document.querySelectorAll("[name=secNav]");
var secNav_li = document.querySelectorAll("[name=secNav] > li");
var secNavNum = null;
for (let i = 0; i < secNav.length; i++) {
	const element = secNav[i];
	element.onclick = function() {
		if (secNavNum == i) {
			secNav[secNavNum].classList.remove("on");
			secNavNum = null;
		} else if (secNavNum == null) {
			secNav[i].classList.add("on");
			secNavNum = i;
		} else {
			secNav[secNavNum].classList.remove("on");
			secNav[i].classList.add("on");
			secNavNum = i;
		}
	};
}

// gotoback
var gotoback = document.querySelector("#gotoback");
gotoback.onclick = function() {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
};

let favicon = document.querySelector('link[rel="shortcut icon"]');
let isDarkMode = false;
isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

var html = document.querySelector("html");

if (isDarkMode || html.getAttribute("native-dark-active") !== null) {
	console.log("dark");
	favicon.href = "../favicon-dark.ico";
} else {
	console.log("light");
	favicon.href = "../favicon-light.ico";
}
