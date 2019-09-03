var apiKey = "PEeomqtvkaqdcnGBhNblYwegnxnQwW2U";
var animalArray = ["Cat", "Dog", "Hummingbird", "Horse", "Elephant", "Wolf", "Snake", "Shark"];

$(document).ready(function () {

    // Function to generate buttons from the animalArray
    function generateButtons() {
        // Clear out the div that holds the buttons since we are regenerating all of them
        $("#gif-buttons").empty();

        // Loop through the animalArray an generate button for each entry
        for (var i = 0; i < animalArray.length; i++) {

            // Create a new button element
            var btn = $("<button>")
            // Add class for styling
            btn.addClass("buttons");
            // Add a class for referencing in the button click event handler
            btn.addClass("gifButtons");
            // Set a "data-name" attribute with the animal name from the array entry
            btn.attr("data-name", animalArray[i]);
            // Set the button text to the animal name from the array entry
            btn.text(animalArray[i]);
            // Append the button to the pre-defined div
            $("#gif-buttons").append(btn);
        }
    }

    // Event handler for the Gif buttons
    $(document).on("click", ".gifButtons", function() {
        // Retrieve the data-name attribute from the clicked button and store in local variable.
        var animal = $(this).attr("data-name");
        // Build the query string for the Giphy API call
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=" + apiKey;
        // Clear the div containing the retrieved images
        $("#gifs").empty();

        // Ajax call using the previously built queryURL string
        $.ajax({
			url: queryURL,
            method: "GET"
        // Callback function to process the response from the API call
		}).done(function(response) {
            // Store the API call result in local variable.
            var results = response.data;

            // Loop through the returned results and dynamically generate html div and image elements
            for (var i = 0; i < results.length; i++) {
                
                // Create a div to hold all of the images
                var gifsDiv = $("#gifs");
                // Create p tag for the rating text displayed above the image
                var rating = $("<p>");
                // Create the img tag for the gif image
                var animalImage = $("<img>");
                
                // Retrieve the rating info from the results and add to the p tag
                rating.text("Rating: " + results[i].rating);
                // Retrieve the image urls and store in their respective "data" attributes and
                // set the src attribute to the still image url. also set the data-state attribute 
                // to "still" and set the class to be referenced in the image click event handler
                animalImage.attr("src",results[i].images.original_still.url);
                animalImage.attr("data-still",results[i].images.original_still.url);
                animalImage.attr("data-animate",results[i].images.original.url);
                animalImage.attr("data-state","still");
                animalImage.attr("width","200px");
                animalImage.attr("height","200px");
                animalImage.addClass("gifImage");

                // Create div to hold the rating and gif
                var gifDiv = $("<div>");
                // Add class attribute to apply styling
                gifDiv.addClass("gifDiv");
                // Append rating and gif image to the div
                gifDiv.append(rating);
                gifDiv.append(animalImage);
                // Append div to the previosuly created div to hold all of the image divs
                gifsDiv.append(gifDiv);
            }
        });
    });

    // Event handler to fire when the form's submit button is clicked to add another
    // entry to the array.
    $("#submit-btn").on("click", function() {

        // Suppress default form behavior
        event.preventDefault();
        // Store the entered value from the input text in local variable.
        var animal = $("#input-animal").val().trim();
        // Append the value from the variable to the end of the array.
        animalArray.push(animal);
        // Regenerate the buttons from the updated array.
        generateButtons();
        // Clear the inout text box of the entered value.
        $("#input-animal").val("");
    });

    //Event handler to fire when images are clicked
    $(document).on("click", ".gifImage", function() {

        // Retrieve the "data" attributes of the clicked image
        imageState = $(this).attr("data-state");
        imageStill = $(this).attr("data-still");
        imageAnimate = $(this).attr("data-animate");

        // Change the image state from still to animate and vice versa
        // depending on current state by setting the data-state and
        // source attributes appropriately.
        if (imageState === "still") {
            $(this).attr("data-state","animate");
            $(this).attr("src",imageAnimate);
        }
        else if (imageState === "animate") {
            $(this).attr("data-state","still");
            $(this).attr("src",imageStill);
        }
    });

    // Call the function to generate the initial set of buttons from the array.
    generateButtons();
})