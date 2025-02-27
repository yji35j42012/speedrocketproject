var searchInpBox = document.querySelector("#searchInpBox");
var searchInp = document.querySelector("#searchInp");
var searchHandler = document.querySelector("#searchHandler");
var office_area = document.querySelector("#office_area");
var nodata = document.querySelector("#nodata");

searchInp.addEventListener("focus", function () {
	searchInpBox.classList.add("_in");
});
searchInp.addEventListener("blur", function () {
	setTimeout(() => {
		searchInpBox.classList.remove("_in");
	}, 100);
});
searchHandler.onclick = function (event) {
	if (!searchInpBox.classList.contains("_in")) {
		return;
	} else {
		searchInpBox.classList.remove("_in");

		filiter();

		setTimeout(() => {
			searchInp.blur();
		}, 100);
	}
};

var selectHandler = document.querySelectorAll("[name=selectHandler]");
var page_input = document.querySelectorAll("[name=page_input]");
var selectHandlerItem = null;
for (let i = 0; i < selectHandler.length; i++) {
	const element = selectHandler[i];
	element.onclick = function () {
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

var select_area_txt = document.querySelectorAll("[name=select_area_txt]");
var select_area = document.querySelectorAll("#select_area > li");
var select_brand_txt = document.querySelectorAll("[name=select_brand_txt]");
var select_brand = document.querySelectorAll("#select_brand > li");

var area_group = document.querySelector("#area_group");
var area_group_item = document.querySelectorAll("#area_group > li");

// areaNum 1:香港、2:馬來西亞、3:新加坡
// brandNum 0:all、1:SHARECO、2:KP記憶香氛
var areaData = [
];

var setAreaData = areaData;
var selectArea = 0;
var selectBrand = 0;
var selectCount = 0;

function setArr() {
	for (let i = 0; i < area_group_item.length; i++) {
		const element = area_group_item[i];
		if (element.getAttribute('data-type') == 'txt') {
			areaData.push({
				type: element.getAttribute('data-type'),
				areaNum: element.getAttribute('data-areaNum'),
				brandNum: element.getAttribute('data-brandNum'),
				name: element.children[0].innerHTML,
				phone: element.children[1].innerHTML,
				address: element.children[2].innerHTML,
			})
		} else if (element.getAttribute('data-type') == 'pic') {
			areaData.push({
				type: element.getAttribute('data-type'),
				areaNum: element.getAttribute('data-areaNum'),
				brandNum: element.getAttribute('data-brandNum'),
				name: element.children[1].innerHTML,
				picSrc: element.children[0].children[0].getAttribute('src'),
				needClass: element.children[0].getAttribute("class"),
			})
		}
	}

	setData();
}
setArr()

function filiter() {


	setAreaData = [];
	let objArr = [];
	let areaNum = parseInt(selectArea);
	let brandNum = parseInt(selectBrand);
	if (selectArea == 0 && selectBrand == 0) {
		setAreaData = areaData;
	}
	if (areaNum !== 0) {
		for (let i = 0; i < areaData.length; i++) {
			if (areaData[i].areaNum == areaNum) {
				objArr.push(areaData[i]);
			}
		}
		setAreaData = objArr;
	} else {
		setAreaData = areaData;
	}
	if (brandNum !== 0) {
		objArr = [];
		for (let i = 0; i < setAreaData.length; i++) {
			if (
				setAreaData[i].brandNum == 0 ||
				setAreaData[i].brandNum == brandNum
			) {
				objArr.push(setAreaData[i]);
			}
		}
		setAreaData = objArr;
	}

	if (searchInp.value !== "") {
		objArr = [];
		for (let i = 0; i < setAreaData.length; i++) {
			var searchName = searchInp.value.toLowerCase();
			var arrName = setAreaData[i].name
				? setAreaData[i].name.toLowerCase()
				: "";
			var arrPhone = setAreaData[i].phone ? setAreaData[i].phone : "";
			var arrAddress = setAreaData[i].address
				? setAreaData[i].address.toLowerCase()
				: "";

			if (
				arrName.indexOf(searchName) !== -1 ||
				arrPhone.indexOf(searchName) !== -1 ||
				arrAddress.indexOf(searchName) !== -1
			) {
				objArr.push(setAreaData[i]);
			}
		}
		setAreaData = objArr;
	}
	setData();
}

function setData() {
	area_group.innerHTML = "";
	if (setAreaData.length == 0) {
		nodata.style.display = "";
		office_area.style.display = "none";
	} else {
		nodata.style.display = "none";
		office_area.style.display = "";
	}
	for (let i = 0; i < setAreaData.length; i++) {
		const li = document.createElement("li");
		li.setAttribute("class", "office_area_item");
		if (setAreaData[i].type == "txt") {
			const child1 = document.createElement("div");
			child1.setAttribute("class", "office_area_name");
			child1.innerHTML = setAreaData[i].name;
			const child2 = document.createElement("div");
			child2.setAttribute("class", "office_area_phone");
			child2.innerHTML = setAreaData[i].phone;
			const child3 = document.createElement("div");
			child3.setAttribute("class", "office_area_address");
			child3.innerHTML = setAreaData[i].address;
			li.append(child1);
			li.append(child2);
			li.append(child3);
		} else if (setAreaData[i].type == "pic") {
			const child1 = document.createElement("div");
			child1.setAttribute("class", setAreaData[i].needClass);
			const child1Pic = document.createElement("img");
			child1Pic.setAttribute("src", setAreaData[i].picSrc);
			child1.append(child1Pic);
			const child2 = document.createElement("div");
			child2.setAttribute("class", "office_area_name");
			child2.innerHTML = setAreaData[i].name;
			li.append(child1);
			li.append(child2);
		}
		area_group.append(li);
	}


	setTimeout(() => {
		area_group.classList.add("on");
	}, 100);
}
function setTxt(who, txt) {
	for (let i = 0; i < select_area_txt.length; i++) {
		if (who == "area") {
			select_area_txt[i].innerHTML = txt;
		} else if (who == "brand") {
			select_brand_txt[i].innerHTML = txt;
		}
	}
}
for (let i = 0; i < select_area.length; i++) {
	const element = select_area[i];
	element.onclick = function () {
		setTxt("area", element.innerHTML);
		selectArea = element.getAttribute("data-area");

		area_group.classList.remove("on");
		setTimeout(() => {
			filiter();
		}, 100);
	};
}

for (let i = 0; i < select_brand.length; i++) {
	const element = select_brand[i];
	element.onclick = function () {
		setTxt("brand", element.innerHTML);
		selectBrand = element.getAttribute("data-brand");
		area_group.classList.remove("on");
		setTimeout(() => {
			filiter();
		}, 100);
	};
}
filiter();

