chrome.storage.local.get("designed", function (items) {
  var designed = items.designed;
  if (designed == true) {
    $("#designed").attr("checked", "checked").prop("checked", true);
  } else {
    $("#designed").prop("checked", false).removeAttr("checked");
  }
});

chrome.storage.local.get("trending", function (items) {
  var trending = items.trending;
  if (trending == true) {
    $("#trending").attr("checked", "checked").prop("checked", true);
  } else {
    $("#trending").prop("checked", false).removeAttr("checked");
  }
});

$("#designed").on("change.bootstrapSwitch", function (e) {
  chrome.storage.local.set(
    {
      designed: e.target.checked,
    },
    function () {
      chrome.tabs.executeScript({
        file: "content_script.js",
      });
    }
  );
});
$("#click").on("click", function () {
  const id = document.getElementById("id").value;
  const data = { id };
  // chrome.storage.local.set({ data: data });
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(
      activeTab.id,
      { message: "data", data },
      function (res) {
        console.log("send oke");
      }
    );
  });
});

function popup() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: "start" });
  });
}
$("#trending").on("change.bootstrapSwitch", function (e) {
  chrome.storage.local.set(
    {
      trending: e.target.checked,
    },
    function () {
      chrome.tabs.executeScript({
        file: "content_script.js",
      });
    }
  );
});
