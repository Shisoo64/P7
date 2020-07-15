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

  initResto(resultats) {
    $('#list').empty();
    console.log(resultats);

    $.each(resultats, function(i, restaurant){
      var moy = restaurant.rating;
      // Ajout Restaurant
      resto.createResto(restaurant.geometry.location.lat(), restaurant.geometry.location.lng(), moy, restaurant.vicinity, restaurant.name);
      
      // Each ratings
      var request = {
        placeId: restaurant.reference
      };
      var service = new google.maps.places.PlacesService(map.gMap);
      service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          $.each(place.reviews, function(e, ratings){
            // Ajout Rating
            resto.createRating(moy, ratings.rating, ratings.text, restaurant.name);
          });
        }
      });

    });
  }

  createResto(lat, long, moy, address, restaurantName) {
    $('<a class="btn btn-primary btn-lg btn-block mt-3 restaurant restaurantBtn" data-value="'+ moy +'" data-toggle="collapse" data-target="#collapse' + restaurantName.replace(/[^A-Z0-9]+/ig, "_") + '" role="button" aria-expanded="false" aria-controls="collapseExample">' + restaurantName + '</a><p class="lead mb-4">' + address + '</p>').appendTo('#list');
    map.newMarker(new google.maps.LatLng(lat,long), restaurantName);
    // Div collapse
    $('<div class="collapse" id="collapse' + restaurantName.replace(/[^A-Z0-9]+/ig, "_") + '"></div>').appendTo('#list');
    $('<img class="img-fluid mb-4" src="https://maps.googleapis.com/maps/api/streetview?size=900x300&location=' + lat + ',' + long + '&fov=80&heading=70&pitch=0&key=AIzaSyDoAgu5pb6ODIxcuiG-8Ls9AgMhaGBebRU">').appendTo('#collapse' + restaurantName.replace(/[^A-Z0-9]+/ig, "_"));
    $('<button type="button" data-value="'+ restaurantName.replace(/[^A-Z0-9]+/ig, "_") +'" class="btn btn-outline-secondary btn-sm btn-block mb-2 ratingAdd">Ajouter un avis</button>').appendTo('#collapse' + restaurantName.replace(/[^A-Z0-9]+/ig, "_"));
  }

  createRating(moy, stars, comment, restaurantName){
    var borderColor = " ";
    if(stars < (moy-0.5)){
      borderColor = 'style="border-color: #ff3838;"'
    }
    $('<div class="restaurant mb-2" data-value="'+ moy +'"><div class="card card-body" '+ borderColor +' ><h4>' + stars + '/5 <small class="text-muted">' + comment + '</small></h4></div></div>').appendTo('#collapse' + restaurantName.replace(/[^A-Z0-9]+/ig, "_"));
  }

}