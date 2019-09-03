var apiKey = "PEeomqtvkaqdcnGBhNblYwegnxnQwW2U";
var animalArray = ["Cat", "Dog", "Hummingbird", "Horse", "Elephant", "Wolf", "Snake", "Shark"];

$(document).ready(function () {
    function generateButtons() {
        
        $("#gif-buttons").empty();

        for (var i = 0; i < animalArray.length; i++) {
            var btn = $("<button>")
            btn.addClass("buttons");
            btn.addClass("gifButtons");
            btn.attr("data-name", animalArray[i]);
            btn.text(animalArray[i]);
            $("#gif-buttons").append(btn);
        }
    }

    $(document).on("click", ".gifButtons", function() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=" + apiKey;
        $("#gifs").empty();

        $.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                
                var gifsDiv = $("#gifs");
                var rating = $("<p>");
                var animalImage = $("<img>");
                
                rating.text("Rating: " + results[i].rating);
                animalImage.attr("src",results[i].images.original_still.url);
                animalImage.attr("data-still",results[i].images.original_still.url);
                animalImage.attr("data-animate",results[i].images.original.url);
                animalImage.attr("data-state","still");
                animalImage.addClass("gifImage");

                gifsDiv.append(rating);
                gifsDiv.append(animalImage);
            }
        });
    });

    $("#submit-btn").on("click", function() {

        event.preventDefault();
		var animal = $("#input-animal").val().trim();
		animalArray.push(animal);
        generateButtons();
        $("#input-animal").val("");
    });

    $(document).on("click", ".gifImage", function() {

        imageState = $(this).attr("data-state");
        imageStill = $(this).attr("data-still");
        imageAnimate = $(this).attr("data-animate");

        if (imageState === "still") {
            $(this).attr("data-state","animate");
            $(this).attr("src",imageAnimate);
        }
        else if (imageState === "animate") {
            $(this).attr("data-state","still");
            $(this).attr("src",imageStill);
        }
    });

    generateButtons();
})