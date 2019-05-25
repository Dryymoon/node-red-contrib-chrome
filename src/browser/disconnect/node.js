import Node from '../../node-base';

export default class PuppeteerBrowserDisconnect extends Node {
  constructor(config) {
    super(config);

    this.status({});

    this.on('input', async ({ $$browserGetter, ...msg }) => {
      this.status({ fill: "blue", shape: "dot" });

      if ($$browserGetter) await $$browserGetter().disconnect();

      setTimeout(() => this.status({}), 500);
      this.send(msg);
    });
  }
}
