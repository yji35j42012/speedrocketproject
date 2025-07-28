
var inv_term_li = document.querySelectorAll("#inv_term li");
var toparea = [];
var inv_sel = document.querySelector("#inv_term");
var inv_selbox_txt = document.querySelector("#inv_selbox_txt");
var inv_selbox = document.querySelector(".inv_selbox");
var scrollState = "down";
var scrollCount = 0;

for (let i = 0; i < inv_term_li.length; i++) {
	const element = inv_term_li[i];
	element.onclick = function () {
		var s = document.querySelector("#" + inv_term_li[i].getAttribute("name"));
		var goScroll = s.offsetTop - inv_selbox.offsetHeight
		var nowScroll = window.scrollY;

		scrollCount = i;
		clear();
		inv_sel.classList.remove('on');
		inv_selbox_txt.innerHTML = inv_term_li[i].innerHTML;
		inv_term_li[i].classList.add('on');

		if (goScroll > nowScroll) {
			goDown(nowScroll, goScroll);
			scrollState = "down";
		} else {
			goTop(nowScroll, goScroll);
			scrollState = "top";
		}
		// window.scrollTo(0, s.offsetTop - inv_selbox.offsetHeight);
	}
}
function clear() {
	for (let i = 0; i < inv_term_li.length; i++) {
		if (inv_term_li[i].classList.contains('on')) {
			inv_term_li[i].classList.remove('on');
		}
	}
}

inv_selbox_txt.onclick = function () {
	inv_sel.classList.toggle('on');
}

function goTop(from, to) {
	scrollState = "up";
	let scrollTime = setInterval(() => {
		if (from <= to - 50) {
			from = to;
			clearInterval(scrollTime);
		} else {
			window.scrollTo(0, from);
			from = from - 50;
		}
	}, 0);
}
function goDown(from, to) {
	scrollState = "down";
	let scrollTime = setInterval(() => {
		if (from >= to) {
			from = to;
			clearInterval(scrollTime);
		} else {
			window.scrollTo(0, from);
			from = from + 50;
		}
	}, 0);
}
let lastScrollTop = 0;
function scrollListener() {
	const scrollTop = document.documentElement.scrollTop;
	const scrollHeight = document.documentElement.scrollHeight;
	const clientHeight = document.documentElement.clientHeight;
	const ss = window.pageYOffset || document.documentElement.scrollTop;
	toparea = [];
	for (let i = 0; i < inv_term_li.length; i++) {
		var s = document.querySelector("#" + inv_term_li[i].getAttribute("name"));
		toparea.push(s.offsetTop);
	}

	if (ss > lastScrollTop) {
		// goDown(nowScroll, goScroll)
		scrollState = "down";
		if (scrollTop + inv_selbox.offsetHeight >= toparea[scrollCount + 1]) {
			inv_selbox_txt.innerHTML = inv_term_li[scrollCount + 1].innerHTML;
			scrollCount++
		}
	} else {
		// goTop(nowScroll, goScroll)
		scrollState = "top";
		if (scrollTop + inv_selbox.offsetHeight <= toparea[scrollCount - 1]) {
			inv_selbox_txt.innerHTML = inv_term_li[scrollCount - 1].innerHTML;
			scrollCount--;
		}
	}
	scrollCount < 0 ? scrollCount = 0 : scrollCount;
	clear();
	inv_term_li[scrollCount].classList.add('on');

	lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 為了避免負值
}
window.addEventListener("scroll", scrollListener);