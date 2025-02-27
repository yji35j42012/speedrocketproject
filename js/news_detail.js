var shareHanler = document.querySelectorAll("[name=shareHanler]");
var webUrl = "";
var shareUrl ="";
for (let i = 0; i < shareHanler.length; i++) {
	const element = shareHanler[i];
	element.onclick = function() {
		var shareId = element.id;
		switch (shareId) {
			case "fb":
				webUrl = "https://www.facebook.com/sharer/sharer.php?u=";
				shareurl =  location.href;
				window.open(
					webUrl + shareurl,
					"targetWindow",
					"toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=450"
				);
				break;
			case "twitter":
				webUrl = "https://twitter.com/share?text=";
				shareurl =  location.href;
				window.open(webUrl + shareurl);
				break;
			case "in":
				webUrl = "https://www.linkedin.com/sharing/share-offsite/?url=";
				shareurl =  location.href;
				window.open(webUrl + shareurl);
				break;
			default:
				break;
		}
		console.log("shareId", shareId);
		console.log("webUrl", webUrl);
	};
}
