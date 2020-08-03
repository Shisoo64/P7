let map = new Mapy;
let resto = new Resto;

map.initMap();


// Filtres
$('#minStars').change(function() {
resto.moyChange($(this).val(),$('#maxStars').val());
});
$('#maxStars').change(function() {
resto.moyChange($('#minStars').val(),$(this).val());
});

// Rating Add
$(document).on("click", ".ratingAdd", function() {
	$('#ratingsModal').modal('show');
	$("#ratingsModalOk").attr('data-value', this.getAttribute('data-value'));
});

// Rating Ok
$("#ratingsModalOk").click(function() {
	console.log(this.getAttribute('data-value'));
	resto.createRating($("#ratingsModalStars").val(), $("#ratingsModalStars").val(), $("#ratingsModalText").val(), this.getAttribute('data-value'));
	$('#ratingsModal').modal('hide');
});