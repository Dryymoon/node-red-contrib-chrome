const puppeteer = require('puppeteer');

module.exports = function (RED) {
  function PuppeteerBrowserConnect(config) {
    RED.nodes.createNode(this, config);
    this.browserUrl = config.browserUrl;
    this.slowMo = config.slowMo;
    this.name = config.name;
    const node = this;

    // Retrieve the config node
    this.on('input', function (msg) {
      const { browserUrl, slowMo } = node;
      puppeteer.connect({ browserUrl, slowMo })
        .then((browser) => {
          msg.puppeteer = {
            browser
          };
          node.send(msg)
        })
    });
    oneditprepare: function oneditprepare() {
      $("#browserUrl").val(this.browserUrl);
      $("#slowMo").val(this.slowMo);
      $("#name").val(this.name);
    }
  }

  RED.nodes.registerType('puppeteer-browser-connect', PuppeteerBrowserConnect)
};
