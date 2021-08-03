---
date: 2019-05-15
title: Tailwind CSS 1.0 ( + Nuxt 2.7) リリース
description: Tailwind CSS v1.0 リリースされました、奇しくも同日リリースとなった Nuxt v2.7も合わせて軽く。
slug: major-update-to-tailwindcss-v1
reaction: 🎨
category: Front
tags: 
 - Nuxt
 - CSS
 - Vue
---

今回は現 v0.7.4 から v1.0.0 にアップデートする話を。

詳しくは [Upgrade steps for all users](https://tailwindcss.com/docs/upgrading-to-v1/#upgrade-steps-for-all-users) をご覧ください。

### 明示的に読み込む必要が無くなった

`tailwindcss.js` を`tailwindcss.config.js` に変更する。

また `postCSS.config.js` でこの `tailwindcss.config.js` を明示的に読み込む必要が無くなったので修正する。

```js
module.exports = {
  plugins: [
-    require('tailwindcss')('./tailwind.js'),
+    require('tailwindcss'),
  ]
}
```

### インポート先が変更された

下記の通り修正してあげる必要があります。

```scss
- @tailwind preflight;
+ @tailwind base;
```

### 指定方法も、

`postCSS.config.js` を確認していただければお分かりになるかと。

具体的な数字を付加、色の濃い/薄いの表現をこの付加された数字を使って実現するように変更されている。

```scss
-  @apply bg-blue text-white font-bold py-2 px-4 rounded;
+  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
```

## Nuxt v2.7 🎉

Admin だけではなく、当ブログでもフロントに Nuxt を採用、奇しくも同日 v2.7 リリースされました。

- 開発環境でのみ SSR 時も `console.log()` が確認できるようになった
- store のウォッチ対象が追加、serverMiddleware のウォッチ改善

主に上記に示す通りですが、 TypeScript が Node.js v8 以下でサポートしなくなっていること。タイミングを見つけて現 LTS Node.js v10 に移行する必要があります。

```json
"dependencies": {
-    "nuxt": "^2.6.1",
+    "nuxt": "^2.7.1",
}
```

こちら Admin、当ブログ共に問題無くアップデートできました。

詳しくは [Nuxt v2.7](https://github.com/nuxt/nuxt.js/releases/tag/v2.7.0) をご覧ください。
