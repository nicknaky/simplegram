angular
	.module("Simplegram")
	.factory("GeoService",["MapService", GeoService]);

function GeoService(MapService) {

	var geoGetter = {
		getGeolocation: getGeolocation
	};
	return geoGetter;

	function getGeolocation(imageURI) {
		var date = new Date();
		var geolocationOptions = {
			enableHighAccuracy: true
		};	

		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);

		function geolocationSuccess(position) {
			console.log("Latitude: " + position.coords.latitude);

			var localImage = {
				uri: imageURI,
				date: date,
				geo: position,
				location: "Loading..."
			}
			MapService.callMapsAPI(localImage);
		}

		function geolocationError(error) {
			console.log("geolocation error: " + error.message + "\n" + "code: " + error.code);
			alert("geolocation error: " + error.message);
		}
	}
}