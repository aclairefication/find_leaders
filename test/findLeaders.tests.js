"use strict";

var fs = require('fs');
var json2csv = require('json2csv');
var promise = require('selenium-webdriver').promise;
var webdriver = require('selenium-webdriver');
var test = require('ava');
var chai = require('chai');
var expect = chai.expect;

var MailchimpHomePage = require('../lib/mailchimp-home-page.js');
var MailchimpAboutPage = require('../lib/mailchimp-about-page.js');

var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
var mailchimpHomePage = new MailchimpHomePage(driver);

test.serial("Home page has an About link present", t => {

	mailchimpHomePage.visit();

	promise.all(mailchimpHomePage.getAboutLink).then(function(aboutElement){
		expect(aboutElement).to.exist;
	});

});

test.serial("home page About link shows expected text", t => {

	promise.all(mailchimpHomePage.getAboutLinkText).then(function(aboutLinkText){
		expect(aboutLinkText).to.equal('About MailChimp');	
	});

});

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

test.serial("About page displays 12 leaders", t => {

	leader_links.then(function(elements){

		expect(elements.length).to.equal(12);

		var leadersJSON = elements.map(mailchimpAboutPage.getLeaderDetails);
		promise.all(leadersJSON).then(function(allJSON){
			console.log(allJSON);
			make_csv(leadersJSON);
		});
	}).then(function(){
		driver.quit();
	});


});

