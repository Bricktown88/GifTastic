$(document).ready(function () {

var topics = ["Golf", "Dogs", "Computers", "Fishing", "Birds", "Nature"]


function renderButtons() {

  $("#buttons-div").empty();

  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");
    a.addClass("topic");
    a.addClass("btn btn-warning");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-div").append(a);
  }

  $("button").on("click", function() {
    var buttonName = $(this).data("name");
    console.log(buttonName);
    var limit = 10;
    var API_KEY = "&api_key=3WwOIKh00mkeVxOCfTHY6xGTFggJUgod"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonName + API_KEY +"&limit=" + limit;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      })
    
      .then(function(response) {
        var results = response.data;
        console.log(results);
  
        for (var i = 0; i < results.length; i++) {
  
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var buttonImage = $("<img>");
  
            buttonImage.attr("src", results[i].images.fixed_height_still.url);
            buttonImage.attr("data-still", results[i].images.fixed_height_still.url);
            buttonImage.attr("data-animate", results[i].images.fixed_height.url);
            buttonImage.attr("data-state", "still");
  
            gifDiv.append(p);
            gifDiv.append(buttonImage);
  
            $("#gif-div").prepend(gifDiv);
          }
          
        }
        
      });
      
      
  });
  
}
$('body').on('click','img',function() {

  var currentState = $(this).attr("data-state");
  if (currentState == "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
})

$("#add-topic").on("click", function(event) {
  event.preventDefault();

  var topic = $("#topic-input").val().trim();
  topics.push(topic);

  renderButtons();
});

renderButtons();

})