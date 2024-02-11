var VotePage = require('../pages/votePage.js');
const colors = require('colors');

describe('BBREF Rookie Validation', function () {
    let notInGameArray = [''];
    let inGameArray = [''];
    let cantFindPlayerArray = [''];
    
    // Good test array below.
    //let players = ['Hunter Gaddis','Matt Gage','Bryan Garcia'];

    let players = ["Henry Davis", "Trey Cabbage"];
    
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000000;
        votePage = new VotePage();
        var width = 1920;
        var height = 1200;
        browser.driver.manage().window().setSize(width, height);
        browser.sleep(2000);
    });

    afterEach(function () {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        browser.manage().deleteAllCookies();
        browser.sleep(3000);
    });

    it('should let us go to the site and vote for a player.', async function () {
        await votePage.navigateToSite("baseball-reference.com");

        for(x=0; x<players.length; x++) {
            await votePage.navigateToSite("baseball-reference.com");
            await votePage.lookUpPlayer(players[x], notInGameArray, inGameArray, cantFindPlayerArray);    
        }
        
        // The right thing to do here is to print out the arrays to files. This would also allow us to look up the 
        // players that have been categoried and not search for them again, so this would be robust if we 
        // had an interruption in the program. 

        console.log("******".red);

        console.log("PLAYERS NOT IN THE GAME:".red);

        notInGameArray.forEach(function(item, index, array) {
            console.log(item)
        });

        console.log("******".red);

        console.log("PLAYERS IN THE GAME:".green);

        inGameArray.forEach(function(item, index, array) {
            console.log(item)
        });

        console.log("******".green);

        console.log ("COULD NOT FIND THESE PLAYERS:".yellow);
        cantFindPlayerArray.forEach(function(item, index, array) {
            console.log(item)
        });
    });     

});





