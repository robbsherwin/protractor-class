#!/bin/bash
CHROME_VERSION=$1

java -Dwebdriver.chrome.driver=./chromedriver_${CHROME_VERSION} -jar ./selenium-server-standalone-3.141.59.jar -port 4444
