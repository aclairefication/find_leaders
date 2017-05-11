var webdriver = require('selenium-webdriver');
var MailchimpAboutPage = require('./mailchimp-about-page');
 
MailchimpHomePage = function MailchimpHomePage(driver) {
    this.driver = driver;
    this.url = 'http://www.mailchimp.com';
    this.aboutLinkSelector = webdriver.By.css('[href="/about"]');
};
 
MailchimpHomePage.prototype.visit = function() {
    this.driver.get(this.url);
    return webdriver.promise.fulfilled(true);
};

MailchimpHomePage.prototype.aboutLinkPresent = function() {
    var d = webdriver.promise.defer();
    this.driver.isElementPresent(this.aboutLinkSelector).then(function(present) {
        d.fulfill(present);
    });
    return d.promise;
};

MailchimpHomePage.prototype.aboutLinkTextDisplayed = function() {
    var d = webdriver.promise.defer();
    this.driver.findElement(this.aboutLinkSelector).getText().then(function(text) {
        d.fulfill(text);
    });
    return d.promise;
};

MailchimpHomePage.prototype.clickAboutLink = function() {
  this.driver.findElement(this.aboutLinkSelector).click();
  return new MailchimpAboutPage(this.driver);
};
 
module.exports = MailchimpHomePage;