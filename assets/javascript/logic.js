// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyAJI8v9GNwTc4SzgCfowNw8ZXhHw4XyEYI",
    authDomain: "flooglemaps.firebaseapp.com",
    databaseURL: "https://flooglemaps.firebaseio.com",
    projectId: "flooglemaps",
    storageBucket: "flooglemaps.appspot.com",
    messagingSenderId: "995248440323"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// add user name
  $("#submitLogin").on("click", function(event) {
    event.preventDefault();

// Grab user input
  var userName = $("#signText").val().trim();
    database.ref().push(userName);
    window.location.replace('Landing.html');
  });

// intializa google map
  function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.7392, lng: -104.9903},
      zoom: 13,
      disableDefaultUI: true,
    });

// Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];

// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
    // searchBox.addListener('places_changed', function() {
    $('#searchParam').on('click', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
// Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

// For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

// Create a marker for each place.
    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
        // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
      });
      map.fitBounds(bounds);
    });
  }

// flickr API stuff
    $(document).ready(function(){
    $("#searchParam").on("click", function() {

//  flickr API key
    var APIKey = "4b8b58acfe354bd812d3a9c9625cf17d";
    var location = document.getElementById("pac-input").value;
    console.log(location);

// URL to query the database
    var queryURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + APIKey +  "&text=" + location + "&license=0&format=json&nojsoncallback=1";

    $.ajax({
      url: queryURL,
      method: "GET"
      }).done(function(response) {
      console.log(response);

// creating for loop
    for (var i = 0; i < 16; i++) {
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
    $(".flickrPic").click(function() {
      const imagePath = $(this).attr('src');
      $('#imagePic').attr('src', imagePath);
          $('.ui.modal').modal('show');
        });
  });
