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
	//setting images to the array
	var choiceArr = [
    { image: "assets/images/cat.png",
	  alt: "cat" }, 
    { image: "assets/images/dog.png",
      alt: "dog" }
	];

	var name = "";
	var age = 0;
	var photo = "";

	var petTable = $(".table");
	var newBody;
	var newTr;


	//function to get the images to page
	function images () {
		for (var i = 0; i < choiceArr.length; i++) {
			var choiceDisplay = $("<img>");
			choiceDisplay.addClass("choice-image");
			choiceDisplay.attr("src", choiceArr[i].image);
			choiceDisplay.attr("alt", choiceArr[i].alt);
			$("#pet-choices").prepend(choiceDisplay);
		}
	};


	images();
		$('.fliper-btn').click(function(){
		$('.flip').find('.card').toggleClass('flipped');
	});

	  database.ref().on("child_added", function(childSnapshot) {

      data = childSnapshot.val();
      var dataArr = Object.keys(data);
      console.log(dataArr);

      		//append save searches to page
      		function displayFavorite() {
            newBody = $("<tbody class = 'pet-group'>");
			newTr = $("<tr class = 'pet-row'>");
            var imageTd = $("<td class = 'pet-image'>");
            var nameTd = $("<td class = 'pet-name'>");
            var sexTd = $("<td class = 'pet-sex'>");

            var thumbDisplay = $("<img>");
            thumbDisplay.addClass("pet-image");
			thumbDisplay.attr("src", data.photo);
   
            imageTd.append(thumbDisplay);
            nameTd.append(data.name);
            sexTd.append(data.sex);

            //for (var i = 0; i < dataArr.length; i++) {
             	// newBody.attr("data-value", i);
             	// newBody.append(newTr);
        	//}
 			
            newTr.append(imageTd);
            newTr.append(nameTd);
            newTr.append(sexTd);
            newBody.append(newTr)
            petTable.append(newBody);  

        $(".pet-group").on("click", function() {
      	var petValue = ($(this).attr("data-name", data));
      	$(".details").html(petValue);

      });

        };

        displayFavorite();

    },  

      function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });      



});