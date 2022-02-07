// If we needed additional pages we'd put it here
// var LoginPage = require('./loginPage.js');
var tools = require('./protractorTools');
const colors = require('colors');

var VotePage = function () {
    //browser.get('https://' + browser.baseUrl);
};

beforeEach(function () {
    // Again - if we needed it
    //loginPage = new LoginPage();
});

// elements
var searchBar = element(by.xpath("//*[contains(@aria-label, \"Enter a player, team or section name\")]"));
var searchButton = element(by.xpath('//*[@id="header"]/div[3]/form/input[1]'));
var metaMoreButton = element(by.id("meta_more_button"));
var specificPlayerPageLink = element(by.xpath('/html/body/div[2]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]/strong/a'));


//page objects
VotePage.prototype = Object.create({}, {

    navigateToSite: {
        value: async function (siteName) {
            await browser.get('https://' + siteName);

        }
    },

    lookUpPlayer: { 
        value: async function (playerName, notInGameArray, inGameArray, cantFindPlayerArray) {

            await browser.sleep(1000);
            await searchBar.click();
            await browser.sleep(1000);
            await tools.waitFill(searchBar, playerName);
            await browser.sleep(1000);
            await tools.waitClick(searchButton);
            await browser.sleep(2000);

            let playerFound = true;

            var entirePage = element.all(by.xpath("//*")).get(0);
            var specificText = "";
            specificText = await entirePage.getText();

            if (await specificText.includes("Players who appeared or managed in the major leagues.")) {

                // Couple things may be going on. bbred does a stupid thing where if there is one link because of a different "given name" it makes you
                // click on another link on this page. So if there is just one instance of "/players/" in text then it means there is just one link and we
                // should click it.

                specificText = await entirePage.getText();
                var totalPlayerCount = await tools.countOccurrences(specificText, "/players/", false);
                await console.log("totalPlayerCount:" + totalPlayerCount);

                if (totalPlayerCount > 1) {
                    //console.log("Spot-check this - we are on the determination page! Adding to cantFindPlayerArray");
                    console.log("Too many players came up on the determination page. Can't reliably find player.")
                    await cantFindPlayerArray.push(playerName);
                    playerFound = false;    
                }
                else {
                    // Check to see if we have the extra page 
                    const exists = await specificPlayerPageLink.isPresent();

                    if (exists) {
                        await console.log("The extra page was here. Clicking the first one.");
                        await specificPlayerPageLink.click();
                    }
                    else {
                        await console.log("Extra page was NOT here");
                    }                    
                }
            }

            if (await specificText.includes("Try refining your search in the box above")) {
                console.log("This name was simply not found at all:" + playerName);
                await cantFindPlayerArray.push(playerName);
                playerFound = false;
            }

            // Presumably we are on the right page now. 
            // Check to see if we have the more button 

            const moreButtonExists = await metaMoreButton.isPresent();
            if (moreButtonExists) {
                await console.log("The more button was here.");
                await metaMoreButton.click();
                await browser.sleep(1000);
            }


            // Getting all the text again after we hit the more button. 

            entirePage = element(by.xpath("//*"));
            specificText = "";
            specificText = await entirePage.getText();

            if (playerFound) {
                // If the word Position is there then we are probably on the right page
                if (specificText.includes("Position")) { 
                    await console.log("The word Position was found.");
                    
                    if (specificText.includes("Still Intact through 2022")) {
                        await console.log(playerName + " will not be in the game. Rookie status is still intact.");
                        await notInGameArray.push(playerName);
                    }
                    else {
                        await console.log("Rookie text not found for:" + playerName + ", they will be in the game.");
                        await inGameArray.push(playerName);
                    }
                }
                else {
                    await console.log("Page probably wrong, can't find the word Position:");
                    await cantFindPlayerArray.push(playerName);
                }
            }
        }
    }
    

});

module.exports = VotePage;