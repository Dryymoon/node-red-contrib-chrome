import { Node } from 'node-red-module-creator';

export default class PuppeteerFormSelect extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { $$pageGetter } = msg;
        const { selector, value } = config;

        await $$pageGetter().select(selector, value);

        this.send({ ...msg });

      } catch (e) {
        this.error(`Can't select, ${e.toString()}`, msg);
      }
    });
  }
}
