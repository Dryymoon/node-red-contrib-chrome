import Node from '../../node-base';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { $browserContext } = msg;
        const page = await $browserContext().newPage();
        this.send({ ...msg, $page: () => page });
      } catch (e) {
        this.error(`Can't open page, ${e.toString()}`, msg);
      }
    });
  }
}
