import { Node } from 'node-red-module-creator';

export default class PuppeteerIncognitoContextStart extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { $$browserGetter } = msg;
        const context = await $$browserGetter().createIncognitoBrowserContext();
        this.send({ ...msg, $$browserContextGetter: () => context });
      } catch (e) {
        this.error(`Can't create browser context, ${e.toString()}`, msg);
      }
    });
  }
}
