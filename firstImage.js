function firstImage(noiDung) {
	//var regExp = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g; có thẻ img cái gì đó
	var regExp = /^.+.(jpg|jpeg|png|gif|bmp|svg|webp)$/gim;
	var results = regExp.exec(noiDung);
	var image = 'http://localhost:3000/images/1.jpg';
	if(results)
	{
		image = results[0];
	}
	return image;
}/*
function firstImage(moTa) {
	var regExp = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
	var results = regExp.exec(moTa);
	var image = 'http://localhost:3000/images/1.';
	if(results) image = results[1];
	return image;
}
*/
module.exports = firstImage;