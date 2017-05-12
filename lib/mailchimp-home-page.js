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

MailchimpHomePage.prototype.getAboutLink = function() {
    return this.driver.findElement(this.aboutLinkSelector);
};

MailchimpHomePage.prototype.getAboutLinkText = function() {
    return this.driver.findElement(this.aboutLinkSelector).getText();
};

MailchimpHomePage.prototype.clickAboutLink = function() {
  this.driver.findElement(this.aboutLinkSelector).click();
  return new MailchimpAboutPage(this.driver);
};
 
module.exports = MailchimpHomePage;