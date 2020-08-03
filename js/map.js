class Mapy {

  constructor(){
    this.map;
    this.gMap;
  }

  initMap() {
    this.gMap = new google.maps.Map(document.getElementById('map'));
    // Check Localisation utilisateur
    navigator.geolocation.getCurrentPosition(function(position) {
      // Centrage sur la localisation de l'utilisateur
      var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.gMap.setCenter(initialLocation);
      map.gMap.setZoom(16);
      map.newMarker(initialLocation, "Vous", "http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
      resto.initRestoPlaces(position.coords.latitude, position.coords.longitude);
    }, function(positionError) {
      // Sinon centrage sur la tour eiffel
      resto.initRestoJson();
      map.gMap.setCenter(new google.maps.LatLng(48.858382, 2.294480));
      map.gMap.setZoom(16);
      map.newMarker(new google.maps.LatLng(48.858382, 2.294480), "Vous", "http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
    });
    map.gMap.addListener('click', function(e) {
      map.createRestoAndMarker(e.latLng, map);
    });
  }

  // Ajout d'un marker
  newMarker(position, title, icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png") {
  var marker = new google.maps.Marker({
    position: position,
    map: this.gMap,
    title: title,
    icon: icon
  });
  }


  // Ajout d'un resto
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