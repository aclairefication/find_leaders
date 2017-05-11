"use strict";

var fs = require('fs');
var json2csv = require('json2csv');
var promise = require('selenium-webdriver').promise;
var webdriver = require('selenium-webdriver');

//Refactored to use Page Object Pattern
var MailchimpHomePage = require('./lib/mailchimp-home-page.js');
var MailchimpAboutPage = require('./lib/mailchimp-about-page.js');

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
var mailchimpHomePage = new MailchimpHomePage(driver);
mailchimpHomePage.visit();
var mailchimpAboutPage = mailchimpHomePage.clickAboutLink();
var leader_links = mailchimpAboutPage.getLeaderLinks();

var make_csv = function(json){
	json2csv({data: json, fields: ['name', 'position', 'description']}, function(err, csv) {
	  if (err) console.log(err);
	  fs.writeFile('mailchimp_leaders.csv', csv, function(err) {
	    if (err) throw err;
	    console.log('file saved');
	  });
	});
};

leader_links.then(function(elements){
	var leadersJSON = elements.map(mailchimpAboutPage.getLeaderDetails);
	promise.all(leadersJSON).then(function(allJSON){
		console.log(allJSON);
		make_csv(leadersJSON);
	});
}).then(function(){
	driver.quit();
});