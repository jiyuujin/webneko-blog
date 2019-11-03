const microlink = require('@microlink/vanilla/umd/microlink');

export class MicrolinkPlugin {
  microlinkjs = '';

  constructor() {
      this.microlinkjs = microlink
  }
}

export default ({ app }, inject) => {
    inject('microlinkjs', (selector => microlink(selector, 'a', {
        apiKey: process.env.MICROLINK_API
    })))
};
