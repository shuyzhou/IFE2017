var imageFactory = function (src,caption,wrapper) {
	var imgNode = document.createElement('img');
	var spanNode = document.createElement('span');
	var li = document.createElement('li');
	imgNode.setAttribute('width','150');
	imgNode.setAttribute('height','150');
	spanNode.innerHTML = caption;
	li.appendChild(imgNode);
	li.appendChild(spanNode);
	imgNode.src = src;
	wrapper.appendChild(li);
}