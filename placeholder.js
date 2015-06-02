var plarr = new Array,
	input = document.getElementsByTagName("input"),
	len;

window.onload = function () {
	for (var i = 0; i < input.length; i++)
		if (input[i].className.indexOf("pl-holder") != -1) {
			alert("yes");
			input[i].value = "";
			input[i].blur();
		}
}

function getClassAll(cName, node) {
	if (!node) {
		node = document.body;
		len = 0;
		plarr.length = 0;
	}
	if (node.className.indexOf(cName) != -1) {
		plarr[len++] = node;
	}
	for (var i = 0; i < node.children.length; i++)
		getClassAll(cName, node.children[i]);
}

function getNextElement(node) {
	if (node.nodeType == 1) {
		return node;
	}
	if (node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	return null;
}

function placeholder() {
	getClassAll("pl-wrap");

	for (var i = 0; i < plarr.length; i++) {
		function pltxt() {
			var that = this;
			if (that.value != "") getNextElement(that.nextSibling).style.display = "none";
			else getNextElement(that.nextSibling).style.display = "inline";
		};
		plarr[i].children[0].onpropertychange = pltxt;
		plarr[i].children[0].onkeydown = function(evt) {
			evt = evt ? evt : window.event;
			var key = evt.keyCode ? evt.keyCode : evt.which;
			if(key != 9 && key != 13)
			getNextElement(this.nextSibling).style.display = "none";
		}
		plarr[i].children[0].onkeyup = pltxt;

		plarr[i].onclick = function (evt) {
			var that = this;
			that.children[0].focus();
		}
	}
}