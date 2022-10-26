function picture(name) {
	var image = 'http://localhost:3000/images/1.jpg';
	if(name!='')
	{
		image = 'http://localhost:3000/images/';
	}
	return image;
}
module.exports = picture;