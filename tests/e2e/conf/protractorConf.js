function getBrowser() {
  if (typeof process.env.BROWSER === "undefined") {
    console.log(
      "Browser environment variable undefined, defaulting to Chrome."
    );
    return "chrome";
  } else {
    console.log(
      "Browser defined with variable as " + process.env.BROWSER + "."
    );
    return process.env.BROWSER;
  }
}

function determineSeleniumAddress() {
  var typeBrowser = getBrowser();

  if (typeBrowser.toLowerCase() === "firefox") {
    return "http://localhost:4443/wd/hub";
  } else if (typeBrowser.toLowerCase() === "internet explorer") {
    return "http://localhost:4445/wd/hub";
  } else {
    return "http://localhost:4444/wd/hub";
  }
}

exports.config = {

  SELENIUM_PROMISE_MANAGER: false,
  
  seleniumAddress: determineSeleniumAddress(),

  suites: {
    bbref: "../specs/bbref.js",
    votePlayer: "../specs/voteSpec.js"

  },

  framework: "jasmine2",

  capabilities: {
    browserName: getBrowser()
  },

  localSeleniumStandaloneOpts: {
    jvmArgs: ["-Dwebdriver.ie.driver=C:\\Users\\automation\\IEDriverServer.exe"]
  },

  onPrepare: function() {
    var currentlyUsedBrowser = getBrowser();

    if (currentlyUsedBrowser.toLowerCase() === "microsoftedge") {
      console.log("Using Edge browser!");
      browser.sleep(5000);
    } else {
      console.log("Using " + currentlyUsedBrowser);
    }

    var width = 1920;
    var height = 1080;
    browser.driver
      .manage()
      .window()
      .setSize(width, height);

    // Override the timeout for webdriver.
    browser
      .manage()
      .timeouts()
      .setScriptTimeout(30000);

    // add to account for redirect to hosted login, set to false on afterEach
    browser.ignoreSynchronization = true;

    restartBrowserBetweenTests = true;

    var jasmineReporters = require("jasmine-reporters");

    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig().then(function(config) {
      // you could use other properties here if you want, such as platform and version
      var browserName = config.capabilities.browserName;

      if (typeof process.env.PAGE_ENVIRONMENT !== "undefined") {
        browser.baseUrl = process.env.PAGE_ENVIRONMENT;
        console.log("Base URL = " + process.env.PAGE_ENVIRONMENT);
      } else {
        console.log("Environment variable undefined, failing test");
      }

      var junitReporter = new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: "testresults",
        // this will produce distinct xml files for each capability
        filePrefix: browserName + "-xmloutput",
        modifySuiteName: function(generatedSuiteName, suite) {
          // this will produce distinct suite names for each capability,
          // e.g. 'firefox.login tests' and 'chrome.login tests'
          return browserName + "." + generatedSuiteName;
        }
      });
      jasmine.getEnv().addReporter(junitReporter);
    });
  }
};
