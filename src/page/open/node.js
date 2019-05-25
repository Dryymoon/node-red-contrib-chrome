import { Node } from 'node-red-module-creator';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { $$browserContextGetter } = msg;
        const page = await $$browserContextGetter().newPage();
        this.send({ ...msg, $$pageGetter: () => page });
      } catch (e) {
        this.error(`Can't open page, ${e.toString()}`, msg);
      }
    });
  }
}
