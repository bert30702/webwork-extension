function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
function getGrade(links) {
	var ans = "";
	for(i = 0; i < links.length; i ++) {
		var st = String(links[i]);
		var id = st.indexOf("grades");
		if(id != -1) ans = st;
	}

	var map = {};
	var text = httpGet(ans);
	for(i = 0; i < text.length; i ++) {
		if(text[i] == '%') {
			var a = i - 1;
			while(text[a] != '>') a --;
			var b = a;
			while(text.substr(b, "</a>".length) != "</a>") b --;
			var c = b;
			while(text[c] != '>') c --;
			map[text.substr(c + 1, b - c - 1)] = text.substr(a + 1, i - a);
		}
	}
	return map;
}
var map = getGrade(document.links);
var text = document.body.textContent;
var target = "open";
var GG = "will";
for(i = 0; i < text.length - target.length; i ++) {
	if(text.substr(i, GG.length) == GG) i += 20;
	if(text.substr(i, target.length) == target) {
		var j = i - 2;
		while(text[j] != ' ') j --;
		var homeworkID = text.substr(j + 1, i - j - 2);
		if(homeworkID in map) {
			var re = new RegExp(">" + homeworkID + "<", 'g');
			document.body.innerHTML = document.body.innerHTML.replace(re, 
				">" + homeworkID + "</a><a = style=\"color:DodgerBlue;\">  " + map[homeworkID] + "<"
			);
		}
	}
}