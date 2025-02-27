var selectHandler = document.querySelectorAll("[name=selectHandler]");
var selectHandlerItem = null;
var brandTxt = document.querySelector("#brandTxt");
var categoriesTxt = document.querySelector("#categoriesTxt");

for (let i = 0; i < selectHandler.length; i++) {
	const element = selectHandler[i];
	element.onclick = function() {
		if (selectHandlerItem == i) {
			selectHandler[selectHandlerItem].classList.remove("on");
			selectHandlerItem = null;
		} else if (selectHandlerItem == null) {
			selectHandler[i].classList.add("on");
			selectHandlerItem = i;
		} else {
			selectHandler[selectHandlerItem].classList.remove("on");
			selectHandler[i].classList.add("on");
			selectHandlerItem = i;
		}
	};
}

var brandGroup = document.querySelectorAll("#brandGroup > li");
for (let i = 0; i < brandGroup.length; i++) {
	const element = brandGroup[i];
	element.onclick = function() {
		brandTxt.innerHTML = element.innerHTML;
	};
}
var categorieGroup = document.querySelectorAll("#categorieGroup > li");
for (let i = 0; i < categorieGroup.length; i++) {
	const element = categorieGroup[i];
	element.onclick = function() {
		categoriesTxt.innerHTML = element.innerHTML;
	};
}

var page_input = document.querySelectorAll("[name=page_input]");
var page_group_more = document.querySelectorAll("[name=page_group_more]");
var more_item = null;
for (let i = 0; i < page_group_more.length; i++) {
	const element = page_group_more[i];
	element.onclick = function() {
		if (more_item == i) {
			page_group_more[more_item].classList.remove("on");
			more_item = null;
		} else if (more_item == null) {
			page_group_more[i].classList.add("on");
			page_input[i].focus();
			more_item = i;
		} else {
			page_group_more[more_item].classList.remove("on");
			page_group_more[i].classList.add("on");
			page_input[i].focus();
			more_item = i;
		}
	};
}
for (let i = 0; i < page_input.length; i++) {
	const element = page_input[i];
	element.addEventListener("blur", function() {
		page_group_more[more_item].classList.remove("on");
		more_item = null;
	});
}

var page_goPage = document.querySelectorAll("[name=page_goPage]");
for (let i = 0; i < page_goPage.length; i++) {
	const element = page_goPage[i];
	element.onclick = function() {
		event.stopPropagation();
	};
}

// page
var head_page = document.querySelectorAll("#head_page [name=page]");
var footer_page = document.querySelectorAll("#footer_page [name=page]");
var pageCount = null;

for (let i = 0; i < head_page.length; i++) {
	const element = head_page[i];
	if (element.classList.contains("on")) {
		pageCount = i;
	}
	element.onclick = function() {
		pageHandler(i);
	};
}
for (let i = 0; i < footer_page.length; i++) {
	const element = footer_page[i];
	element.onclick = function() {
		pageHandler(i);
	};
}
function pageHandler(addNum) {
	head_page[pageCount].classList.remove("on");
	footer_page[pageCount].classList.remove("on");
	head_page[addNum].classList.add("on");
	footer_page[addNum].classList.add("on");
	pageCount = addNum;
}
// page

var searchInpBox = document.querySelector("#searchInpBox");
var searchInp = document.querySelector("#searchInp");
var searchHandler = document.querySelector("#searchHandler");

searchInp.addEventListener("focus", function() {
	searchInpBox.classList.add("_in");
});
searchInp.addEventListener("blur", function() {
	setTimeout(() => {
		searchInpBox.classList.remove("_in");
	}, 100);
});
searchHandler.onclick = function(params) {
	setTimeout(() => {
		searchInp.blur();
	}, 100);
	searchInpBox.classList.remove("_in");
};
