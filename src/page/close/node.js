import Node from '../../node-base';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async ({ $page, ...msg }) => {
      try {
        if ($page) await $page().close();
        this.send(msg);
      } catch (e) {
        this.error(`Can't close page, ${e.toString()}`, msg);
      }
    });
  }
}
