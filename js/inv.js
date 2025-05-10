var inv_sel = document.querySelector("#inv_sel");
var inv_sel_li = document.querySelectorAll("#inv_sel > li");
var inv_sel_count = 0;
var inv_selbox_txt = document.querySelector("#inv_selbox_txt");
var yearList = document.querySelector("#yearList");
var yearList_li = document.querySelectorAll("#yearList > li");
var yearList_li_count = 0;
var scroll_body = document.querySelector("html");


for (let i = 0; i < inv_sel_li.length; i++) {
	const element = inv_sel_li[i];
	element.onclick = function () {
		inv_sel_li[inv_sel_count].classList.remove("on");
		inv_sel_li[i].classList.add("on");
		inv_sel.classList.remove('on');
		inv_selbox_txt.innerHTML = inv_sel_li[i].innerHTML;
		document.querySelector("#" + inv_sel_li[inv_sel_count].getAttribute('name')).classList.remove('on');
		document.querySelector("#" + inv_sel_li[i].getAttribute('name')).classList.add('on');
		if (document.querySelector("#more_revenue")) {
			document.querySelector("#more_revenue").classList.remove('on');
			if (inv_sel_li[i].getAttribute('name') == "inv_revenue") {
				document.querySelector("#more_revenue").classList.add('on');
			}
		}


		isYearList(inv_sel_li[i].getAttribute('name'))
		inv_sel_count = i;
		scroll_body.scrollTo(0, 0)
	}
}

for (let i = 0; i < yearList_li.length; i++) {
	const element = yearList_li[i];
	element.onclick = function () {
		if (element.innerHTML == 'More') {

		} else {
			yearList_li[yearList_li_count].classList.remove("on");
			yearList_li[i].classList.add("on");
			yearList_li_count = i
		}
	}
}
(function () {
	inv_sel_li[inv_sel_count].classList.add("on");
	inv_selbox_txt.innerHTML = inv_sel_li[inv_sel_count].innerHTML;
	document.querySelector("#" + inv_sel_li[inv_sel_count].getAttribute('name')).classList.add('on');
	isYearList(inv_sel_li[inv_sel_count].getAttribute('name'));

	yearList_li[yearList_li_count].classList.add("on");
})();


inv_selbox_txt.onclick = function () {
	inv_sel.classList.toggle('on');
}

function isYearList(s) {
	console.log('ha', yearList);

	if (s == 'inv_allrep') {
		yearList.classList.remove("on");
	} else {
		yearList.classList.add("on");
	}
}

if (document.querySelector("#yearListInside")) {
	var yearListInsideList = document.querySelectorAll("#yearListInside > li")
	var yearListInside_li_count = 0;
	yearListInsideList[yearListInside_li_count].classList.add("on");
	for (let i = 0; i < yearListInsideList.length; i++) {
		const element = yearListInsideList[i];
		element.onclick = function () {
			if (element.innerHTML == 'More') {

			} else {
				yearListInsideList[yearListInside_li_count].classList.remove("on");
				yearListInsideList[i].classList.add("on");
				yearListInside_li_count = i
			}
		}
	}
}