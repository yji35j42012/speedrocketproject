var device = window.innerWidth <= 1024 ? "ph" : "pc";
var access = document.querySelector("#access_over_group");
var access_pic = document.querySelectorAll(
	"#access_over_group > .access_over_item"
);
var over_prev = document.querySelector("#over_prev");
var over_next = document.querySelector("#over_next");
var access_count = 0;
var access_moveNum = -100 * access_count;
var access_maxCount =
	device == "pc" ? Math.ceil(access_pic.length / 4) : access_pic.length;
var over_dots = document.querySelector("#over_dots");
var over_dots_item = null;
var lightBox = document.querySelector("#lightBox");
var lightBox_close = document.querySelector("#lightBox_close");
var lightBox_info = document.querySelector("#lightBox_info");
function over_nextHander() {
	console.log("access_count", access_count);
	if (access_count + 1 >= access_maxCount) {
		access_count = 0;
	} else {
		access_count++;
	}
	access_moveNum = -100 * access_count;
	access_moveHandler();
	dotsAccessHandler();
}
function over_prevHander() {
	if (access_count == 0) {
		access_count = access_maxCount - 1;
	} else {
		access_count--;
	}
	access_moveNum = -100 * access_count;
	access_moveHandler();
	dotsAccessHandler();
}
if (over_next) {
	over_next.addEventListener("click", over_nextHander);
}
if (over_prev) {
	over_prev.addEventListener("click", over_prevHander);
}

function access_moveHandler(e) {
	if (access == null) return;
	for (let i = 0; i < access_pic.length; i++) {
		const element = access_pic[i];
		element.onclick = function() {
			if (device == "pc") return;
			lightBox.classList.add("on");
			setTimeout(() => {
				lightBox.classList.add("op1");
			}, 50);
			let num = i + 1;
			var getImg1 = document.querySelector(
				".access_over_item:nth-child(" + num + ") > .access_over_flag"
			);
			var getImg2 = document.querySelector(
				".access_over_item:nth-child(" + num + ") > .access_over_logo"
			);
			var getTxt1 = document.querySelector(
				".access_over_item:nth-child(" + num + ") .hoverItem_country"
			);
			var getTxt2 = document.querySelector(
				".access_over_item:nth-child(" + num + ") .hoverItem_countryTw"
			);
			var getTxt3 = document.querySelector(
				".access_over_item:nth-child(" + num + ") .hoverItem_shop"
			);

			var lightBox_flag = document.querySelector("#lightBox_flag");
			var lightBox_logo = document.querySelector("#lightBox_logo");
			var lightBox_country = document.querySelector("#lightBox_country");
			var lightBox_countryTw = document.querySelector(
				"#lightBox_countryTw"
			);
			var lightBox_shop = document.querySelector("#lightBox_shop");
			lightBox_flag.setAttribute("src", getImg1.getAttribute("src"));
			lightBox_logo.setAttribute("src", getImg2.getAttribute("src"));
			lightBox_country.innerHTML = getTxt1.innerHTML;
			lightBox_countryTw.innerHTML = getTxt2.innerHTML;
			lightBox_shop.innerHTML = getTxt3.innerHTML;
		};
	}
	access.style = `transform: translateX(${access_moveNum}%);transition-duration: 0.3s;opacity:1;`;
}

if (lightBox_info) {
	lightBox_info.onclick = function(event) {
		event.stopPropagation();
	};
}
function lightBox_close_prevHander(event) {
	lightBox.classList.remove("op1");
	setTimeout(() => {
		lightBox.classList.remove("on");
	}, 50);
}
if (lightBox_close) {
	lightBox_close.addEventListener("click", lightBox_close_prevHander);
}

if (lightBox) {
	lightBox.addEventListener("click", lightBox_close_prevHander);
}
function dotsAccessHandler() {
	allDotsRemoveAccess();
	over_dots_item[access_count].classList.add("on");
}
function allDotsRemoveAccess() {
	for (let i = 0; i < over_dots_item.length; i++) {
		const element = over_dots_item[i];
		element.classList.remove("on");
	}
}
function pushAccissDots() {
	if (access == null) return;
	over_dots.innerHTML = "";
	for (let i = 0; i < access_maxCount; i++) {
		const liDot = document.createElement("li");
		liDot.setAttribute("class", "normal_dots_item");
		over_dots.append(liDot);
	}
	over_dots_item = document.querySelectorAll("#over_dots >li");
	dotAccessItem();
	over_dots_item[access_count].classList.add("on");
}
function dotAccessItem() {
	for (let i = 0; i < over_dots_item.length; i++) {
		const element = over_dots_item[i];
		element.onclick = function() {
			access_count = i;
			access_moveNum = -100 * access_count;
			access_moveHandler();
			dotsAccessHandler();
		};
	}
}
function introductionChangeAni() {
	if (window.innerWidth <= 1024) {
		introduction1.setAttribute("data-aos", "fade-up");
		introduction1_pic.setAttribute("data-aos", "");
		introduction1_txt.setAttribute("data-aos", "");
	} else if (window.innerWidth > 1024) {
		introduction1.setAttribute("data-aos", "");
		introduction1_pic.setAttribute("data-aos", "fade-right");
		introduction1_txt.setAttribute("data-aos", "fade-left");
	}
}
window.onresize = function() {
	if (window.innerWidth > 1024 && window.innerWidth <= 1929 && photo_kp) {
		let move = ((1929 - window.innerWidth) / 2) * -1;
		photo_kp.style = `transform: translateX(${move}px);`;
	} else if (window.innerWidth <= 1024 && photo_kp) {
		let move = ((1024 - window.innerWidth) / 2) * -1;
		photo_kp.style = `transform: translateX(${move}px);`;
	} else if (photo_kp && window.innerWidth > 1929) {
		photo_kp.style = "";
	}
	if (window.innerWidth <= 1024) {
		productIconAdd();
	}
	if (window.innerWidth <= 1024 && device == "pc") {
		device = "ph";
		introductionChangeAni();
		access_maxCount = access_pic.length;
		access_moveHandler();
		pushAccissDots();
	} else if (device == "ph" && window.innerWidth > 1024) {
		device = "pc";
		introductionChangeAni();
		access_maxCount = Math.ceil(access_pic.length / 4);
		access_count > access_maxCount
			? (access_count = access_maxCount - 1)
			: access_count;
		access_moveNum = -100 * access_count;
		access_moveHandler();
		pushAccissDots();

		product_group.style = "";
		product_count = 0;
		dotsProductHandler();
	}
};
var startX = 0;
var nowX = 0;
var endX = 0;
function accessTouchStart(event) {
	// 點擊位置
	if (!event.touches) {
		//相容移動端
		startX = event.clientX;
	} else {
		//相容PC端
		startX = event.touches[0].pageX;
	}
	nowX = startX;
	window.addEventListener("touchmove", accessTouchMove);
	window.addEventListener("touchend", accessTouchEnd);
}
function accessTouchMove() {
	if (!event.touches) {
		//相容移動端
		nowX = event.clientX;
	} else {
		//相容PC端
		nowX = event.touches[0].pageX;
	}
	let newX = nowX - startX;
	if (access_count == 0) {
		if (nowX < startX) {
			access.style = `transform: translateX(calc(${access_moveNum}% + ${newX}px) );transition-duration: 0s;opacity:1;`;
		}
	} else if (access_count + 1 >= access_maxCount) {
		if (nowX > startX) {
			access.style = `transform: translateX(calc(${access_moveNum}% + ${newX}px) );transition-duration: 0s;opacity:1;`;
		}
	} else {
		access.style = `transform: translateX(calc(${access_moveNum}% + ${newX}px) );transition-duration: 0s;opacity:1;`;
	}
}
function accessTouchEnd() {
	if (nowX > startX) {
		if (access_count == 0) {
			return;
		} else {
			access_count--;
		}
		access_moveNum = -100 * access_count;
		access_moveHandler();
		dotsAccessHandler();
	} else if (nowX < startX) {
		if (access_count + 1 >= access_maxCount) {
			return;
		} else {
			access_count++;
		}
		access_moveNum = -100 * access_count;
		access_moveHandler();
		dotsAccessHandler();
	}
	window.removeEventListener("touchmove", accessTouchMove);
	window.removeEventListener("touchend", accessTouchEnd);
}
var accessBox = document.querySelector("#accessBox");
if (accessBox) {
	accessBox.addEventListener("touchstart", accessTouchStart);
}

setTimeout(() => {
	access_moveHandler();
	pushAccissDots();
}, 100);
var product_group = document.querySelector("#access_product_group");
var product_prev = document.querySelector("#product_prev");
var product_next = document.querySelector("#product_next");
var product_dots_item = null;
var product_count = 0;
var product_moveNum = -100 * product_count;
var product_item = document.querySelectorAll(
	"#access_product_group > .access_product_item"
);

var product_maxCount = product_item.length;
function productIconAdd() {
	var product_picH = document.querySelector("#product_pic").clientHeight / 2;
	let numT = parseInt(product_picH) + 42 + 32;
	product_prev.style.top = numT + "px";
	product_next.style.top = numT + "px";
}
product_prev.onclick = function() {
	if (product_count == 0) {
		product_count = product_maxCount - 1;
	} else {
		product_count--;
	}
	product_moveNum = -100 * product_count;
	product_moveHandler();
	dotsProductHandler();
};
product_next.onclick = function() {
	if (product_count + 1 >= product_maxCount) {
		product_count = 0;
	} else {
		product_count++;
	}
	product_moveNum = -100 * product_count;
	product_moveHandler();
	dotsProductHandler();
};
function product_moveHandler() {
	for (let i = 0; i < product_item.length; i++) {
		if (window.innerWidth <= 1024) {
			const element = product_item[i];
		}
	}
	product_group.style = `transform: translateX(${product_moveNum}%);transition-duration: 0.3s;opacity:1;`;
}
function dotProductItem() {
	for (let i = 0; i < product_dots_item.length; i++) {
		const element = product_dots_item[i];
		element.onclick = function() {
			product_count = i;
			product_moveNum = -100 * product_count;
			product_moveHandler();
			dotsProductHandler();
		};
	}
}
function allDotsRemoveProduct() {
	for (let i = 0; i < product_dots_item.length; i++) {
		const element = product_dots_item[i];
		element.classList.remove("on");
	}
}
function dotsProductHandler() {
	allDotsRemoveProduct();
	product_dots_item[product_count].classList.add("on");
	dotProductItem();
}
function pushProductDots() {
	for (let i = 0; i < product_maxCount; i++) {
		const liDot = document.createElement("li");
		liDot.setAttribute("class", "normal_dots_item");
		product_dots.append(liDot);
		product_dots_item = document.querySelectorAll("#product_dots >li");
		dotsProductHandler();
	}
}

var startX = 0;
var nowX = 0;
var endX = 0;
function productTouchStart(event) {
	console.log("productTouchStart");

	// 點擊位置
	if (!event.touches) {
		//相容移動端
		startX = event.clientX;
	} else {
		//相容PC端
		startX = event.touches[0].pageX;
	}
	nowX = startX;
	window.addEventListener("touchmove", productTouchMove);
	window.addEventListener("touchend", productTouchEnd);
}
function productTouchMove() {
	if (!event.touches) {
		//相容移動端
		nowX = event.clientX;
	} else {
		//相容PC端
		nowX = event.touches[0].pageX;
	}
	let newX = nowX - startX;

	if (product_count == 0) {
		if (nowX < startX) {
			product_group.style = `transform: translateX(calc(${product_moveNum}% + ${newX}px) );transition-duration: 0s;opacity:1;`;
		}
	} else if (product_count + 1 >= product_maxCount) {
		if (nowX > startX) {
			product_group.style = `transform: translateX(calc(${product_moveNum}% + ${newX}px) );transition-duration: 0s;opacity:1;`;
		}
	} else {
		product_group.style = `transform: translateX(calc(${product_moveNum}% + ${newX}px) );transition-duration: 0s;opacity:1;`;
	}
}
function productTouchEnd() {
	if (nowX > startX) {
		if (product_count == 0) {
			return;
		} else {
			product_count--;
		}
		product_moveNum = -100 * product_count;
		product_moveHandler();
		dotsProductHandler();
	} else if (nowX < startX) {
		if (product_count + 1 >= product_maxCount) {
			return;
		} else {
			product_count++;
		}
		product_moveNum = -100 * product_count;
		product_moveHandler();
		dotsProductHandler();
	}
	window.removeEventListener("touchmove", productTouchMove);
	window.removeEventListener("touchend", productTouchEnd);
}
var productBox = document.querySelector("#productBox");
if (productBox) {
	productBox.addEventListener("touchstart", productTouchStart);
}

setTimeout(() => {
	pushProductDots();
	productIconAdd();
	introductionChangeAni();
}, 200);
