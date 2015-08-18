app.factory("Camera", ["$q", function($q) {

	var pictureSource;
	var destinationType;


	return {
		getPicture: function(options) {
			var q = $q.defer();

			navigator.camera.getPicture(function(result) {
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, options);

			return q.promise;	
		}
	}
}]);