import Node from '../../node-base';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { code } = config;
        const { $page } = msg;
        msg.payload = await $page().evaluate((c) => eval(c), code);
        this.send(msg);
      } catch (e) {
        this.error(`Can't evaluate in page, ${e.toString()}`, msg);
      }
    });
  }
}
