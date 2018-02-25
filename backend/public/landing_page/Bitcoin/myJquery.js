$(document).ready(function(){
	$('#analysis').hide();
	$('#load').hide();
	$('#totalSentiment').hide();
	$('.selectDays').click(function(){
		$('#analysis').show();
		document.getElementById("analysis").innerHTML = "Analysis in Progress"
		$('#load').show();
		$('#load2').show();
	});

});

	