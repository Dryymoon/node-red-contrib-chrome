import Node from '../../node-base';

export default class PuppeteerIncognitoContextStart extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { $browser } = msg;
        const context = await $browser().createIncognitoBrowserContext();
        this.send({ ...msg, $browserContext: () => context });
      } catch (e) {
        this.error(`Can't create browser context, ${e.toString()}`, msg);
      }
    });
  }
}
