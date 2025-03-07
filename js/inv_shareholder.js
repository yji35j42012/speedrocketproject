
// var inv_term_item=document.querySelectorAll("#inv_term li")
// var defaultGo=98+window.innerWidth*0.3-103-66-45-700;
// var nowScroll=0;
// var oldScroll=0;
// var termCount=null;
// var termArr=[];
// var scrollState="down";
// var hasClass=0;
// var hssCount=0;
// var inv_selbox_txt=document.querySelector("#inv_selbox_txt");
// window.addEventListener("scroll", scrollListener);
// function clearTerm() {
// 	for (let i=0; i<inv_term_item.length; i++) {
// 		inv_term_item[i].classList.remove("on");
// 	}
// }
// function scrollListener() {
// 	var nowScroll=window.scrollY;
// 	console.log('nowScroll', nowScroll);
// 	nowScroll>=oldScroll? (scrollState="down"):(scrollState="up");
// 	oldScroll=nowScroll;
// 	if (termCount==null&&nowScroll>termArr[0]&&scrollState=="down") {
// 		termCount=0;
// 		inv_term_item[termCount].classList.add("on");
// 	} else if (nowScroll>termArr[termCount+1]&&scrollState=="down") {
// 		inv_term_item[termCount].classList.remove("on");
// 		termCount++;
// 		inv_term_item[termCount].classList.add("on");
// 	}
// 	if (scrollState=="up") {
// 		remove();
// 	}
// }
// for (let i=0; i<inv_term_item.length; i++) {
// 	const element=inv_term_item[i];
// 	element.onclick=function () {
// 		var item=document.querySelector("#"+element.getAttribute("name"));
// 		var nowScroll=window.scrollY;
// 		var goScroll=item.offsetTop+defaultGo;
// 		if (goScroll>nowScroll) {
// 			goDown(nowScroll, goScroll);
// 			scrollState="down";
// 		} else {
// 			goTop(nowScroll, goScroll);
// 			scrollState="up";
// 			termCount=i;
// 		}
// 		clearTerm();
// 		inv_term_item[i].classList.add("on");
// 	};
// }
// function goTop(from, to) {
// 	scrollState="up";
// 	let scrollTime=setInterval(() => {
// 		if (from<=to) {
// 			from=to;
// 			clearInterval(scrollTime);
// 		} else {
// 			window.scrollTo(0, from);
// 			from=from-50;
// 		}
// 	}, 0);
// }
// function goDown(from, to) {
// 	let scrollTime=setInterval(() => {
// 		if (from>=to) {
// 			from=to;
// 			clearInterval(scrollTime);
// 		} else {
// 			window.scrollTo(0, from);
// 			from=from+50;
// 		}
// 	}, 0);
// }
// window.onresize=function () {
// 	// if(window.innerWidth >1024){
// 	// 	defaultGo=98+window.innerWidth*0.3-66-103;
// 	// }
// 	// console.log('a',window.innerWidth);

// };
// function getItemTop() {
// 	var nowScroll=window.scrollY;
// 	termArr=[];
// 	for (let i=0; i<inv_term_item.length; i++) {
// 		const element=inv_term_item[i];
// 		var item=document.querySelector("#"+element.getAttribute("name"));
// 		termArr.push(item.offsetTop);
// 		if (nowScroll>item.offsetTop) {
// 			termCount=i;
// 		}
// 	}
// 	if (termCount==null) return;
// 	inv_term_item[termCount].classList.add("on");
// }
// function remove() {
// 	if (hssCount==0&&termCount!==null) {
// 		inv_term_item[termCount].classList.remove("on");
// 		termCount=null;
// 	} else if (hasClass<termCount) {
// 		inv_term_item[termCount].classList.remove("on");
// 		inv_term_item[hasClass].classList.add("on");
// 		termCount--;
// 		hasClass--;
// 		hssCount++;
// 	}
// }
// setTimeout(() => {
// 	getItemTop();
// 	scrollListener();
// }, 300);
window.addEventListener("scroll", scrollListener);


var inv_sel=document.querySelector("#inv_term")
var inv_term_item=document.querySelectorAll("#inv_term li");
var nameArr=[];
var areaArr=[];
var rangeArr=[0, 525, 750, 1100];
var termCount=0;
var defaultGo=112;
var scrollState="down";
// 112
for (let i=0; i<inv_term_item.length; i++) {
	const element=inv_term_item[i];
	element.getAttribute("name");
	nameArr.push(element.getAttribute("name"));
	var s=document.querySelector("#"+element.getAttribute("name"));
	areaArr.push(s.offsetTop);

	element.onclick=function () {
		inv_sel.classList.remove('on');
		var nowScroll=window.scrollY;
		var goScroll=areaArr[i]-defaultGo
		console.log('click', areaArr[i], 'defaultGo', defaultGo);
		if (goScroll>nowScroll) {
			goDown(nowScroll, goScroll)
			scrollState="down";
		} else {
			goTop(nowScroll, goScroll)
			scrollState="top";
		}
		// window.scrollTo(0, areaArr[i]-defaultGo);
	}

}
function scrollListener() {
	var nowScroll=window.scrollY;
	console.log('nowScroll', nowScroll);
	if (nowScroll>rangeArr[3]) {
		inv_term_item[0].classList.remove('on')
		inv_term_item[1].classList.remove('on')
		inv_term_item[2].classList.remove('on')
		inv_term_item[3].classList.add('on')
		inv_selbox_txt.innerHTML=inv_term_item[3].innerHTML;
	} else if (nowScroll>rangeArr[2]) {
		inv_term_item[0].classList.remove('on')
		inv_term_item[1].classList.remove('on')
		inv_term_item[2].classList.add('on')
		inv_term_item[3].classList.remove('on')
		inv_selbox_txt.innerHTML=inv_term_item[2].innerHTML;
	} else if (nowScroll>rangeArr[1]) {
		inv_term_item[0].classList.remove('on')
		inv_term_item[1].classList.add('on')
		inv_term_item[2].classList.remove('on')
		inv_term_item[3].classList.remove('on')
		inv_selbox_txt.innerHTML=inv_term_item[1].innerHTML;
	} else if (nowScroll>rangeArr[0]) {
		inv_term_item[0].classList.add('on')
		inv_term_item[1].classList.remove('on')
		inv_term_item[2].classList.remove('on')
		inv_term_item[3].classList.remove('on')
		inv_selbox_txt.innerHTML=inv_term_item[0].innerHTML;
	}
}

function goTop(from, to) {
	console.log('from', from);
	console.log('to', to);
	console.log('w', window.scrollY);
	scrollState="up";
	let scrollTime=setInterval(() => {
		if (from<=to-50) {
			from=to;
			clearInterval(scrollTime);
		} else {
			window.scrollTo(0, from);
			from=from-50;
		}
	}, 0);
}
function goDown(from, to) {
	console.log('from', from);
	console.log('to', to);
	scrollState="down";
	let scrollTime=setInterval(() => {
		if (from>=to) {
			from=to;
			clearInterval(scrollTime);
		} else {
			window.scrollTo(0, from);
			from=from+50;
		}
	}, 0);
}

window.onresize=function () {
	nameArr=[];
	areaArr=[];
	for (let i=0; i<inv_term_item.length; i++) {
		const element=inv_term_item[i];
		element.getAttribute("name");
		nameArr.push(element.getAttribute("name"));
		var s=document.querySelector("#"+element.getAttribute("name"));
		areaArr.push(s.offsetTop);
	}
	if (window.innerWidth>1024) {
		defaultGo=230
	} else {
		defaultGo=100
		areaArr[2]=570;
		areaArr[3]=690;
	}
}


var yearList=document.querySelector("#yearList");
var yearList_li=document.querySelectorAll("#yearList > li");
var yearList_li_count=0;

(function () {
	yearList_li[yearList_li_count].classList.add("on");
	if (window.innerWidth>1024) {
		defaultGo=230
		rangeArr=[0, 525, 750, 1100]
	} else {
		defaultGo=100
		rangeArr=[0, 180, 365, 500]
		areaArr[2]=570;
		areaArr[3]=690;
	}

	for (let i=0; i<areaArr.length; i++) {
		const element=areaArr[i];
		if (window.scrollY<element) {
			inv_term_item[i].classList.add('on')
			return
		}
	}

})();

function isYearList(s) {
	if (s=='inv_allrep') {
		yearList.classList.remove("on");
	} else {
		yearList.classList.add("on");
	}
}
for (let i=0; i<yearList_li.length; i++) {
	const element=yearList_li[i];
	element.onclick=function () {
		if (element.innerHTML=='More') {

		} else {
			yearList_li[yearList_li_count].classList.remove("on");
			yearList_li[i].classList.add("on");
			yearList_li_count=i
		}

	}
}


inv_selbox_txt.onclick=function () {
	inv_sel.classList.toggle('on');
}