$(document).ready(function() { 

  initRatings();

  $('#minStars').change(function() {
    moyChange($(this).val(),$('#maxStars').val());
  });

  $('#maxStars').change(function() {
    moyChange($('#minStars').val(),$(this).val());
  });

});


function moyChange(minStars, maxStars) {
  $('.restaurant').each(function(i, rest) {
    if(rest.getAttribute('data-value') < minStars || rest.getAttribute('data-value') > maxStars){
      $(this).hide();
    }else{
      $(this).show();
    }
  });
}


function initRatings() {

  $('#list').empty();

  $.getJSON("restaurant.json", function(json) {
    // Each restaurant
    $.each(json, function(i, restaurant){
      // Calcul moy restaurant
      var moy = 0;
      $.each(restaurant.ratings, function(e, ratings){
        moy = moy + restaurant.ratings[e].stars;
      });
      moy = moy / restaurant.ratings.length;
      // Ajout Restaurant
      $('<div class="restaurant" data-value="'+ moy +'"> <p class="display-4">' + restaurant.restaurantName + '</p>' + '<p class="lead mb-4">' + restaurant.address + '</p></div>').appendTo('#list');
      newMarker(new google.maps.LatLng(restaurant.lat,restaurant.long), restaurant.restaurantName);
      // Each ratings
      $.each(restaurant.ratings, function(e, ratings){
        // Ajout Rating
        $('<div class="restaurant mb-3" data-value="'+ moy
         +'"><h4>' + restaurant.ratings[e].stars
          + '/5  <small class="text-muted">' + restaurant.ratings[e].comment
           + '</small></h4></div>').appendTo('#list');
      });
      // Hr fin de restaurant
      $('<hr>').appendTo('#list');
    });
  });
  // Hr fin de liste
  $('<hr>').appendTo('#list');
}


function initMap() {

  gMap = new google.maps.Map(document.getElementById('map'));
  navigator.geolocation.getCurrentPosition(function(position) {
    // Centrage sur la localisation de l'utilisateur
    var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    gMap.setCenter(initialLocation);
    gMap.setZoom(13);
    newMarker(initialLocation, "Vous");
  }, function(positionError) {
    // Sinon centrage sur la tour eiffel
    gMap.setCenter(new google.maps.LatLng(48.858382, 2.294480));
    gMap.setZoom(12);
    newMarker(new google.maps.LatLng(48.858382, 2.294480), "Vous");
  });
}



function newMarker(position, title) {
  var marker = new google.maps.Marker({
    position: position,
    map: gMap,
    title: title
  });
}