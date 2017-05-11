var webdriver = require('selenium-webdriver');
var promise = require('selenium-webdriver').promise;
 
MailchimpAboutPage = function MailchimpAboutPage(driver) {
    this.driver = driver;
    this.url = 'http://www.mailchimp.com/about';
    this.leaderLinksSelector = webdriver.By.css('.bio_link');

};
 
var getLeaderName = function (element) {
	return element.getAttribute('data-title');
};

var getLeaderPosition = function (element) {
	return element.getAttribute('data-position');
};

var getLeaderDescription = function (element) {
	return element.getAttribute('data-description');
};

MailchimpAboutPage.prototype.visit = function() {
    this.driver.get(this.url);
    return webdriver.promise.fulfilled(true);
};

MailchimpAboutPage.prototype.getLeaderDetails = function (element) {
		var leaderJSON = {"name":"","position":"", "description": ""}

		promise.all([getLeaderName(element), getLeaderPosition(element), getLeaderDescription(element)])
			.then(function(results){
				leaderJSON.name = results[0];
				leaderJSON.position = results[1];
				leaderJSON.description = results[2];
			});

		return leaderJSON;
};

MailchimpAboutPage.prototype.getLeaderLinks = function (){
	return this.driver.findElements(this.leaderLinksSelector);
};

module.exports = MailchimpAboutPage;