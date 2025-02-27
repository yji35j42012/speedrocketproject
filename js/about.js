var business = document.querySelector("#business");
var anishow = document.querySelectorAll("[name=anishow]");
var anishowTxt = document.querySelectorAll(".txt");
var businessTxt = document.querySelectorAll(".businessTxt");
var businessTxtArr = [0];
var aniArr = [];
var defaultH = 132;
var defaultScore = window.innerHeight * (1 / 3); //超出視窗高度的3分之1
var showCount = 0;
var aboutMarginTop = document.querySelector("#about").offsetTop;
var business_titleH = document.querySelector("#business_title").clientHeight;
var firstRound = true;
var screen = window.innerWidth <= 1024 ? "ph" : "pc";
var changeAos = document.querySelector("#changeAos");

// 電腦版要執行
function getAniShow() {
	aniArr = [];
	for (let i = 0; i < anishow.length; i++) {
		aniArr.push(anishow[i].offsetTop + business.offsetTop);
	}
	setTimeout(() => {
		scrollListener();
	}, 10);
	window.addEventListener("scroll", scrollListener);
}
function scrollListener() {
	if (screen !== "pc") return;

	var windowHeight = window.pageYOffset;
	if (firstRound) {
		for (let i = 0; i < aniArr.length; i++) {
			if (windowHeight > aniArr[i]) {
				showCount = i + 1;
				business.classList.add("show" + showCount);
				businessTxtArr[showCount]
					? businessStyleHandler(businessTxtArr[showCount])
					: "";
			}
		}
		firstRound = false;
	}

	if (windowHeight + defaultScore > aniArr[showCount]) {
		showCount++;
		businessTxtArr[showCount]
			? businessStyleHandler(businessTxtArr[showCount])
			: "";
		business.classList.add("show" + showCount);
	} else if (
		showCount > 0 &&
		aniArr[showCount - 1] - aboutMarginTop - business_titleH > windowHeight
	) {
		business.classList.remove("show" + showCount);
		showCount <= 0 ? (showCount = 0) : showCount--;
		businessTxtArr[showCount]
			? businessStyleHandler(businessTxtArr[showCount])
			: businessStyleHandler(0);
	}
}
function aboutInit() {
	firstRound = true;
	setTimeout(() => {
		businessTxtArr = [0];
		for (let i = 0; i < businessTxt.length; i++) {
			if (i == businessTxt.length - 1) {
				businessTxtArr.push(business.offsetHeight - 53);
			} else {
				businessTxtArr.push(businessTxt[i].offsetTop);
			}
		}
	}, 10);
	setTimeout(() => {
		getAniShow();
	}, 10);
}
function businessStyleHandler(num) {
	business.style = `--lineHeight:${num}px`;
}

function removeAos() {
	var phAos = document.querySelectorAll("[data-phAos]");
	for (let i = 0; i < phAos.length; i++) {
		const element = phAos[i];
		element.setAttribute("data-aos", "");
	}
}

function checkBusinessTxtArr() {
	for (let i = 1; i < businessTxtArr.length; i++) {
		if (businessTxt[i - 1].offsetTop !== businessTxtArr[i]) {
			i == businessTxtArr.length - 1
				? businessTxtArr[i]
				: (businessTxtArr[i] = businessTxt[i - 1].offsetTop);
			showCount == businessTxtArr.length
				? (showCount = showCount - 1)
				: showCount;
			businessStyleHandler(businessTxtArr[showCount]);
		}
	}
}
// 手機版要執行
function phAos() {
	var phAos = document.querySelectorAll("[data-phAos]");
	for (let i = 0; i < phAos.length; i++) {
		const element = phAos[i];
		element.setAttribute("data-aos", element.dataset.phaos);
		AOS.init();
		// aos-init
	}
}

function clearShowClass() {
	for (let i = 0; i <= showCount; i++) {
		business.classList.remove("show" + i);
	}
}
function changeTxtAos() {
	if (screen == "ph") {
		changeAos.setAttribute("data-aos", 'fade-up');
	} else if (screen == "pc") {
		changeAos.setAttribute("data-aos", 'fade-left');
		changeAos.setAttribute("data-aos-offset", '300');
		changeAos.setAttribute("data-aos-duration", '300');
	}
	// 
}


window.onresize = function () {
	if (screen == "pc" && window.innerWidth <= 1024) {
		screen = "ph";
		businessStyleHandler(0);
		clearShowClass();
		phAos();
		changeTxtAos()
	} else if (screen == "ph" && window.innerWidth > 1024) {
		screen = "pc";
		removeAos();
		aboutInit();
		changeTxtAos()
		checkBusinessTxtArr()
	}
	if (screen == "pc") {
		checkBusinessTxtArr()
	}
};





if (screen == "ph") {
	phAos();
	changeTxtAos()
} else if (screen == "pc") {
	aboutInit();
	businessStyleHandler(0);
	changeTxtAos()
}
