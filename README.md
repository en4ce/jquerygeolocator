jQuery Geolocator
=================
With this plugin you can easily interact with the JavaScript Geolocation API

# How to use

$.geolocator.getLocation(function(response){
	r = response;
	alert('Lat ' + response.lat + ' - Lng ' + response.lng);
}, function(response){
	r = response;
	alert(response.message);
});