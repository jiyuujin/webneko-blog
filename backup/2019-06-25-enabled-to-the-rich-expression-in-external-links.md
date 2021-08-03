---
date: 2019-06-25
title: 外部リンクの表現をリッチにする @microlink/vanilla
description: @microlin/vanillaを使って、外部リンクの表現をリッチにしました。
slug: enabled-to-the-rich-expression-in-external-links
reaction: 😇
category: Front
tags: 
 - Nuxt
 - Contentful
 - TypeScript
---

@microlink/vanilla (ある一定のアクセス数を超えると有料) を使う。

<a class="link-preview" href="https://microlink.io/docs/sdk/getting-started/overview">@microlink/vanilla</a>

```bash
yarn add @microink/vanilla
```

### Dependency Injectionを利用する

Nuxt では Dependency Injection を使える。

```ts
const microlink = require('@microlink/vanilla/umd/microlink');

export class MicrolinkPlugin {
  microlinkjs: string = '';

  constructor() {
    this.microlinkjs = microlink
  }
}

export default ({ app }, inject) => {
  inject('microlinkjs', (selector => microlink(selector)))
}
```

nuxt.config.ts で事前に準備したファイルを設定する。

```ts
module.export = {
    plugins: [
        '~plugins/microlink.ts'
    ]
}
```

そして、ライフサイクルメソッド mounted() で使う。

```ts
export default Vue.extend ({
    mounted() {
        this.$microlinkjs('.link-preview')
    }
})
```

適宜該当リンクに `link-preview` タグを設定するとリッチな表現として表示されるようになる。

```md
<a class="link-preview" href="#"></a>
```
