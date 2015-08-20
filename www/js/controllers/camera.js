app.controller("CameraCtrl", ["$scope", "FileService", "$window", "$ionicSideMenuDelegate", function($scope, FileService, $window, $ionicSideMenuDelegate) {

	//Side menu section
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.geoMode = {
		checked: false
	};

	$scope.camChoice = {

	};

	function geoLocationSuccess(position) {
		console.log("Latitude: " + position.coords.latitude);
	}

	$scope.printStatus = function() {
		console.log($scope.geoMode.checked);
		navigator.geolocation.getCurrentPosition(geolocationSuccess);

	};



	//Camera and photo files section

	var imagesArray = [];

	var destinationType, pictureSource;
	var cameraOptions, imageOptions;

	$scope.deviceHeight = (Math.floor($window.innerWidth * .85)) + "px";
	$scope.deviceWidth = (Math.floor($window.innerWidth)) + "px";
	$scope.half = Math.floor($window.innerWidth) / 2 * -1;

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

		cameraOptions = {
			quality: 75,
			destinationType: destinationType.NATIVE_URI,
			sourceType: pictureSource.CAMERA,
			targetWidth: 640,
			targetHeight: 640
		};

		imageOptions = {
			quality: 75,
			destinationType: destinationType.NATIVE_URI,
			sourceType: pictureSource.PHOTOLIBRARY,
			mediaType: Camera.MediaType.PICTURE,
			targetWidth: 640,
			targetHeight: 640
		};	
		console.log("Device Ready");
		imagesArray = FileService.getRetrievedImages();
		$scope.images = imagesArray;
	}


	$scope.openCamera = function() {
		navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
	}; 

	$scope.openMediaFile = function() {
		navigator.camera.getPicture(cameraSuccess, cameraError, imageOptions);
	};

	function cameraSuccess(imageURI) {
		console.log("Camera Success Callback");
		FileService.storeImage(imageURI);

		var stringify = JSON.stringify(imageURI);
		var parsed = JSON.parse(stringify);
		console.log("imagesArray: " + imagesArray.length());
		console.log("$scope.images: " + $scope.images.length());
		console.log("imageURI: " + imageURI);
		console.log("parsed: " + parsed);
		imagesArray.push(parsed);
		console.log("log line 57: after imagesArray.push(parsed");
		$scope.images = imagesArray;
	}

	function cameraError(error) {
		alert("Failed because: " + message);
	}

}]);



