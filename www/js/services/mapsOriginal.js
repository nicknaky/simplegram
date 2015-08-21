angular
	.module("Simplegram")
	.factory("MapService", ["$http", MapService]);

function MapService($http) {

	var doRequest = function(imageGeo) {
		
		var BASE_URL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
		var lat = imageGeo.coords.latitude;
		var long = imageGeo.coords.longitude;
		var URL = BASE_URL + lat + "," + long;
		console.log("maps api url: " + URL);

		return $http(
			{
			method: "JSONP",
			url: URL + "&callback=JSON_CALLBACK"
			}
		).then();	
	};

	return {
		callMapsAPI: doRequest
	};

}