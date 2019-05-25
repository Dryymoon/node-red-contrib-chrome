import { Node } from 'node-red-module-creator';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async ({ $$pageGetter, ...msg }) => {
      try {
        if ($$pageGetter) await $$pageGetter().close();
        this.send(msg);
      } catch (e) {
        this.error(`Can't close page, ${e.toString()}`, msg);
      }
    });
  }
}
