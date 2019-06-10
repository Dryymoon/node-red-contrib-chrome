import { Node } from 'node-red-module-creator';

export default class PuppeteerWaitForNavigation extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { $$pageGetter } = msg;
        const { waitUntil, timeout = 30 } = config;

        await $$pageGetter().waitForNavigation({ waitUntil, timeout: timeout * 1000 });

        const content = await $$pageGetter().content();

        this.send({ ...msg, payload: content });

      } catch (e) {
        this.error(`Can't wait for navigation url, ${e.toString()}`, msg);
      }
    });
  }
}
