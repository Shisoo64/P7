class Resto {

  moyChange(minStars, maxStars) {
    $('.restaurant').each(function(i, rest) {
      if(rest.getAttribute('data-value') < minStars || rest.getAttribute('data-value') > maxStars){
        $(this).hide();
      }else{
        $(this).show();
      }
    });
  }

  initResto() {
    $('#list').empty();
    $.getJSON("restaurant.json", function(json) {
    //$.getJSON("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.950030,14.537220&radius=500&type=restaurant&key=AIzaSyDoAgu5pb6ODIxcuiG-8Ls9AgMhaGBebRU", function(json) {
      //console.log(json);
      // Each restaurant
      $.each(json, function(i, restaurant){
        // Calcul moy restaurant
        var moy = 0;
        $.each(restaurant.ratings, function(e, ratings){
          moy += restaurant.ratings[e].stars;
        });
        moy = moy / restaurant.ratings.length;
        // Ajout Restaurant
        resto.createResto(restaurant.lat, restaurant.long, moy, restaurant.address, restaurant.restaurantName);
        // Each ratings
        $.each(restaurant.ratings, function(e, ratings){
          // Ajout Rating
          resto.createRating(moy, restaurant.ratings[e].stars, restaurant.ratings[e].comment, restaurant.restaurantName);
        });
        // append apres rating $('').appendTo('#list');
      });
    });
  }

  createResto(lat, long, moy, address, restaurantName) {
    $('<a class="btn btn-primary btn-lg btn-block mt-3 restaurant restaurantBtn" data-value="'+ moy +'" data-toggle="collapse" data-target="#collapse' + restaurantName + '" role="button" aria-expanded="false" aria-controls="collapseExample">' + restaurantName + '</a><p class="lead mb-4">' + address + '</p>').appendTo('#list');
    map.newMarker(new google.maps.LatLng(lat,long), restaurantName);
    // Div collapse
    $('<div class="collapse" id="collapse' + restaurantName + '"></div>').appendTo('#list');
    $('<img class="img-fluid mb-4" src="https://maps.googleapis.com/maps/api/streetview?size=900x300&location=' + lat + ',' + long + '&fov=80&heading=70&pitch=0&key=AIzaSyDoAgu5pb6ODIxcuiG-8Ls9AgMhaGBebRU">').appendTo('#collapse' + restaurantName);
    $('<button type="button" data-value="'+ restaurantName +'" class="btn btn-outline-secondary btn-sm btn-block mb-2 ratingAdd">Ajouter un avis</button>').appendTo('#collapse' + restaurantName);
  }

  createRating(moy, stars, comment, restaurantName){
    $('<div class="restaurant mb-2" data-value="'+ moy+'"><div class="card card-body"><h4>' + stars + '/5 <small class="text-muted">' + comment + '</small></h4></div></div>').appendTo('#collapse' + restaurantName);
  }

}