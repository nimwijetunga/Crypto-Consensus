'use strict';

let https = require ('https');

var reddit = require("./reddit.js");
var fs = require('fs');


var obj;

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
let accessKey = '6e8dd270bf5941129c8b06a1627207c6';

// Replace or verify the region.

// You must use the same region in your REST API call as you used to obtain your access keys.
// For example, if you obtained your access keys from the westus region, replace 
// "westcentralus" in the URI below with "westus".

// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// a free trial access key, you should not need to change this region.
let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment';

let response_handler = function (response) {

    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {//Return sentiments here
        let body_ = JSON.stringify(JSON.parse (body));
        console.log(body_);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

function weight_avg(sent){
    /*if(sent == undefined)return;
    else if(sent.documents == undefined)return;*/

}

let get_sentiments = function (documents) {
    let body = JSON.stringify (documents);

    let request_params = {
        method : 'POST',
        hostname : uri,
        path : path,
        headers : {
            'Ocp-Apim-Subscription-Key' : accessKey,
        }
    };

    let req = https.request (request_params, response_handler);
    req.write (body);
    
    req.end ();

}

/*let documents = { 'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
]};

get_sentiments (documents);*/

<<<<<<< HEAD
function get_data(data){
    var d = new Date(data.date * 1000);
    var coin = data.coin;

    reddit.crawler(coin,d).then(function (result){

        //Sentiment Analysis
        var documents = JSON.parse(fs.readFileSync('template.json', 'utf8'));
        var index = 0;
        while(result[index] != undefined){
            var id = index + 1;
            var temp = {id:id.toString(), language: 'en', text:result[index].title};
            documents.documents.push(temp);
            index++;
        }
        get_sentiments(documents);
    })
}

var data = fs.readFileSync('test.json', 'utf8');
var data_rev = JSON.parse(data);

get_data(data_rev);
=======
async function getObj(){
    
    
}
>>>>>>> 9e7457b1439293b966ff68ef35d80ca0aaf76856
