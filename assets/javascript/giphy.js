var showTitle = [
	"Smallville",
	"The Office",
	"Cheers",
	"Last Kingdom",
	"Home Improvement",
	"Friends",
	"Boy Meets World",
	"Frasier",
	"The Flash",
	"Parks and Recreation",
];
var currentGif;
var pausedGif;
var animatedGif;
var staticGif;

//creates buttons
function createButtons() {
	$("#TVButtons").empty();
	for (var i = 0; i < showTitle.length; i++) {
		var showBtn = $("<button>")
			.text(showTitle[i])
			.addClass("showBtn")
			.attr({ "data-name": showTitle[i] });
		$("#TVButtons").append(showBtn);
	}

	//displays gifs on click
	$(".showBtn").on("click", function() {
		$(".display").empty();

		var thisShow = $(this).data("name");
		var queryURL =
			"http://api.giphy.com/v1/gifs/search" +
			thisShow +
			"&limit=10&api_key=VqbG1fTNAeDDTWPxPdaDC6nCFb09FrXG";
		$.ajax({ url: queryURL, method: 'GET' }).done(function(giphy) {
			currentGif = giphy.data;
			$.each(currentGif, function(index, value) {
				animatedGif = value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if (thisRating == "") {
					thisRating = "unrated";
				}
				var rating = $("<h5>")
					.html("Rated: " + thisRating)
					.addClass("ratingStyle");
				staticGif = $("<img>")
					.attr("data-animated", animatedGif)
					.attr("data-paused", staticGif)
					.attr("src", staticGif)
					.addClass("moveOnHover");
				var fullGifDisplay = $("<button>").append(rating, staticGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on hover
$(document).on('mouseover', '.playOnHover', function() {
	$(this).attr('src', $(this).data('animated'));
});
$(document).on('mouseleave', '.playOnHover', function() {
	$(this).attr('src', $(this).data('paused'));
});

//sets a button from input
$('#addShow').on('click', function() {
	var newShow = $('#newShowInput').val().trim();
	showTitle.push(newShow);
	createButtons();
	return false;
});

createButtons();
