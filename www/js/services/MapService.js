//geolocation stuff
//api key: AIzaSyAfxptdFcXScMEnAJhk-VNpRxr_ksPos8o
//http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452
//index3 and index 5, city, state

angular
	.module("Simplegram")
	.factory("MapService", ["$http", "FileService", MapService]);

function MapService($http, FileService) {

	var doRequest = function(image) {
		var imageData = image;
		var BASE_URL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
		var lat = imageData.geo.coords.latitude;
		var long = imageData.geo.coords.longitude;
		var URL = BASE_URL + lat + "," + long;
		console.log("maps api url: " + URL);

		return $http(
			{
			method: "GET",
			url: URL
			}
		).then(function(response) {
			console.log(response);
			var city = response.data.results[0].address_components[2].long_name;
			var state = response.data.results[0].address_components[4].short_name;
			var location = city + ", " + state;
			console.log("location: " + location);
			FileService.updateImage(imageData.uri, imageData.date, imageData.geo, location);
		});	
	};

	return {
		callMapsAPI: doRequest
	};

}