var config = {};

config.log = false;

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.youtube = {
  set badge (val) {app.storage.write("badge", val)},
  set annotations (val) {app.storage.write("annotations", val)},
  get badge () {return app.storage.read("badge") !== undefined ? app.storage.read("badge") : true},
  get annotations () {return app.storage.read("annotations") !== undefined ? app.storage.read("annotations") : false},
  "regexps": {
    "allow": [
      "\\.googlevideo\\.",
      "\\/api\\/stats\\/qoe\\?"
    ],
    "annotations": [
      "\\/annotations_module\\.", 
      "\\/annotations_invideo\\?"
    ],
    "block": [
      "\\%22ad",
      "\\&adfmt\\=",
      "\\.atdmt\\.",
      "watch7ad\\_",
      "\\/api\\/ads",
      "\\.innovid\\.",
      "\\/adsales\\/",
      "\\/adserver\\/",
      "\\.fwmrm\\.net",
      "\\/stats\\/ads",
      "ad\\d-\\w*\\.swf$",
      "\\.doubleclick\\.",
      "flashtalking\\.com",
      "adservice\\.google\\.",
      "\\/www\\-advertise\\.",
      "s0\\.2mdn\\.net\\/ads",
      "google\\-analytics\\.",
      "\\.googleadservices\\.",
      "\\.googletagservices\\.",
      "\\.googlesyndication\\.",
      "\\.serving\\-sys\\.com\\/",
      "youtube\\.com\\/get_midroll_",
      "youtube\\.com\\/ptracking\\?",
      ":\\/\\/.*\\.google\\.com\\/uds\\/afs",
      "\\/csi\\?v\\=\\d+\\&s\\=youtube\\&action\\=",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]ad[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]ads[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adid[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adunit[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adhost[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adview[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]pagead[\\=\\&\\_\\-\\.\\/\\?\\s\\d]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]googleads[\\=\\&\\_\\-\\.\\/\\?\\s]"
    ]
  }
};