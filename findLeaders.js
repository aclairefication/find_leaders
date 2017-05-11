"use strict";

var fs = require('fs');
var json2csv = require('json2csv');
var promise = require('selenium-webdriver').promise;
var webdriver = require('selenium-webdriver');

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
browser.get('http://www.mailchimp.com');
browser.findElement(webdriver.By.css('[href="/about"]')).click();

var get_leader_name = function(elem){
	return elem.getAttribute('data-title');
};

var get_leader_position = function(elem){
	return elem.getAttribute('data-position');
};

var get_leader_description = function(elem){
	return elem.getAttribute('data-description');
};

var get_leader_details = function (elem){

		var leaderJSON = {"name":"","position":"", "description": ""}

		promise.all([get_leader_name(elem), get_leader_position(elem), get_leader_description(elem)])
			.then(function(results){
				leaderJSON.name = results[0];
				leaderJSON.position = results[1];
				leaderJSON.description = results[2];
			});

		// .then(function(leader_name){
		// 	console.log(leader_name);
		// 	leaderJSON.name = leader_name;
		// }).then(function(){
		// 	.then(function(leader_position){
		// 		console.log(leader_position);
		// 		leaderJSON.position = leader_position;
		// 	});			
		// });



		// .then(function(leader_description){
		// 	console.log(leader_description);
		// 	leaderJSON.description = leader_description;
		// });

		return leaderJSON;
};

var make_csv = function(json){
	json2csv({data: json, fields: ['name', 'position', 'description']}, function(err, csv) {
	  if (err) console.log(err);
	  fs.writeFile('mailchimp_leaders.csv', csv, function(err) {
	    if (err) throw err;
	    console.log('file saved');
	  });
	});
};

var leader_links = browser.findElements(webdriver.By.css('.bio_link'))
leader_links.then(function(elements){
	var leadersJSON = elements.map(get_leader_details);
	promise.all(leadersJSON).then(function(allJSON){
		console.log(allJSON);
		make_csv(leadersJSON);
	});
});