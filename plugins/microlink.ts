const microlink = require('@microlink/vanilla/umd/microlink');

export class MicrolinkPlugin {
  microlinkjs: string = '';

  constructor() {
    this.microlinkjs = microlink
  }
}

export default ({ app }, inject) => {
  inject('microlinkjs', (selector => microlink(selector)))
};
