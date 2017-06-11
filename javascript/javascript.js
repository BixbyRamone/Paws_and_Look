$(document).ready(function() {


	//setting images to the array
	var choiceArr = [
    { image: "assets/images/cat.png",
	  alt: "cat" }, 
    { image: "assets/images/dog.png",
      alt: "dog" }
	];

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

});