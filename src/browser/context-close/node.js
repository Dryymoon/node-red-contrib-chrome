import Node from '../../node-base';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async ({ $$browserContextGetter, ...msg }) => {
      try {
        if ($$browserContextGetter) await $$browserContextGetter().close();
        this.send(msg);
      } catch (e) {
        this.error(`Can't close browser context, ${e.toString()}`, msg);
      }
    });
  }
}
