var banner = document.querySelector("#banner_group");
var banner_pic = document.querySelectorAll("#banner_group > .banner_item");
var banner_prev = document.querySelector("#banner_prev");
var banner_next = document.querySelector("#banner_next");
var banner_count = 1;
var banner_moveNum = -100 * banner_count;
var banner_maxCount = banner_pic.length;
var banner_time = 5; //6秒
var countdown = banner_time;
let bannerTime = null;
var banner_dots = document.querySelector("#banner_dots");
var banner_dots_item = null;
var photo_kp = document.querySelector("#photo_kp");
var introduction1 = document.querySelector("#introduction1");
var bannerBox = document.querySelector("#bannerBox");
var introduction1_pic = document.querySelector(
	"#introduction1 > .brandSH_introduction_pic"
);
var introduction1_txt = document.querySelector(
	"#introduction1 > .brandSH_introduction_txt"
);

function bannerTimeHandler() {
	countdown--;
	if (countdown >= 0) {
		bannerTime = setTimeout(bannerTimeHandler, 1000);
	} else {
		banner_count++;
		banner_moveNum = -100 * banner_count;
		banner_moveHandler();
		if (banner_count == banner_maxCount + 1) {
			goFirst();
		} else if (banner_count == 0) {
			goEnd();
		}
		dotsHandler();
		countdown = banner_time;
		bannerTime = setTimeout(bannerTimeHandler, 1000);
	}
}
banner_next.onclick = function() {
	banner_count++;
	banner_moveNum = -100 * banner_count;
	banner_moveHandler();
	resetTime();
	dotsHandler();
};
banner_prev.onclick = function() {
	banner_count--;
	banner_moveNum = -100 * banner_count;
	banner_moveHandler();
	resetTime();
	dotsHandler();
};
//時間重置
function resetTime() {
	clearTimeout(bannerTime);
	countdown = banner_time;
	bannerTime = setTimeout(bannerTimeHandler, 1000);
	if (banner_count == banner_maxCount + 1) {
		goFirst();
	} else if (banner_count == 0) {
		goEnd();
	}
}
// 移動
function banner_moveHandler() {
	window.removeEventListener("touchmove", bannerTouchMove);
	window.removeEventListener("touchend", bannerTouchEnd);
	window.removeEventListener("mousemove", bannerTouchMove);
	window.removeEventListener("mouseup", bannerTouchEnd);
	banner.style = `transform: translateX(${banner_moveNum}%);transition-duration: 0.3s;opacity:1;`;
}
// 快速換回第一張
function goFirst() {
	setTimeout(() => {
		banner_count = 1;
		banner_moveNum = -100 * banner_count;
		banner.style = `transform: translateX(${banner_moveNum}%);transition-duration: 0;opacity:1;`;
	}, 350);
}
// 快速換回最後一張
function goEnd() {
	setTimeout(() => {
		banner_count = banner_maxCount;
		banner_moveNum = -100 * banner_count;
		banner.style = `transform: translateX(${banner_moveNum}%);transition-duration: 0;opacity:1;`;
	}, 350);
}
function pushStart() {
	var getImg = document.querySelector(
		"#banner_group > .banner_item:last-child img"
	);
	const liStart = document.createElement("li");
	liStart.setAttribute("class", "banner_item");
	liStart.setAttribute(
		"style",
		"background-image: url('" + getImg.getAttribute("src") + "')"
	);
	const child = document.createElement("img");
	child.setAttribute("src", getImg.getAttribute("src"));
	liStart.append(child);
	banner.insertBefore(liStart, banner_pic[0]);
}
function pushEnd() {
	var getImg = document.querySelector(
		"#banner_group > .banner_item:nth-child(2) img"
	);
	const liEnd = document.createElement("li");
	liEnd.setAttribute("class", "banner_item");
	liEnd.setAttribute(
		"style",
		"background-image: url('" + getImg.getAttribute("src") + "')"
	);
	const child = document.createElement("img");
	child.setAttribute("src", getImg.getAttribute("src"));
	liEnd.append(child);
	banner.appendChild(liEnd, banner_pic[0]);
}
function pushDots() {
	for (let i = 0; i < banner_maxCount; i++) {
		const liDot = document.createElement("li");
		liDot.setAttribute("class", "normal_dots_item");
		banner_dots.append(liDot);
	}
	banner_dots_item = document.querySelectorAll("#banner_dots >li");
	dotsHandler();
	dotItem();
}
function dotsHandler() {
	allDotsRemove();
	if (banner_count == 1) {
		banner_dots_item[banner_count - 1].classList.add("on");
	} else if (banner_count == 0) {
		banner_dots_item[banner_maxCount - 1].classList.add("on");
	} else if (banner_count > banner_maxCount) {
		banner_dots_item[0].classList.add("on");
	} else {
		banner_dots_item[banner_count - 1].classList.add("on");
	}
}
function dotItem() {
	for (let i = 0; i < banner_dots_item.length; i++) {
		const element = banner_dots_item[i];
		element.onclick = function() {
			banner_count = i + 1;
			banner_moveNum = -100 * banner_count;
			banner_moveHandler();
			dotsHandler();
			resetTime();
		};
	}
}
function allDotsRemove() {
	for (let i = 0; i < banner_dots_item.length; i++) {
		const element = banner_dots_item[i];
		element.classList.remove("on");
	}
}
var startX = 0;
var nowX = 0;
var endX = 0;

function bannerTouchStart(event) {
	clearTimeout(bannerTime);
	bannerTime = null;
	// 點擊位置
	if (!event.touches) {
		//相容移動端
		startX = event.clientX;
	} else {
		//相容PC端
		startX = event.touches[0].pageX;
	}
	nowX = startX;
	window.addEventListener("touchmove", bannerTouchMove);
	window.addEventListener("touchend", bannerTouchEnd);
	window.addEventListener("mousemove", bannerTouchMove);
	window.addEventListener("mouseup", bannerTouchEnd);
}
function bannerTouchMove() {
	if (!event.touches) {
		//相容移動端
		nowX = event.clientX;
	} else {
		//相容PC端
		nowX = event.touches[0].pageX;
	}
	let newX = nowX - startX;
	banner.style = `transform: translateX(calc(${banner_moveNum}% + ${newX}px) );transition-duration: 0s;opacity:1;`;
}
function bannerTouchEnd() {
	if (nowX > startX) {
		banner_count--;
		banner_moveNum = -100 * banner_count;
		banner_moveHandler();
		if (banner_count == banner_maxCount + 1) {
			goFirst();
		} else if (banner_count == 0) {
			goEnd();
		}
		dotsHandler();
	} else if (nowX < startX) {
		banner_count++;
		banner_moveNum = -100 * banner_count;
		banner_moveHandler();
		if (banner_count == banner_maxCount + 1) {
			goFirst();
		} else if (banner_count == 0) {
			goEnd();
		}
		dotsHandler();
	}
	countdown = banner_time;
	bannerTime = setTimeout(bannerTimeHandler, 1000);
	window.removeEventListener("touchmove", bannerTouchMove);
	window.removeEventListener("touchend", bannerTouchEnd);
	window.removeEventListener("mousemove", bannerTouchMove);
	window.removeEventListener("mouseup", bannerTouchEnd);
}
bannerBox.addEventListener("touchstart", bannerTouchStart);
bannerBox.addEventListener("mousedown", bannerTouchStart);
bannerBox.addEventListener("touchstart", bannerTouchStart);
bannerBox.addEventListener("mousedown", bannerTouchStart);

setTimeout(() => {
	pushStart();
	pushEnd();
	banner_moveHandler();
	pushDots();
}, 100);

bannerTimeHandler();
