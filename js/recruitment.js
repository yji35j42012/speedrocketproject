var recruitment_term=document.querySelectorAll("#recruitment_term > li");
var defaultGo=98+window.innerWidth*0.3-66-103;
var nowScroll=0;
var oldScroll=0;
var scrollState="down";
var termCount=null;
var termArr=[];
var term_refer=document.querySelectorAll("[name=term_refer]");
var hasClass=0;
var hssCount=0;
window.addEventListener("scroll", scrollListener);

function clearTerm() {
	for (let i=0; i<recruitment_term.length; i++) {
		recruitment_term[i].classList.remove("on");
	}
}
function scrollListener() {
	var nowScroll=window.scrollY;
	nowScroll>=oldScroll? (scrollState="down"):(scrollState="up");
	oldScroll=nowScroll;
	if (termCount==null&&nowScroll>termArr[0]&&scrollState=="down") {
		termCount=0;
		recruitment_term[termCount].classList.add("on");
	} else if (nowScroll>termArr[termCount+1]&&scrollState=="down") {
		recruitment_term[termCount].classList.remove("on");
		termCount++;
		recruitment_term[termCount].classList.add("on");
	}
	if (scrollState=="up") {
		get_refer();
		remove();
	}
}
for (let i=0; i<recruitment_term.length; i++) {
	const element=recruitment_term[i];
	element.onclick=function () {
		var item=document.querySelector("#"+element.getAttribute("name"));
		var nowScroll=window.scrollY;
		var goScroll=item.offsetTop+defaultGo;
		if (goScroll>nowScroll) {
			goDown(nowScroll, goScroll);
			scrollState="down";
		} else {
			goTop(nowScroll, goScroll);
			scrollState="up";
			termCount=i;
		}
		clearTerm();
		recruitment_term[i].classList.add("on");
	};
}
function goTop(from, to) {
	scrollState="up";
	let scrollTime=setInterval(() => {
		if (from<=to) {
			from=to;
			clearInterval(scrollTime);
		} else {
			window.scrollTo(0, from);
			from=from-50;
		}
	}, 0);
}
function goDown(from, to) {
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
	defaultGo=98+window.innerWidth*0.3-66-103;
};
function getItemTop() {
	var nowScroll=window.scrollY;
	termArr=[];
	for (let i=0; i<recruitment_term.length; i++) {
		const element=recruitment_term[i];
		var item=document.querySelector("#"+element.getAttribute("name"));
		termArr.push(item.offsetTop);
		if (nowScroll>item.offsetTop) {
			termCount=i;
		}
	}
	if (termCount==null) return;
	recruitment_term[termCount].classList.add("on");
}
function get_refer() {
	hssCount=0;
	for (let i=0; i<term_refer.length; i++) {
		const element=term_refer[i];
		if (element.classList.contains("aos-animate")) {
			hasClass=i;
			hssCount++;
		}
	}
}
function remove() {
	if (hssCount==0&&termCount!==null) {
		recruitment_term[termCount].classList.remove("on");
		termCount=null;
	} else if (hasClass<termCount) {
		recruitment_term[termCount].classList.remove("on");
		recruitment_term[hasClass].classList.add("on");
		termCount--;
		hasClass--;
		hssCount++;
	}
}
setTimeout(() => {
	getItemTop();
	scrollListener();
}, 300);

var mailHandler=document.querySelector("#mailHandler");
mailHandler.onclick=function () {
	const textarea=document.createElement("textarea");
	textarea.value=mailHandler.innerHTML;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	mailHandler.classList.add("on");
	setTimeout(() => {
		mailHandler.classList.remove("on");
	}, 2500);
};

var office=document.querySelectorAll("#recruitment_office_group > .recruitment_office_item")
var lightBox=document.querySelector("#lightBox");
var lightBox_close=document.querySelector("#lightBox_close");
var lightBox_info=document.querySelector("#lightBox_info");


for (let i=0; i<office.length; i++) {
	const element=office[i];
	element.onclick=function () {
		if (window.innerWidth>1024) return
		let num=i+1
		let getPic=document.querySelector(".recruitment_office_item:nth-child("+num+") > img");
		document.querySelector("#lightBox_recruitmentTxt").innerHTML=element.getAttribute("data-office")
		let setPic=document.querySelector("#lightBox_recruitmentPic");
		const child=document.createElement("img");
		child.setAttribute("src", getPic.getAttribute("src"))
		setPic.append(child)
		// element.getAttribute("data-office")
		lightBox.classList.add("on")
		setTimeout(() => {
			lightBox.classList.add("op1")
		}, 20);
	}
}
function lightBox_close_prevHander() {
	lightBox.classList.remove("op1")
	setTimeout(() => {
		lightBox.classList.remove("on");
		document.querySelector("#lightBox_recruitmentPic").innerHTML="";
		document.querySelector("#lightBox_recruitmentTxt").innerHTML="";
	}, 50);
}

if (lightBox_close) {
	lightBox_close.addEventListener('click', lightBox_close_prevHander);
}
if (lightBox) {
	lightBox.addEventListener('click', lightBox_close_prevHander);
}

if (lightBox_info) {
	lightBox_info.onclick=function (event) {
		event.stopPropagation();
	}
}