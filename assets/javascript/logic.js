var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 39.7392, lng: -104.9903},
      zoom: 10
    });
};

$(document).ready(function(){
$("#searchParam").on("click", function() {

//  flickr API key
  var APIKey = "4b8b58acfe354bd812d3a9c9625cf17d";
  var location = $("#search").val().trim();
  console.log(location);

  // URL to query the database
  var queryURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + APIKey +  "&text=" + location + "&privacy_filter=1&accuracy=11&safe_search=1&content_type=1&format=json&nojsoncallback=1";

  $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
    console.log(response);

  // creating for loop
  for (var i = 0; i < 10; i++) {
  var farm = response.photos.photo[i].farm;
  var server = response.photos.photo[i].server;
  var id = response.photos.photo[i].id;
  var secret = response.photos.photo[i].secret;
  var farmImage = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg";

  $("#flickr" + (i)).attr("src", farmImage);
  $("#image").prepend(farmImage);

  console.log(farm);
  console.log(server);
  console.log(id);
  console.log(secret);
  console.log(farmImage);

      };
    });
  });
});
