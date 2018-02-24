var r = require("nraw");
var Reddit = new r("Testbot v0.0.1 by Mobilpadde");

function get_data(coin,date){

	Reddit.subreddit(coin).comments().top().exec(function(data){

		var index = 0;


		//do{

			var parent = data.data.children[index];
			//if(parent == undefined) break;

			var unix_timestamp = data.data.children[0].data.created;
		    console.log(unix_timestamp);

		    var a = new Date(unix_timestamp*1000);

		    //if()

		//}while(date.getFullYear() < a.getFullYear() && date.getMonth() < a.getMonth() && date.getDate() < a.getDate())
		

		
    
	})

}

get_data("Bitcoin");

