import Node from '../../node-base';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async ({ $browserContext, ...msg }) => {
      try {
        if ($browserContext) await $browserContext().close();
        this.send(msg);
      } catch (e) {
        this.error(`Can't close browser context, ${e.toString()}`, msg);
      }
    });
  }
}
