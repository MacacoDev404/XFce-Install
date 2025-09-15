var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {
    core.netrequest.register();
  },
  "action": {
    "storage": function (changes, namespace) {
      /*  */
    }
  },
  "netrequest": {
    "register": async function () {
      await app.netrequest.rules.remove.by.action.type("allow");
      await app.netrequest.rules.remove.by.action.type("block");
      await app.netrequest.display.badge.text(config.youtube.badge);
      /*  */
      if (config.youtube.regexps.block) {
        for (let i = 0; i < config.youtube.regexps.block.length; i++) {
          app.netrequest.rules.push({
            "action": {
              "type": "block"
            },
            "condition": {
              "isUrlFilterCaseSensitive": false,
              "initiatorDomains" : ["youtube.com"],
              "regexFilter": config.youtube.regexps.block[i],
              "excludedResourceTypes": ["sub_frame", "main_frame"]
            }
          });
        }
      }
      /*  */
      if (config.youtube.annotations === true) {
        for (let i = 0; i < config.youtube.regexps.annotations.length; i++) {
          app.netrequest.rules.push({
            "action": {
              "type": "block"
            },
            "condition": {
              "isUrlFilterCaseSensitive": false,
              "initiatorDomains" : ["youtube.com"],
              "regexFilter": config.youtube.regexps.annotations[i],
              "excludedResourceTypes": ["sub_frame", "main_frame"]
            }
          });
        }
      }
      /*  */
      if (config.youtube.regexps.allow) {
        for (let i = 0; i < config.youtube.regexps.allow.length; i++) {
          app.netrequest.rules.push({
            "action": {
              "type": "allow"
            },
            "condition": {
              "initiatorDomains" : ["youtube.com"],
              "regexFilter": config.youtube.regexps.allow[i],
              "excludedResourceTypes": ["sub_frame", "main_frame"]
            }
          });   
        }
      }
      /*  */
      await app.netrequest.rules.update();
    }
  }
};

app.options.receive("badge", function (e) {
  config.youtube.badge = e;
  core.netrequest.register();
});

app.options.receive("annotations", function (e) {
  config.youtube.annotations = e;
  core.netrequest.register();
});

app.options.receive("storage", function () {
  app.options.send("render", {
    "badge": config.youtube.badge,
    "annotations": config.youtube.annotations
  });
});

app.on.startup(core.start);
app.on.installed(core.install);
app.on.storage(core.action.storage);