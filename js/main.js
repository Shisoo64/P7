let map = new Mapy;
let resto = new Resto;

map.initMap();
resto.initResto();

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







      console.log("Truc");
    $.getJSON("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.950030,14.537220&radius=500&type=restaurant&key=AIzaSyDoAgu5pb6ODIxcuiG-8Ls9AgMhaGBebRU", function(data){
      console.log("Data: " + data);
    })