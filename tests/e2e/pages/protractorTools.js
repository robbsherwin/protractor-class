const EC = protractor.ExpectedConditions;


    exports.countOccurrences = async (string, subString, allowOverlapping) => {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}


exports.jsClick = async (el) => {
  await browser.executeScript("arguments[0].click();", el);
}

exports.waitClick = async (el, seconds = 15) => {
  let millis = seconds * 1000;
  await browser.wait(EC.elementToBeClickable(el), millis)
  .catch(async () => {
      await browser.refresh();
      await browser.sleep(5000);
      await browser.wait(EC.elementToBeClickable(el), millis)
        .catch(() => { throw new Error("Unable to click element " + el.locator()); }); });
  await el.click();
  await browser.sleep(500);
  return el;
}

exports.waitFill = async (el, str, seconds=15) => {
  let millis = seconds * 1000;
  await browser.wait(EC.presenceOf(el), millis);
  await el.clear().sendKeys(str);
}

exports.expectText = async (text, seconds=15, tag='*') => {
  let millis = seconds * 1000;
  let el = element(by.xpath('//'+tag+'[contains(text(), "' + text + '")]'));
  await browser.wait(EC.visibilityOf(el), millis)
  .catch(() => { throw new Error("The expected text -" + text + "-  is not visible. Waited " + seconds + " seconds."); });
}

exports.expectTextWithRefresh = async (text, seconds=15) => {
  let millis = seconds * 1000;
  let el = element(by.xpath('//*[contains(text(), "' + text + '")]'));
  await browser.wait(EC.visibilityOf(el), millis)
    .catch(async () => {
      await browser.refresh();
      await browser.wait(EC.visibilityOf(el), millis)
      .catch(() => { throw new Error("The expected text -" + text + "-  is not visible"); }); });
}

exports.expectNoText = async (text, seconds=15) => {
  let millis = seconds * 1000;
  await browser.sleep(millis);
  let el = element(by.xpath('//*[contains(text(), "' + text + '")]'));
  await browser.wait(EC.invisibilityOf(el), millis)
  .catch(() => { throw new Error("The expected text is still visible " + el.locator()); });
}

exports.expectUrlToContain = async (text, seconds=5) => {
  let millis = seconds * 1000;
  await browser.wait(EC.urlContains(text), millis)
    .catch(() => { throw new Error("The expected URL -" + text + "-  is not displayed"); });
}

exports.expectVisible = async (el, seconds=15) => {
  let millis = seconds * 1000;
  await browser.wait(EC.visibilityOf(el), millis)
  .catch(() => { throw new Error("The expected element is not visible " + el.locator()); });
}

exports.expectNotVisible = async (el, seconds=15) => {
  let millis = seconds * 1000;
  await browser.wait(EC.invisibilityOf(el), millis)
  .catch(() => { throw new Error("The expected element is still visible " + el.locator()); });
}

exports.expectClickable = async (el, seconds=15) => {
  let millis = seconds * 1000;
  await browser.wait(EC.elementToBeClickable(el), millis)
  .catch(() => { throw new Error("The expected element is not clickable " + el.locator()); });
  return el;
}

exports.expectNotClickable = async (el, seconds=15) => {
  let millis = seconds * 1000;
  await browser.wait(EC.not(EC.elementToBeClickable(el)), millis)
  .catch(() => { throw new Error("The expected element is still clickable " + el.locator()); });
}

exports.expectPresent = async (el, seconds=15) => {
  let millis = seconds * 1000;
  await browser.wait(EC.presenceOf(el), millis)
  .catch(() => { throw new Error("The expected element is not present " + el.locator()); });
}

exports.expectPresenceOfText = async (text, seconds=15) => {
  let millis = seconds * 1000;
  let el = element(by.xpath('//*[contains(text(), "' + text + '")]'));
  await browser.wait(EC.presenceOf(el), millis)
  .catch(() => { throw new Error("The expected text -" + text + "-  is not visible"); });
}

exports.expectPresenceOfTextWithRefresh = async (text, seconds = 15, attempts = 3) => {

  let millis = seconds * 1000;
  let el = element(by.xpath('//*[contains(text(), "' + text + '")]'));

  await browser.wait(EC.presenceOf(el), millis)
    .catch(async (err) => {
      if (attempts > 0) {
        await browser.sleep(1000);
        console.log("Retrying in expectPresenceOfTextWithRefresh " + attempts);
        await browser.refresh();
        return await exports.expectPresenceOfTextWithRefresh(text, seconds, attempts - 1);
      } else {
        throw err;
      }
    });

}

exports.expectNotPresent = async (el, seconds=15) => {
  let millis = seconds * 1000;
  await browser.wait(EC.stalenessOf(el), millis)
  .catch(() => { throw new Error("The expected element is still present"); });
}

exports.getBaseGmailAddress = (address) => {
  return address.replace(/\+[^@]*/, '');
}

// WORKS ONLY IN CHROME
exports.getFileSize = async (filename) => {
  fileSize = 0;
  originalUrl = await browser.getCurrentUrl();
  await browser.get('chrome://downloads');
  items = await browser.executeScript('var items = document.querySelector(\'downloads-manager\')\n' +
    '            .shadowRoot.getElementById(\'downloadsList\').items; if (items.every(e => e.state === "COMPLETE"))\n' +
    '            return items.map(e => [e.fileName, e.total]); ')

  console.log("Downloaded items: " + JSON.stringify(items));

  for (item of items) {
    if (item[0].includes(filename)) {
      fileSizeInBytes = item[1];
    }
  }
  console.log("File size is " + fileSizeInBytes);

  await browser.get(originalUrl);
  await browser.sleep(3000);
  return fileSizeInBytes;
}

exports.toMoney = (num) => {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

// For some reason "clear()" doesn't work on certain types of fields (mainly dates), so
// this provides a way to just send a bunch of deletes/backspaces into the field
exports.manuallyClear = async (el, size=10) => {
  for (let i = 0; i < size; i++) {
    await el.sendKeys(protractor.Key.BACK_SPACE);
    await el.sendKeys(protractor.Key.DELETE);
  }
  return el;
};

exports.parseNumber = (num) => {
  return Number(num.replace(/[^0-9\.]+/g,""));
}

exports.scrollClick = async (el) => {
  new FactoryUtilities().asyncScrollIntoView(el);
  await el.click();
  return el;
}

exports.waitForElement = async (elm, attempts) => {
  if (attempts == null) {
    attempts = 180;
  };

  // first wait for element to be present
  return await browser.driver.findElement(elm).then(async function(found) {
    await browser.sleep(1000);
    return found;
  }, async function(err) { /* err hnd */
    if (attempts > 0) {
      await browser.sleep(1000);
      console.log("Retrying in waitForElement " + attempts);
      return await exports.waitForElement(elm, attempts - 1);
    } else {
      throw err;
    };
  });
};
