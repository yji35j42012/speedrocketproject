var history_group = document.querySelector("#history_group");
var history_item = document.querySelectorAll("#history_group .history_item");
var anishow = document.querySelectorAll("[name=history_txt]");
var history_titleH = document.querySelector(".history_item_title").clientHeight;
var defaultScore = window.innerHeight * (1 / 3); //超出視窗高度的3分之1
var showCount = 0;
var screen = window.innerWidth <= 1024 ? "ph" : "pc";
var defaultH = screen == "pc" ? 74 : -250;
var aniArr = [];
var firstRound = true;
var phH = screen == "pc" ? 0 : 150;
window.addEventListener("scroll", scrollListener);

function getWidth() {
	for (let i = 0; i < anishow.length; i++) {
		const element = anishow[i];
		element.style = `--txtBall:${history_group.offsetWidth / 2}px`;
	}
}

function scrollListener() {
	var windowHeight = window.pageYOffset;
	if (firstRound) {
		for (let i = 0; i < history_item.length; i++) {
			if (windowHeight > history_item[i].offsetTop) {
				showCount = i + 1;
				history_item[i].classList.add("on");
			}
		}
		firstRound = false;
	}
	if (
		windowHeight + defaultScore >
		history_item[showCount].offsetTop + defaultH
	) {
		history_item[showCount].classList.add("on");
		showCount++;
		if (showCount > history_item.length - 1) {
			showCount = history_item.length - 1;
		}
	} else if (
		showCount > 0 &&
		history_item[showCount].offsetTop -
			defaultScore -
			history_titleH -
			defaultH -
			phH >
			windowHeight
	) {
		history_item[showCount].classList.remove("on");
		showCount--;
		if (showCount < 0) {
			showCount = 0;
		}
	}
}
window.onresize = function() {
	getWidth();
	if (screen == "pc" && window.innerWidth <= 1024) {
		screen = "ph";
		defaultH = -118;
		phH = 150;
	} else if (screen == "ph" && window.innerWidth > 1024) {
		screen = "pc";
		defaultH = 74;
		phH = 0;
	}
};

setTimeout(() => {
	scrollListener();
	getWidth();
}, 100);
