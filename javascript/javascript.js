$(document).ready(function() {

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCj_AZGEOgcPxJj6-qlIAjeE7o_uIGpoxY",
    authDomain: "pawsandlook-c56d5.firebaseapp.com",
    databaseURL: "https://pawsandlook-c56d5.firebaseio.com",
    projectId: "pawsandlook-c56d5",
    storageBucket: "pawsandlook-c56d5.appspot.com",
    messagingSenderId: "555976363149"
    };
  
    firebase.initializeApp(config);

    var database = firebase.database();

	$("#submit").on("click", function() {

		event.preventDefault();
		
		$("petDiv").empty();

		var zipInput = $("#zip").val();
		var userZip = '&location=' + zipInput;
		var pfApiUrl = "http://api.petfinder.com/pet.find?format=json&key=f411ff9725d287d4138503a0c95030a6&count=1&output=basic"
		var queryURL = pfApiUrl + userZip;
		console.log(queryURL);

		$.ajax({
			url: queryURL,
			dataType: "jsonp",
			method: "GET"
		}).done(function(response) {

			console.log(response);

		    var petInfo = {
			animal: response.petfinder.pets.pet.animal.$t,
			breed: response.petfinder.pets.pet.breeds.breed.$t,
			sex: response.petfinder.pets.pet.sex.$t,
			name: response.petfinder.pets.pet.name.$t,
			age: response.petfinder.pets.pet.age.$t,
			//address1: response.petfinder.pets.pet.contact.address1.$t,
			//address2: response.petfinder.pets.pet.contact.address2.$t,
			//city: response.petfinder.pets.pet.contact.city.$t,
			//state: response.petfinder.pets.pet.contact.state.$t,
			//zip: response.petfinder.pets.pet.contact.zip.$t,
			//phone: response.petfinder.pets.pet.contact.phone.$t,
			//email: response.petfinder.pets.pet.contact.email.$t,
			photo: response.petfinder.pets.pet.media.photos.photo[2].$t
		    }
		
		    console.log(petInfo);

			$("#petDiv").append("<p>" + response.petfinder.pets.pet.animal.$t + "</p>");
			$("#petDiv").append("<p>" + response.petfinder.pets.pet.breeds.breed.$t + "</p>");
			$("#petDiv").append("<p>" + response.petfinder.pets.pet.sex.$t + "</p>");
			$("#petDiv").append("<p>" + response.petfinder.pets.pet.name.$t + "</p>");
			$("#petDiv").append("<p>" + response.petfinder.pets.pet.age.$t + "</p>");
			$("#petDiv").append("<li>" + response.petfinder.pets.pet.contact.address1.$t + "</li>");
			$("#petDiv").append("<li>" + response.petfinder.pets.pet.contact.address2.$t + "</li>");
			$("#petDiv").append("<li>" + response.petfinder.pets.pet.contact.city.$t + "</li>");
			$("#petDiv").append("<li>" + response.petfinder.pets.pet.contact.state.$t + "</li>");
			$("#petDiv").append("<li>" + response.petfinder.pets.pet.contact.zip.$t + "</li>");
			$("#petDiv").append("<li>" + response.petfinder.pets.pet.contact.phone.$t + "</li>");
			$("#petDiv").append("<li>" + response.petfinder.pets.pet.contact.email.$t + "</li>");
			$("#petDiv").append("<img src=" + response.petfinder.pets.pet.media.photos.photo[2].$t + "/>");

			database.ref().push(petInfo);	
		});
	});
});