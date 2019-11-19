// If we needed additional pages we'd put it here
// var LoginPage = require('./loginPage.js');

var VotePage = function () {
    browser.get('https://' + browser.baseUrl);
};

beforeEach(function () {
    // Again - if we needed it
    //loginPage = new LoginPage();
});

// elements
var drewBreesEntry = element(by.xpath("/html/body/div[4]/div[3]/div/div/div[1]/div[2]/div/div/div[3]/div/div/div[2]/div[1]/ol/li[5]/div/div[2]"));
var voteButton = element(by.xpath("/html/body/div[4]/div[3]/div/div/div[1]/div[2]/div/div/div[3]/div/div/div[2]/div[1]/ol/li[5]/div/div[3]/a"));
var submitButton = element(by.id("ballot-submit"));


//page objects
VotePage.prototype = Object.create({}, {

    navigateToSite: {
        value: function () {

        }
    },

    voteForPlayer: {
        value: function () {

            browser.actions().mouseMove(drewBreesEntry).perform();
            browser.sleep(3000);

            voteButton.click();
            browser.sleep(3000);

            submitButton.click();
            browser.sleep(10000);

        }
    }

});

module.exports = VotePage;