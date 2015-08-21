angular
	.module("Simplegram")
	.controller("CameraCtrl", [	"$scope", 
								"FileService", 
								"$window", 
								"$ionicSideMenuDelegate",
								"MapService",
								"GeoService",
								"SettingsService",
								CameraCtrl]);


function CameraCtrl($scope, FileService, $window, $ionicSideMenuDelegate, MapService, GeoService, SettingsService) {

	//Side menu section
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.delete = function(uri) {
		FileService.deleteImage(uri);
		$scope.images = FileService.getLoadedImages();
	};
	
	$scope.geoMode = SettingsService.get("GEOMODE");

	$scope.toggleGeoMode = function(isChecked) {
		SettingsService.set("GEOMODE", isChecked);
		console.log("GEOMODE is: " + isChecked);
	};



	$scope.camChoice = {

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
			allowEdit: false,
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
		var geo = null;
		var location = null;

		FileService.addImage(imageURI, date, geo, location);
		$scope.images = FileService.getLoadedImages();
		console.log("geoMode: " + $scope.geoMode);
		if ($scope.geoMode === "true"){
			GeoService.getGeolocation(imageURI);	
		}
		$scope.$apply();

	}

	function cameraError(error) {
		alert("Failed because: " + message);
	}

}







