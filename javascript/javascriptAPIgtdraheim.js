$(document).ready(function() {
	var map;

	$("#submit").on("click", function() {
	
	var key = "&key=F411ff9725d287d4138503a0c95030a6"
	var AnimURL = "http://api.petfinder.com/pet.find?format=json"

	var zip = "44113"
	var locationQuery = "&location=" + zip;
	var locationID = "";

	var catDogSelect = "dog";
	var catDogQuery = "&animal=";
	var catDogAnim = "";

	// refined search variables
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
			displayAnimHTML(nameID);			

			console.log("locationID: " + locationID);
			displayAnimHTML(locationID);

			ageID = respAbrev[index].age.$t;
			console.log(ageID);
			displayAnimHTML(ageID);

			catDogAnim = respAbrev[index].animal.$t;
			console.log(catDogAnim);
			displayAnimHTML(catDogAnim);

			sexID = respAbrev[index].sex.$t;
			displayAnimHTML(sexID);

			if (Array.isArray(respAbrev[index].breeds.breed)) {
				breedID = respAbrev[index].breeds.breed[0].$t + "/ " + respAbrev[index].breeds.breed[1].$t + " mix";
					
			} else
			 { breedID = respAbrev[index].breeds.breed.$t };

			displayAnimHTML(breedID);
			console.log("breedID: " + breedID);			

			sizeID = respAbrev[index].size.$t;
			displayAnimHTML(sizeID);

			var photo = respAbrev[index].media.photos.photo[2].$t;

			console.log(photo);

			$('#picture').attr('src', photo);

			var mapButton = $('<button>');

			$(mapButton).attr('id', "view");

			$('.text').append(mapButton);



			// $('#picture').attr('src', newImg);

		})

		function displayAnimHTML(feature) {
			$('.text').append('<br>' + feature);
		}

		 function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.4931, lng: -81.6790},
          zoom: 12

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
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

        });

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