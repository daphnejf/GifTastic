var animals = ["dog","cat","mouse","pig","spider","goat","fish","beetle","horse","cow"];
var button;

var buttonGnrtr = function() {
    $("#buttonSection").empty()
        for (i = 0; i < animals.length; i++) {
            button = $("<button type=" + "button" + ">" + animals[i] + "</button>").addClass("btn btn-info").attr("data",animals[i]);
            $("#buttonSection").append(button);
        };
}

$("#buttonSection").on("click", ".btn", function() {
    var gif = $(this).attr("data");
    console.log(gif);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var p = $("<p>");
            p.text(results[i].rating);
            var p = $("<p>").text("Rating: " + results[i].rating);
            
            var gifImage = $("<img>")
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("gif");

            gifDiv.append(gifImage);
            gifDiv.append(p);
            $("#GIFSection").prepend(gifDiv);
        }
    })
})

$("#GIFSection").on("click", ".gif", function(event) {
    event.preventDefault();
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$(".submit").on("click", function(event) {
    event.preventDefault();

    var newGIF = $("#input").val();
    console.log($("#input"));

    animals.push(newGIF);
    console.log(animals);

    buttonGnrtr();
});

  buttonGnrtr();