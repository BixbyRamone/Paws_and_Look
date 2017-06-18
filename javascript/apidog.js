$(document).ready(function() {
	var map;
	$('#view-map').hide();

	$("#negative").on("click", function() {
	
	var key = "&key=F411ff9725d287d4138503a0c95030a6"
	var AnimURL = "http://api.petfinder.com/pet.find?format=json"

// variables for user input and petfinder api output
	var zip = "20882"
	var locationQuery = "&location=" + zip;
	var locationID = "";
	var locLat = 0;
	var locLong = 0;

	var catDogSelect = "dog";
	var catDogQuery = "&animal=";
	var catDogAnim = "";

	var ageSelect = "";
	var ageQuery = "&age="; // age = age + "adult"
	var ageID = "";

	var sexSelect = "";
	var sexQuery = "&sex="; // sex = sex + "F"
	var sexID = "";

	var breedSelect = "";
	var breedQuery = "&breed="; // needs further investigation
	var breedID = "";

	var sizeSelect = "";
	var sizeQuery = "&size="; // size = size + "S"; also "M" "L" & "XL"
	var sizeID = "";
		
	var queryURL = AnimURL + key + locationQuery + catDogQuery  + catDogSelect + ageQuery + ageSelect + sexQuery + sexSelect + breedQuery + breedSelect + sizeQuery + sizeSelect;
	queryURL = queryURL.replace(" ", "+");

	console.log(queryURL);

		$.ajax({
			url: queryURL,
			dataType: "jsonp",
			method: "GET"
		}).done(function(response) {

			var index = Math.floor((Math.random() * 24) + 0);
			console.log("random index: " + index);

			console.log(response);			
// getting animal location
			var respAbrev = response.petfinder.pets.pet;
			var addr = respAbrev[index].contact.address1.$t;
			var city = respAbrev[index].contact.city.$t;
			var state = respAbrev[index].contact.state.$t;
			var zipID = respAbrev[index].contact.zip.$t;
// format animal location into standard format

			locationID = addr + ", " + city + ", "  + state + zipID;
			// locationID = locationID.replace('"', " "); 
			var nameID = respAbrev[index].name.$t;
			displayNameHTML(nameID);			

			// console.log("locationID: " + locationID);
			// displayAnimHTML(locationID);

			// ageID = respAbrev[index].age.$t;
			// console.log(ageID);
			// displayAnimHTML(ageID);

			// catDogAnim = respAbrev[index].animal.$t;
			// console.log(catDogAnim);
			// displayAnimHTML(catDogAnim);

			// sexID = respAbrev[index].sex.$t;
			// displayAnimHTML(sexID);

			if (Array.isArray(respAbrev[index].breeds.breed)) {
				breedID = respAbrev[index].breeds.breed[0].$t + "/ " + respAbrev[index].breeds.breed[1].$t + " mix";
					
			} else
			 { breedID = respAbrev[index].breeds.breed.$t };

			// displayAnimHTML(breedID);
			// console.log("breedID: " + breedID);			

			// sizeID = respAbrev[index].size.$t;
			// displayAnimHTML(sizeID);

			var photo = respAbrev[index].media.photos.photo[2].$t;

			console.log(photo);

			$('#dogimage').attr('src', photo);

			$('#view-map').show();





			// $('#picture').attr('src', newImg);

		})

		function displayNameHTML(feature) {
			$('#petName').html(feature);
		}

		$("#view-map").on("click", function() {

		var mapURL = "https://maps.googleapis.com/maps/api/geocode/json?address="

		var mapAddress = locationID;

		mapURL = mapURL + mapAddress;
		mapURL = mapURL.replace(/ /g, "+");


		console.log("mapuURL: " + mapURL);

		$.ajax({
			url: mapURL,
			method: "GET"
		}).done(function(response) {

			console.log(response);

			var responseLoc = response.results[0].geometry.location;
			locLat = responseLoc.lat;
			locLong = responseLoc.lng;

			console.log(locLat);
			console.log(locLong);

			console.log("long&lat: " + locLat + ", " + locLong);

        	var markerOptions = {
    			position: new google.maps.LatLng(locLat, locLong)
				};
				var marker = new google.maps.Marker(markerOptions);
				marker.setMap(map);


		});

		var mapOptions = {
			panControl: false,
			zoomControl: false
		}

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.4931, lng: -81.6790},
          zoom: 11,
          mapOptions

        });

        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


      		})

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

        })

// function mapAPI() {
// 		//map api

// 		var mapURL = "https://maps.googleapis.com/maps/api/geocode/json?address="

// 		var mapAddress = locationID;

// 		mapAddress = mapURL + locationID;

// 		console.log("mapuURL: " + mapURL);

// 		var mapQueryURL 
// 		// var mapOptions = {
//   //   		center: new google.maps.LatLng(41.4931,-81.6790),
//   //  			zoom: 12,
//   //   		mapTypeId: google.maps.MapTypeId.ROADMAP
// 		// };

// 		new google.maps.Map(document.getElementById('map'), mapOptions);
// 	}

	
});