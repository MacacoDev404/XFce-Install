window.setTimeout(function () {
  if (app.loadReason === "install" || app.loadReason === "startup") {
    var version = config.welcome.version;
    if (!version) app.tab.open(app.homepage() + "?v=" + app.version() + "&type=install");
    else if (config.welcome.open) {
      if (app.version() !== version) {
        app.tab.open(app.homepage() + "?v=" + app.version() + "&p=" + version + "&type=upgrade");
      }
    }
    config.welcome.version = app.version();
  }
}, 3000);

app.tab.listener(function (tab) {config.addon.top[tab.id] = tab.url});
app.addon.receive("options:store", function (e) {config.welcome.open = e.support});
app.addon.receive("options:load", function () {app.addon.send("options:storage", {"support": config.welcome.open}, null)});

app.beforeRequest(function (top, initiator, current) {
  var tab = top || initiator || current;
  var gmail = /https?:\/\/(\w*.)?mail\.google\./i.test(tab);
  if (gmail) {
    var ad = config.regexp.test(current);
    if (ad) {
      // console.error(" >> Gmail ad blocked", current);
      return {"cancel": true};
    }
  }
});
