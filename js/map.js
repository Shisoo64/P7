class Mapy {

  constructor(){
    this.map;
    this.gMap;
  }

  initMap() {
    this.gMap = new google.maps.Map(document.getElementById('map'));
    navigator.geolocation.getCurrentPosition(function(position) {
      // Centrage sur la localisation de l'utilisateur
      var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.gMap.setCenter(initialLocation);
      map.gMap.setZoom(13);
      map.newMarker(initialLocation, "Vous");
    }, function(positionError) {
      // Sinon centrage sur la tour eiffel
      map.gMap.setCenter(new google.maps.LatLng(48.858382, 2.294480));
      map.gMap.setZoom(12);
      map.newMarker(new google.maps.LatLng(48.858382, 2.294480), "Vous");
    });
    map.gMap.addListener('click', function(e) {
      map.createRestoAndMarker(e.latLng, map);
    });
  }

  newMarker(position, title) {
  var marker = new google.maps.Marker({
    position: position,
    map: this.gMap,
    title: title
  });
  }

  createRestoAndMarker(latLng, map) {
    map.gMap.panTo(latLng);
    $('#exampleModal').modal('show');
    $("#modalOk").click(function() {
      map.newMarker(latLng, map);
      resto.createResto(latLng.lat(), latLng.lng(), 2.5, $("#modalAdresse").val(), $("#modalRestaurantName").val());
      $('#exampleModal').modal('hide');
    });
  }

}










