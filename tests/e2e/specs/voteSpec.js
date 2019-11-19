var VotePage = require('../pages/votePage.js');

describe('Website Link Validation', function () {
    var username;
    var password;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;
        votePage = new VotePage();
        var width = 1920;
        var height = 1200;
        browser.driver.manage().window().setSize(width, height);

        browser.sleep(5000);
    });

    afterEach(function () {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        browser.manage().deleteAllCookies();
        browser.sleep(3000);
    });

    it('should let us go to the site and vote for a player.', function () {
        votePage.navigateToSite();
        votePage.voteForPlayer();
    });


});
