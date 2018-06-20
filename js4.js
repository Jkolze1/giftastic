 //variables
var topicArray= ["dogs","kittens", "birds", "pigs", "hedgehog", "goldifsh", ];


$(document).ready(function(){
    for(var i=0; i< topicArray.length; i++){
        $("#animalbutton").append("<button type= 'button' onclick= 'searchGif(\"" + topicArray[i] + "\")' class='btn' value='" + topicArray[i] + "'> " + topicArray[i] + "</button>");
    }
});

 //button clicked function
 function animalbuttonClicked(){
var userInput=$('#animalInput').val();
searchGif(userInput);
}
//submit button
function submitbuttonClicked() {
    var userInput = $('#animalInput').val();

    if (userInput) {
        $('#animalbutton').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}
//searches for gifs
function searchGif(gifName){
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC&limit=10',
        type: 'GET',
    })
    .done(function(response) {
        displayGif(response);
    })
}

//function display
function displayGif(response){
    $('#animals').empty();
    for(var i=0; i<response.data.length; i++){
        var rating= "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
    '" data-still=" ' + response.data[i].images.fixed_height_still.url +
    ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';
//shows image
    image = '<div class="col-md-4">' + image + "</div>";
    $('#animals').append(image);
}
//changes from still to motion with a click
$('.movImage').on('click', function() {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr("data-still"));
        $(this).attr('data-state', 'still');
    }

});
}

