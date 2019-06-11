import { Node } from 'node-red-module-creator';

export default class PuppeteerFormSelect extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { $$pageGetter } = msg;
        const { selector, value, waitUntil, timeout } = config;

        await $$pageGetter().waitForSelector(selector, { timeout: 30 * 1000 });

        if (waitUntil === 'selected') {
          await $$pageGetter().select(selector, value);
        } else {
          $$pageGetter().select(selector, value).catch(() => null);

          await $$pageGetter().waitForNavigation({ waitUntil, timeout: timeout * 1000 });
        }

        this.send({ ...msg });

      } catch (e) {
        // console.error(e);
        this.error(`Can't select, ${e.toString()}`, msg);
      }
    });
  }
}
