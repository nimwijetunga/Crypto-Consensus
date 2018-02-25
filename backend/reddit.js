var r = require("nraw");
var fs = require('fs');

var Reddit = new r("Testbot v0.0.1 by Mobilpadde");

function get_data(coin,date){

	var final_object = new Array();

	return new Promise(function(resolve, reject) {

		Reddit.subreddit(coin).comments().top().exec(function(data){

			var index = 0;


			do{


				/***Parent Object**/
				if(data == undefined) break;
				if(data.data == undefined)break;
				if(data.data.children == undefined)break;
				if(data.data.children[index] == undefined) break;
				if(data.data.children[index].data.score < 50) break;

				var obj = data.data.children[index];

				var unix_timestamp = obj.data.created;
				var title = obj.data.title;
				var score = obj.data.score;
		    //console.log(unix_timestamp + " " + title + " " + score);
		    var tmp = {time:unix_timestamp, title:title, score:score, comments:obj.data.id};
		    final_object.push(tmp);

		    var a = new Date(unix_timestamp*1000);

		    index++;

		}while(unix_timestamp >= date);
		resolve(final_object);		

	})
	});

}

function child_data_per(coin, date, parent,index){//Last parameter is the parent

	var final_object = new Array();

	return new Promise(function(resolve, reject) {

		var top_index = 0;

		/*****Child Posts***//////
		Reddit.subreddit(coin).post(parent[index].comments).exec(function(data){

			var index = 0;

			do{
				if(data == undefined || data[1].data == undefined || data[1].data.children == undefined || data[1].data.children[index] == undefined)break;

				var obj = data[1].data.children[index];
				if(obj.data == undefined) break;
				var unix_timestamp = obj.data.created;
				var body = obj.data.body;
				var score = obj.data.score;
				if(score < 50) break;
				var tmp = {time:unix_timestamp, title:body, score:score, comments:null};
				final_object.push(tmp);

				var a = new Date(unix_timestamp*1000);

				index++;

		}while(unix_timestamp >= date);
			resolve(final_object);

		})
	});
}


module.exports = {

	 crawler : async function(coin,date){

	 	date = date.getTime()/1000;

		var final_data = new Array();

		var obj = await get_data(coin,date);

		var index = 0;
	while(obj[index] != undefined){//Add parent objects
		var tmp = {time:obj[index].time, title:obj[index].title, score:obj[index].score};
		final_data.push(tmp);
		index++;
	}

	index = 0;

	var parent = obj;

	while(parent[index] != undefined){
		var obj = await child_data_per(coin,date,parent,index);
		if(obj[0] != undefined){
			var tmp = {time:obj[0].time, title:obj[0].title, score:obj[0].score};
			final_data.push(tmp);

		}
		index++;
	}

	/*var data = JSON.stringify(final_data);
	fs.writeFile('reddit-crawler.json',data,finished);
	function finished(err){
		console.log('Cool');
	}*/

	return final_data;

}

}