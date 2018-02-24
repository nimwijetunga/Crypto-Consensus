'use strict';

let https = require ('https');

var reddit = require("./reddit.js");
var fs = require('fs');


var obj;


let accessKey = '6e8dd270bf5941129c8b06a1627207c6';


let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment';

let response_handler = function (response) {

    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {//Return sentiments here
        let body_ = (JSON.parse (body));
        var avg = weight_avg(body_);
        //console.log(avg);
        var categor = classify(body_);
        //console.log(categor);//good,bad,avg
        var tmp = {sentiment:avg, good:categor[0], bad:categor[1], avg:categor[2]}
        var data = JSON.stringify(tmp);
        console.log(data);

    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

function classify(sent){
    //console.log(sent);
    if(sent == undefined || sent.documents == undefined)return;
    var categor = new Array();
    var good = 0.0, bad = 0.0, avg = 0.0, total = 0.0, index = 0;
    while(sent.documents[index] != undefined){
        var score = sent.documents[index].score;
        if(score < 0.3)bad++;
        else if(score > 0.7)good++;
        else avg++;
        total++;
        index++;
    }
    good/=parseFloat(total);
    bad/=parseFloat(total);
    avg/=parseFloat(total);
    categor.push(parseFloat(good));
    categor.push(parseFloat(bad));
    categor.push(parseFloat(avg));
    return categor;
}

function weight_avg(sent){
    if(sent == undefined || sent.documents == undefined) return;
    var data = JSON.parse(fs.readFileSync('reddit-crawler.json', 'utf8'));
    
    var index = 0;
    var sum = 0.0, weights = 0.0;
    while(sent.documents[index] != undefined){
        weights += parseFloat(sent.documents[index].score)*parseFloat(data[index].score);
        sum += parseFloat(data[index].score);
        index++;
    }
    return weights/sum;

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

function get_data(data){
    var d = new Date(data.date * 1000);
    var coin = data.coin;

    reddit.crawler(coin,d).then(function (result){

        //Sentiment Analysis
        var documents = JSON.parse(fs.readFileSync('template.json', 'utf8'));
        fs.writeFileSync('reddit-crawler.json', JSON.stringify(result));
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