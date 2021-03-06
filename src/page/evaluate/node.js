import { Node } from 'node-red-module-creator';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { code } = config;
        const { $$pageGetter } = msg;
        msg.payload = await $$pageGetter().evaluate((c) => eval(c), code);
        this.send(msg);
      } catch (e) {
        this.error(`Can't evaluate in page, ${e.toString()}`, msg);
      }
    });
  }
}
