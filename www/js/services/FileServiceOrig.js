angular
	.module("Simplegram")
	.factory("FileService", FileService);

function FileService() {

	var images = [];
	var IMAGE_STORAGE_KEY = "images";

	function getLoadedImages() {
		var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
		var parsed = JSON.parse(img);
		if (img) {
			for(var x in parsed) {
				images.push(parsed[x]);
			}
		} else {
			console.log("getImages() didn't return shit");
		}
		images.forEach(function(value, index, array) {
			console.log("index: " + index + ", value: " + value);
		});
		return images;
	}

	function addImage(img) {
		images.push(img);
		window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
	}

	return {
		storeImage: addImage,
		getRetrievedImages: getLoadedImages,
		imageLocations: images

	};
}