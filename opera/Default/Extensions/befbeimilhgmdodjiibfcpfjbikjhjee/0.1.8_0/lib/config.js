var config = {};

config.addon = {"top": {}};

config.welcome = {
  set open (val) {app.storage.write("support", val)},
  get version () {return app.storage.read("version")},
  set version (val) {app.storage.write("version", val)},
  get open () {return (app.storage.read("support") !== undefined ? app.storage.read("support") : true)}
};

config.regexp = new RegExp([
  "\\%22ad",
  "\\.doubleclick\\.",
  "\\.googleadservices\\.",
  "\\.googletagservices\\.",
  "\\.googlesyndication\\.",
  "\\.serving\\-sys\\.com\\/",
  "[\\=\\&\\_\\-\\.\\/\\?\\s]ad[\\=\\&\\_\\-\\.\\/\\?\\s]",
  "[\\=\\&\\_\\-\\.\\/\\?\\s]ads[\\=\\&\\_\\-\\.\\/\\?\\s]",
  "[\\=\\&\\_\\-\\.\\/\\?\\s]adid[\\=\\&\\_\\-\\.\\/\\?\\s]",
  "[\\=\\&\\_\\-\\.\\/\\?\\s]adunit[\\=\\&\\_\\-\\.\\/\\?\\s]",
  "[\\=\\&\\_\\-\\.\\/\\?\\s]adhost[\\=\\&\\_\\-\\.\\/\\?\\s]",
  "[\\=\\&\\_\\-\\.\\/\\?\\s]adview[\\=\\&\\_\\-\\.\\/\\?\\s]",
  "[\\=\\&\\_\\-\\.\\/\\?\\s]pagead[\\=\\&\\_\\-\\.\\/\\?\\s\\d]",
  "[\\=\\&\\_\\-\\.\\/\\?\\s]googleads[\\=\\&\\_\\-\\.\\/\\?\\s]"
].join('|'), 'i');
