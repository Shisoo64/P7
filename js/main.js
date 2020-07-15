let map = new Mapy;
let resto = new Resto;

map.initMap();
//resto.initResto();

    service = new google.maps.places.PlacesService(map.gMap);

    let requete = {
      location: new google.maps.LatLng(48.858382,2.294480),
      radius: '3000',
      type: ['restaurant']
    };

    service.search(requete, function(resultats, status){
    	resto.initResto(resultats);
    });

$('#minStars').change(function() {
resto.moyChange($(this).val(),$('#maxStars').val());
});

$('#maxStars').change(function() {
resto.moyChange($('#minStars').val(),$(this).val());
});



$(document).on("click", ".ratingAdd", function() {
	$('#ratingsModal').modal('show');
	$("#ratingsModalOk").attr('data-value', this.getAttribute('data-value'));
});

$("#ratingsModalOk").click(function() {
	console.log(this.getAttribute('data-value'));
	resto.createRating($("#ratingsModalStars").val(), $("#ratingsModalStars").val(), $("#ratingsModalText").val(), this.getAttribute('data-value'));
	$('#ratingsModal').modal('hide');
});




