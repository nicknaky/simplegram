angular
	.module("Simplegram")
	.controller("CameraCtrl", [	"$scope", 
								"FileService", 
								"$window", 
								"$ionicSideMenuDelegate",
								"MapService",
								CameraCtrl]);


function CameraCtrl($scope, FileService, $window, $ionicSideMenuDelegate, MapService) {

	//Side menu section
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.delete = function(uri) {
		FileService.deleteImage(uri);
		$scope.images = FileService.getLoadedImages();
	};
	

	$scope.geoMode = {
		checked: false
	};

	$scope.camChoice = {

	};


	function geolocationError(error) {
		console.log("geolocation error: " + error.message + "\n" + "code: " + error.code);
		alert("geolocation error: " + error.message);
	}

	var geolocationOptions = {
		enableHighAccuracy: true
	};

	$scope.printStatus = function() {
		console.log($scope.geoMode.checked);
		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);

	};

	//Camera and photo files section

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
		$scope.images = FileService.getLoadedImages();
		console.log($scope.images);
		$scope.$apply();
	}


	$scope.openCamera = function() {
		navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
	}; 

	$scope.openMediaFile = function() {
		navigator.camera.getPicture(cameraSuccess, cameraError, imageOptions);
	};

	function cameraSuccess(imageURI) {
		console.log("Camera Success Callback");
		var date = new Date();

		FileService.addImage(imageURI, date);
		$scope.images = FileService.getLoadedImages();

		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);

		function geolocationSuccess(position) {
			console.log("Latitude: " + position.coords.latitude);

			var localImage = {
				uri: imageURI,
				date: date,
				geo: position,
				location: null
			}
			MapService.callMapsAPI(localImage);
		}

	}

	function cameraError(error) {
		alert("Failed because: " + message);
	}

}



