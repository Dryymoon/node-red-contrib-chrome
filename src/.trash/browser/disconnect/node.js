import Node from '../../node-base';

export default class PuppeteerBrowserDisconnect extends Node {
  constructor(config) {
    super(config);

    this.status({});

    this.on('input', async ({ puppeteerBrowserRef, ...msg }) => {
      this.status({ fill: "blue", shape: "dot" });

      if (puppeteerBrowserRef) {
        const browser = this.context().flow.get(puppeteerBrowserRef);
        if (browser) await browser.disconnect();
      }

      setTimeout(() => this.status({}), 500);
      this.send(msg);
    });
  }
}
