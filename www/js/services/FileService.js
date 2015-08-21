angular
	.module("Simplegram")
	.factory("FileService", FileService);


function FileService() {

	var images = [];
	var IMAGE_STORAGE_KEY = "images";

	var files = {
		getLoadedImages: getLoadedImages,
		addImage: addImage,
		deleteImage: deleteImage,
		updateImage: updateImage,
		all: images
	}
	return files;

	function getLoadedImages() {
		images = [];
		var data = window.localStorage.getItem(IMAGE_STORAGE_KEY);
		if (data) {
			var parsed = JSON.parse(data);
			for(var x in parsed) {
				images.push(parsed[x]);
			}
		} else {
			console.log("getImages() didn't return shit");
		}
		images.forEach(function(value, index, array) {
			console.log("index: " + index + ", value: " + value.uri);
		});
		return images;
	};

	function addImage(imgURI, date, geo, location) {

		var imageData = {
			uri: imgURI,
			date: date,
			geo: geo,
			location: location
		};

		console.log("FileService.js(46): " + imageData.uri.substring(imageData.uri.length, 8));
		images.push(imageData);
		window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
		images = getLoadedImages();
	};

	function updateImage(imgURI, date, geo, location) {

		var updatedImage = {
			uri: imgURI,
			date: date,
			geo: geo,
			location: location
		};
		console.log("updatedImage: " + updatedImage.uri)
		console.log("images length: " + images.length);
		var updateFlag = 0;
		for(var i=images.length-1; i>=0; i--) {
			if(images[i].uri === imgURI) {
				console.log("uri at index " + i + ": " + images[i].uri);
				images.splice(i, 1, updatedImage);
				console.log("Updated image.");
				updateFlag = 1;
			}
		}
		if(updateFlag===0) console.log("Failed to update image.");
		window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
		images = getLoadedImages();
	}

	function deleteImage(imgURI) {
		console.log("images length before delete: " + images.length);
		for(var i=images.length-1; i>=0; i--) {
			if(images[i].uri === imgURI) images.splice(i, 1);
		}
		console.log("images length after delete: " + images.length);
		window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
		images = getLoadedImages();

	}





}