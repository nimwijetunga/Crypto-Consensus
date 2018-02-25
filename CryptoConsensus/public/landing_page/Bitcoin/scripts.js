function analyzeSentiment(days, coin){
	var d = new Date();
	d.setDate(d.getDate() - days);
	var u = d.getTime()/1000;
	
	//create json object
	//var tmp = {date:u ,coin:coin};

	/*$(document).ready(function(){
		$.post("http://localhost:3005/bitcoin",
		{
			coin:coin,
			date:u
		},
		function(data){
			console.log(data);
		});
	});*/
	console.log(u);
	$(document).ready(function(){
		$.get("http://localhost:3005/bitcoin?coin="+coin+"&date="+u,
			function(data){
				data=JSON.parse(data);
				console.log(data);
				$('#totalSentiment').show();
				drawChart(data.bad, data.avg, data.good);
				console.log(data.sentiment);
				setSentiment(data.sentiment);
				$('#load').hide();
				$('#load2').hide();
				document.getElementById("analysis").innerHTML = "Analysis Complete!"
				setVerdict(data.sentiment);
			});
	});

	/*$('#totalSentiment').show();
	drawChart(20,20,20);
	setSentiment(0.5);
	$('#load').hide();
	//$('#load2').hide();
	document.getElementById("sentimentRating").style.color="Black";
	document.getElementById("analysis").innerHTML = "Analysis Complete!"
	setVerdict(0.5);*/
	/*$(document).ready(function(){
		$(".selectDays").click(function(){
			$("#analysis").toggle();
		})
	})*/
}

function setSentiment(sentiment){
	console.log(sentiment);
	var bar = document.getElementById("sentimentRating");
	bar.style.color="Black";
	bar.innerHTML = Math.round(sentiment*100) + "%";
	bar.style.width = (sentiment*100 + "%")	;
	if(sentiment < 0.3){
		bar.style.backgroundColor = "red";
	}
	else if(sentiment >0.7){ 
		bar.style.backgroundColor = "green";
	}
	else{
		bar.style.backgroundColor = "yellow";
	}
}

function setVerdict(sentiment){
	var verdict = document.getElementById("verdict");
	if(sentiment < 0.3){
		verdict.innerHTML = "Avoid! This coin does not have a good standing!";
	}
	else if(sentiment < 0.5){
		verdict.innerHTML = "Neutral, but slightly negative. ";
	}
	else if(sentiment < 0.7){
		verdict.innerHTML = "Slightly positive, but not by much.";
	}
	else{
		verdict.innerHTML = "Very positive! This coin is very favored by traders!";
	}
}

//pie chart

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(bad, avg, good) {
  var data = google.visualization.arrayToDataTable([
  ['Ranges of Sentiments', 'Comments'],
  ['Negative', bad],
  ['Neutral', avg],
  ['Positive', good],
]);

    // Optional; add a title and set the width and height of the chart
  var options = {'width':450, 'height':350};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}