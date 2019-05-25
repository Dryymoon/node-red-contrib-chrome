import { isUri } from 'valid-url';
import isString from 'lodash/isString';
import { Node } from 'node-red-module-creator';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { $$pageGetter, payload: urlFromMsg } = msg;
        const { url: urlFromConfig, waitUntil, timeout = 30 } = config;
        let url = urlFromConfig || urlFromMsg;

        if (!url || !isString(url) || !isUri(url)) throw new Error('no url passed');

        await $$pageGetter().goto(url, { waitUntil, timeout: timeout * 1000 });

        const content = await $$pageGetter().content();

        this.send({ ...msg, payload: content });

      } catch (e) {
        this.error(`Can't goto url, ${e.toString()}`, msg);
        // this.send([null, msg]);
      }
    });
  }
}
