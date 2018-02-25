function analyzeSentiment(days, coin){
	var d = new Date();
	d.setDate(d.getDate() + days);
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

	$(document).ready(function(){
		$.get("http://localhost:3005/bitcoin?coin=\"Bitcoin\"&date=9541427620",
			function(data){
				console.log(data);
			});
	});

	drawChart(20,30,20);
	setSentiment(1);
	/*$(document).ready(function(){
		$(".selectDays").click(function(){
			$("#analysis").toggle();
		})
	})*/
}

function setSentiment(sentiment){
	var bar = document.getElementById("sentimentRating");
	bar.innerHTML = sentiment*100 + "%";
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
  var options = {'width':300, 'height':200};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}