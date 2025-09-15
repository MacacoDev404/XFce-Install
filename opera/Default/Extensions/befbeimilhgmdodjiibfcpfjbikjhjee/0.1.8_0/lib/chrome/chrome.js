var app = {};

app.loadReason = "startup";
app.version = function () {return chrome.runtime.getManifest().version};
app.homepage = function () {return chrome.runtime.getManifest().homepage_url};
if (chrome.runtime.onInstalled) chrome.runtime.onInstalled.addListener(function (e) {app.loadReason = e.reason});
if (chrome.runtime.setUninstallURL) chrome.runtime.setUninstallURL(app.homepage() + "?v=" + app.version() + "&type=uninstall", function () {});

app.beforeRequest = function (callback) {
  var listener = function (info) {
    var url = info.url, id = info.tabId, type = info.type, initiator = info.initiator;
    if (type === 'main_frame') config.addon.top[id] = url;
    return callback(config.addon.top[id], initiator, url);
  };
  /*  */
  chrome.webRequest.onBeforeRequest.addListener(listener, {"urls" : ["http://*/*", "https://*/*"]}, ["blocking"]);
};

app.tab = {
  "open": function (url) {chrome.tabs.create({"url": url, "active": true})},
  "listener": function (callback) {
  chrome.tabs.onCreated.addListener(function (tab) {callback(tab)});
  chrome.tabs.onRemoved.addListener(function (tabId, info) {delete config.addon.top[tabId]});
  chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {callback(tab)});
  chrome.tabs.onActivated.addListener(function () {
    chrome.tabs.query({"active": true}, function (tabs) {
      if (tabs && tabs.length) {
        if (tabs[0].url) callback(tabs[0]);
      }
    });
  });
}
};

app.storage = (function () {
  var objs = {};
  window.setTimeout(function () {
    chrome.storage.local.get(null, function (o) {
      objs = o;
      var script = document.createElement("script");
      script.src = "../common.js";
      document.body.appendChild(script);
    });
  }, 0);
  /*  */
  return {
    "read": function (id) {return objs[id]},
    "write": function (id, data) {
      var tmp = {};
      tmp[id] = data;
      objs[id] = data;
      chrome.storage.local.set(tmp, function () {});
    }
  }
})();

app.addon = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.method === id) tmp[id](request.data);
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data, tabId) {
      chrome.runtime.sendMessage({"method": id, "data": data});
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          if (!tabId || (tabId && tab.id === tabId)) {
            chrome.tabs.sendMessage(tab.id, {"method": id, "data": data}, function () {});
          }
        });
      });
    }
  }
})();
