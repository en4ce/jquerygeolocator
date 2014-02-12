(function($){
	function GeolocatorResponse(status, position) {
		this.name = 'GeolocatorResponse';
		this.__proto__ = position;		
		
		this.status = status || $.geolocator.Status.UNKNOWN;
		this.lat = position.coords.latitude || null;
		this.lng = position.coords.longitude || null;		
	};
	
	function GeolocatorError(status, message) {
		this.name = 'GeolocatorError';
		
		this.prototype = Error.prototype;
		this.status = status || $.geolocator.Status.UNKNOWN;
		this.message = message || $.geolocator.defaults.Message.UNKNOWN;
	}
		
	$.geolocator = function(){};
	
	$.geolocator.defaults = {
		Message : {
			PERMISSION_DENIED : "User denied the request for Geolocation.",
			POSITION_UNAVAILABLE : "Location information is unavailable.",
			TIMEOUT : "The request to get user location timed out.",
			UNKNOWN : "An unknown error occurred.",				
			NOT_SUPPORTED : "Geolocation is not supported by this browser.",
		}
	};
	
	$.geolocator.version = '1.0.0';
	
	$.geolocator.Status = {
		COMPLETED : 0,
		PERMISSION_DENIED : 1,
		POSITION_UNAVAILABLE : 2,
		TIMEOUT : 3,
		UNKNOWN : 4,
		NOT_SUPPORTED : 5
	};
	
	$.geolocator.getLocation = function(success, failure) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position){
					var response = new GeolocatorResponse($.geolocator.Status.COMPLETED, position);
					
					success(response);
				},
				function(error){
					var response = new GeolocatorError(error.code);
					
					switch(error.code) {
					case error.PERMISSION_DENIED:
						response.message = $.geolocator.defaults.Message.PERMISSION_DENIED;
						break;
					case error.POSITION_UNAVAILABLE:
						response.message = $.geolocator.defaults.Message.POSITION_UNAVAILABLE;
						break;
					case error.TIMEOUT:
						response.message = $.geolocator.defaults.Message.TIMEOUT;
						break;
					case error.UNKNOWN_ERROR:
						response.message = $.geolocator.defaults.Message.UNKNOWN;
						break;
					}
					
					failure(response);
				}
			);
		}
	};
	
})(jQuery);