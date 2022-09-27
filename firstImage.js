function firstImage(noiDung) {
	//var regExp = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g; có thẻ img cái gì đó
	var regExp = /^.+.(jpg|jpeg|png|gif|bmp|svg|webp)$/gim;
	var results = regExp.exec(noiDung);
	var image = './images/noimage.png';
	if(results)
	{
		image = results[0];
	}
	return image;
}

module.exports = firstImage;