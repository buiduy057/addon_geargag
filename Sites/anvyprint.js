var designed = false;
chrome.storage.local.get("designed", function (items) {
  designed = items.designed;
});

var trending = false;
chrome.storage.local.get("trending", function (items) {
  trending = items.trending;
});

// let data;
// chrome.storage.local.get("data", function (item) {
//   data = item;
//   // console.log(data);
// });
chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "start") {
    document.location.reload();
  }
});

// FUNCTION
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

function get(name) {
  if (
    (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
      location.search
    ))
  )
    return decodeURIComponent(name[1]);
}

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(request);
  if (request.message === "data") {
    dataRequest = request.data;
    // console.log(request.data);
    getPage();
  }
});

function ClickButton() {
  // console.log("ok");
  const modal = $("#orderProductByCatalog___BV_modal_header_");
  const buttonClose = $(modal).find("button.close");
  $(buttonClose).click();
}
function InputdispatchEvent(ele, data) {
  const item = document.querySelector(`${ele}`);
  if (ele.indexOf("(123) 456-789") !== -1) {
    item.value = `+1 ${data}`;
    return item.dispatchEvent(new Event("change", { bubbles: true }));
  } else {
    item.value = data;
    return item.dispatchEvent(new Event("change", { bubbles: true }));
  }
}
function InputValue(data) {
  // console.log(data);
  const first_name = `input[placeholder="First Name"]`;
  InputdispatchEvent(first_name, data.first_name);
  const last_name = `input[placeholder="Last name"]`;
  InputdispatchEvent(last_name, data.last_name);
  const phone = `input[placeholder="(123) 456-789"]`;
  InputdispatchEvent(phone, data.phone);
  const address = `input[placeholder="1234 Main St"]`;
  InputdispatchEvent(address, data.address);
  const address2 = `input[placeholder="Apartment or suite"]`;
  InputdispatchEvent(address2, data.address2);
  const city = `input[placeholder="City"]`;
  InputdispatchEvent(city, data.city);
  const postcode = `input[placeholder="Zip code"]`;
  InputdispatchEvent(postcode, data.postcode);
}
function SelectValue(data, id) {
  $(id).each(function (_, value) {
    let item = $(value).text();
    if (item.indexOf(data) !== -1) {
      // console.log(value);
      return $(value).children().children().click();
    }
  });
}
function SelectValue02(data, id) {
  $(id).each(function (_, value) {
    let item = $(value).text();
    console.log(item);
    console.log(data);
    if (item.indexOf(data) !== -1) {
      return $(value).children().children().click();
    }
  });
}
async function getPage() {
  try {
    // console.log(dataRequest);
    await ClickButton();
    if (Object.keys(dataRequest).length > 0) {
      const rq = await fetch(
        `https://api.customray.com/ajax/get-shipping-address?order_id=${dataRequest.id}`
      );
      const data = await rq.json();
      let country = data.country.code.toUpperCase();
      let region = data.region.code.toUpperCase();
      const country_id = `#__BVID__99 .multiselect__content li`;
      await SelectValue(country, country_id);
      const region_id = `#__BVID__103 .multiselect__content li`;
      setTimeout(() => {
        SelectValue(region, region_id);
      }, 1000);

      await InputValue(data);
    }
  } catch (e) {
    console.error(e);
  }
}

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
