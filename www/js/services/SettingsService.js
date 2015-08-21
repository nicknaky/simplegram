angular
	.module("Simplegram")
	.factory("SettingsService", [SettingsService]);

function SettingsService() {
	
	var settings = {
		set: set,
		get: get
	}
	return settings;

	function set(key, value) {
		window.localStorage.setItem(key, value);
		console.log("Saving Settings: " + key + " : " + value);
	}

	function get(key) {	
		var defaultValue;
		switch(key) {
			case "GEOMODE": 
				defaultValue = true;
				break;
			default: 
				console.log("No " + key + " found in settings."); 
				return null;
		}	
		var results = window.localStorage.getItem(key) || defaultValue;
		if(results === defaultValue) {
			console.log("Unable to load " + key);
		} else {
			console.log("Loading Settings: " + key + " : " + results);	
		}
		return results;
		
	}
}