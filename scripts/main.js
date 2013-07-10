$(function() {
	$("#myp").html("The script works");
	$('#myp').load('ajax/formats.txt', function() {
		$('#myp').append("..and the callback fired like a boss");
	});
});