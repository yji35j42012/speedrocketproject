var mailHandler = document.querySelectorAll("[name=mailHandler]");
console.log("mailHandler", mailHandler);

for (let i = 0; i < mailHandler.length; i++) {
	const element = mailHandler[i];
	element.onclick = function() {
		const textarea = document.createElement("textarea");
		textarea.value = element.innerHTML;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		element.classList.add("on");
		setTimeout(() => {
			element.classList.remove("on");
		}, 2500);
	};
}
