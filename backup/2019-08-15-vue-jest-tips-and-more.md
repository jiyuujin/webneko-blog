---
date: 2019-08-15
title: Jest初心者がこれをやった
description: Jestを始めるにあたって Tipsを記録、色々とハマったことも軽く共有します。
slug: vue-jest-tips-and-more
reaction: 🧮
category: Front
tags: 
 - Jest
 - TypeScript
 - Vue-CLI
 - Vue
---

秋田の Vue.js イベント [CaT vol.7](https://create-and-think.doorkeeper.jp/events/90155) (8/17) で喋らせていただきました。

<a class="link-preview" href="https://slides.com/jiyuujin/20190817#/">Vue CLI テスト Tips 集</a>

## Jestを導入する

今までのにゃんこ大戦争時のプロジェクトと違って、フロントでの品質担保を理由にテストを行います。

テストツールの選択肢で悩むことはありません。 [Vue CLI](https://cli.vuejs.org/) | [vue-test-utils](https://vue-test-utils.vuejs.org/ja/) をベースに進めます。基本的に並列実行すること。カバレッジやスナップショットのように、プラグイン不要で内製されていること。また同様に採用を決めている TypeScript との親和性も高いことが今回の採用に繋がっています (と言っておきましょう)

<a class="link-preview" href="https://vue-test-utils.vuejs.org/ja/guides/using-with-typescript.html#typescript-%E3%81%A8%E4%B8%80%E7%B7%92%E3%81%AB%E4%BD%BF%E3%81%86">TypeScript と一緒に使う</a>

```bash
# Jestを TypeScriptで使う
yarn add babel-jest jest ts-jest vue-jest -D
```

これでテストを書けるぞと思った矢先。

### なぜかハマった。

Vue CLI のインストール時にテストオプションを選択すると自動的に入る Jest ですが、なぜかテスト実行でコケてしまいます。 Babel7 で正しくコード変換されないようです。

```bash
Requires Babel "^7.0.0-0", but was loaded with "6.26.3". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel.
```

<a class="link-preview" href="https://github.com/facebook/jest/issues/6229#issuecomment-452388372">babel-jest does not transpile import/export in node_modules when Babel 7 is used #6229</a>

また babel-core とバージョンが一致していないことも判明、諸々パッケージを更新することとします。

<a class="link-preview" href="https://github.com/babel/babel/issues/8482#issuecomment-413927029">Requires Babel “7.0.0-0” but was loaded with “6.26.3” #8482</a>

気を取り直して更新すると、気付いたら色々入れていたようです。

```json
{
    "dependencies": {
        "@babel/core": "^7.4.5",
        "@babel/plugin-syntax-dynamic-import": "^7.2.0",
        "@babel/preset-env": "^7.5.4"
    },
    "devDependencies": {
        "babel-core": "^7.0.0-bridge.0",
        "babel-jest": "^24.8.0",
        "babel-plugin-transform-runtime": "^7.0.0-beta.3",
        "jest": "^24.8.0",
        "ts-jest": "^24.0.2",
        "vue-jest": "^3.0.4"
    }
}
```

## テストの視点

今回伝えたかったこと、それはフロントで何をテストすればいいのかと言った視点について。疑問を僅かながら払拭してくれるのが、公式ドキュメントの存在です。

<a class="link-preview" href="https://vue-test-utils.vuejs.org/ja/guides/#%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AA%E3%83%92%E3%83%B3%E3%83%88">一般的なヒント</a>

上記を踏まえて、以下項目を中心にテストしました。

1. コンポーネントのマウント
2. イベント発火を受け、ステートの変動に矛盾が無いか
3. 激重 API 対策

### お世話になるパッケージ

あくまでプロダクト制作に工数をかけること。

- @vue/test-utils (default)
- @testing-library/vue
- axios-mock-adapter

既に汎用的に使われているパッケージを使って少しながら楽をしましょう。

ここで通信処理を各コンポーネントで行わず、予め services ディレクトリに切り直すことをオススメします。

ざっくり言うとこんな感じで動けばオケ。

```ts
async fetch() {
    let apiService = new ApiService()
    const contractTagsData = await apiService.fetch()
}
```

このように通信処理を切り分けると、テストを書き易くなります。

そして本題とも言えるテストの視点。レスポンスが正しく返されていることはもちろん、あえてモックの返却を遅らせたケースやネットワークエラーなどを重視してテストすることにしました。

```ts
it('fetch ***** normal case', async () => {
    mockAxios.onGet('/*****', {
        params: params
    })
        .reply(200, { id: 1 })
})
```

あとはそれぞれのプロジェクトに応じて設定値を変えたりしましょう。
