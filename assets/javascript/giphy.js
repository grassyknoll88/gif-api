var character = [
	"Michael Scott",
	"Dwight Schrute",
	"Jim Halpert",
	"Pam Beesley",
	"Creed Bratton",
	"Stanley Hudson",
	"Kevin Malone",
	"Meredith Palmer",
	"Ryan Howard",
	"Oscar Martinez",
];
var currentGif;
var pausedGif;
var animatedGif;
var staticGif;

//creates buttons from array
function createButtons() {
	$("#characterButtons").empty();
	for (var i = 0; i < character.length; i++) {
		var officeBtn = $("<button>")
			.text(character[i])
			.addClass("officeBtn")
			.attr({ "data-name": character[i] });
		$("#characterButtons").append(officeBtn);
	}

	//displays gifs on click
	$(".officeBtn").on("click", function() {
		$(".display").empty();


		var thisCharacter = $(this).data("name");
		var queryURL =
			"https://api.giphy.com/v1/gifs/search?q=" +
			thisCharacter +
			"&limit=10&api_key=VqbG1fTNAeDDTWPxPdaDC6nCFb09FrXG";
		$.ajax({ url: queryURL, method: 'GET' }).then(function(giphy) {
			currentGif = giphy.data;
			$.each(currentGif, function(index, value) {
				animatedGif = value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				if (thisRating == "") {
					thisRating = "unrated";
				}
				var rating = $("<h5>")
					.html("Rated: " + thisRating)
					.addClass("ratingStyle");
					staticGif = $("<img class='gif'>")
					.attr("data-animated", animatedGif)
					.attr("data-paused", pausedGif)
					.attr("src", pausedGif)
					.attr("data-state", "paused")
				var fullGifDisplay = $("<button>").append(rating, staticGif);
				$(".display").append(fullGifDisplay);
			});
			//animates and pauses gif on click
			$('.gif').on("click", function() {
			  var state = $(this).attr("data-state");
			     if( state === "paused"){
					$(this).attr('src', $(this).attr("data-animated"));
					$(this).attr("data-state", "playing");
				} else {
					$(this).attr("src", $(this).attr("data-paused"));
					$(this).attr("data-state", "paused");
				}
			});
		});
	});
}

//generates a button from input
$("#addCharacter").on("click", function() {
	if($("#newCharacterInput").val().length > 0){
		var newCharacter = $("#newCharacterInput").val().trim();
		character.push(newCharacter);
		createButtons();
		$("#newCharacterInput").val("");
		return false;
		
	};
});

createButtons();
