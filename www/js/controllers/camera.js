app.controller("CameraCtrl", function($scope) {

	var destinationType, pictureSource;
	var cameraOptions, imageOptions;

	$scope.test = "test";

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
		console.log("cordova.file: " + cordova.file);
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

		cameraOptions = {
			quality: 75,
			destinationType: destinationType.NATIVE_URI,
			sourceType: pictureSource.CAMERA,
			targetWidth: 300,
			targetHeight: 300,
			mediaType: Camera.MediaType.PICTURE
		};

		imageOptions = {
			quality: 75,
			destinationType: destinationType.NATIVE_URI,
			sourceType: pictureSource.PHOTOLIBRARY,
			targetWidth: 300,
			targetHeight: 300,
			mediaType: Camera.MediaType.PICTURE
		};

		console.log(JSON.stringify(cameraOptions));
		console.log("Device Ready");
	}

	$scope.openCamera = function() {
		console.log("Opening camera");
		navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
	}; 

	function cameraSuccess(imageURI) {
		console.log("Camera Success Callback");
		var image = document.getElementById("myImage");
		console.log("typeof(image): " + typeof(image));
		console.log("image.tagName: " + image.tagName);
		console.log("imageURI: " + imageURI);
		image.src = imageURI;
		//$scope.imgURI = imageURI;
		//console.log("$scope.imgURI: " + $scope.imgURI);
		console.log("image.src: " + image.src);
	}



	function cameraError(error) {
		alert("Failed because: " + message);
	}

	$scope.openMediaFile = function() {
		console.log("Accessing media files");
		navigator.camera.getPicture(cameraSuccess, cameraError, imageOptions);
	};

});



/*

	$scope.openCamera = function() {
		console.log("openCamera");
		Camera.getPicture().then(function(imageURI) {
			console.log(imageURI);
			$scope.lastPhoto = imageURI;
		}, function(err) {
			console.err(err);
		}, {
			quality: 75,
			targetWidth: 320,
			targetHeight: 320,
			saveToPhotoAlbum: false
		});
	};
*/
/*
	$scope.openCamera = function() {
		navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
	};

	function cameraSucess(imageData) {
		var image = document.getElementById("myImage");
		image.src = "data:image/jpeg;base64," + imageData;
	}

	function cameraError(message) {
		alert("Failed because: " + message);
	}

	var cameraOptions = {

	}
*/