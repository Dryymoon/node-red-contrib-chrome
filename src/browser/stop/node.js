import Node from '../../node-base';

export default class PuppeteerBrowserStop extends Node {
  constructor(config) {
    super(config);

    this.status({});

    this.on('input', async ({ $$browserGetter, browser, ...msg }) => {
      this.status({ fill: "blue", shape: "dot" });
      if ($$browserGetter) await $$browserGetter().close();

      setTimeout(() => this.status({}), 500);
      this.send(msg);
    });
  }
}
