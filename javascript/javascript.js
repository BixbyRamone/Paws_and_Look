$(document).ready(function() {

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

	//setting cat dog images to an array
	var choiceArr = [
    { image: "assets/images/cat.png",
	  alt: "cat" }, 
    { image: "assets/images/dog.png",
      alt: "dog" }
	];

	//declaring global variables for the pet favorites
	var name = "";
	var age = 0;
	var photo = "";
	var petTable = $(".table");
	var newBody;
	var newTr;
	var imageTd;
	var nameTd;
	var sexTd;


	//function to get the cat/dog choices to page
	function images () {
		for (var i = 0; i < choiceArr.length; i++) {
			var choiceDisplay = $("<img>");
			choiceDisplay.addClass("choice-image");
			choiceDisplay.attr("src", choiceArr[i].image);
			choiceDisplay.attr("alt", choiceArr[i].alt);
			$("#pet-choices").prepend(choiceDisplay);
		}
	};

	//calling function  for cat dog pics
	images();

	//function for flip animations
		$('.fliper-btn').click(function(){
		$('.flip').find('.card').toggleClass('flipped');
	});

	  database.ref().on("child_added", function(childSnapshot) {


      data = childSnapshot.val();
      var dataArr = Object.keys(data);

      		// fucntion to append users save searches to page
      		function displayFavorite() {

      		//creates classes for table
	      	newBody = $("<tbody class = 'pet-group'>");
			newTr = $("<tr class = 'pet-row'>");
	        imageTd = $("<td class = 'pet-image'>");
	        nameTd = $("<td class = 'pet-name'>");
	        sexTd = $("<td class = 'pet-sex'>");

	        //creates a containter for thumbnail
            var thumbDisplay = $("<img>");
            thumbDisplay.addClass("pet-image");
			thumbDisplay.attr("src", data.photo);
   
   			//adding data to classes
            imageTd.append(thumbDisplay);
            nameTd.append(data.name);
            sexTd.append(data.sex);

            //appending data to page
 			nameTd.addClass("center");
 			sexTd.addClass("center");
            newTr.append(imageTd);
            newTr.append(nameTd);
            newTr.append(sexTd);
            newBody.append(newTr);

            //gives data attributes to each pet group
      		newBody.attr("data-image", data.photo);
      		newBody.attr("data-name", data.name);
      		newBody.attr("data-sex", data.sex);
      		newBody.attr("data-age", data.age);
      		newBody.attr("data-breed", data.breed);

      		//and finally writing every single thing to the HTML
            petTable.append(newBody);  


		};
        
        displayFavorite();

        
        //event for when a user clicks on a pet group
        $(".pet-group").on("click", function () {
        		//calling the data attributes for the group
				imageValue = $(this).attr("data-image");
				nameValue = $(this).attr("data-name");
	      		sexValue = $(this).attr("data-sex");
	      		ageValue = $(this).attr("data-age");
	      		breedValue = $(this).attr("data-breed");

	      		//emptying out the div and displaying the user's selection
				$(".main-login").empty();
				$('html, body').animate({ scrollTop: 150 }, 'fast');
				$(".main-login").html("<a href= 'favorite-pets.html'><i class='fa fa-arrow-left'</a>");
				var imageDisplay = $("<img>");
				imageDisplay.addClass("image");
				imageDisplay.attr("src", imageValue);
				$(".main-login").append("<div class=image>");
				$(".main-login").append("<div class=name>");
				$(".main-login").append("<div class=sex>");
				$(".main-login").append("<div class=age>");
				$(".main-login").append("<div class=breed>");
				$(".image").append(imageDisplay);
				$(".name").append(nameValue);
				$(".sex").append(sexValue);
				$(".age").append(ageValue);
				$(".breed").append(breedValue);
		});


    },  

      function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });      



});