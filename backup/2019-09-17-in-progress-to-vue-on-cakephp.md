---
date: 2019-09-17
title: 気にせず MPA + TS として導入しよう
description: Vue + MPA で構成されるWebアプリにTSを導入するためにこれだけは最低限守っていることなどを話しました。
slug: in-progress-to-vue-on-cakephp
reaction: 💪
category: Front
tags: 
 - CakePHP
 - Vue-CLI
 - Vue
---

最近は React/Serverless のお仕事と並行して、CakePHP に Vue を導入するお仕事を進めてます。既に一部リリース済みですが既存のような新規案件、負債は決して存在しないとは言えないちょっぴりカオスな環境。先日その MPA 導入過程の中でも vue.config.js に主眼を置いて書きました。

<a class="link-preview" href="https://webneko.dev/posts/vue-config-and-more">vue.config.js</a>

### 後々になって変えたいと言われると

その心は TypeScript を選定するか、結論は TS Go です。

後から TypeScript で書いた方が良かったと後悔するくらいなら、という気持ちが強かったです。

## Lintを考える

早速 .eslintrc.js の初期設定では以下参考にさせていただきました。

<a class="link-preview" href="https://teppeis.hatenablog.com/entry/2019/02/typescript-eslint">@typescript-eslint ことはじめ</a>

最初から黄金比率 (まで行かなくても) 良いです。

```js
module.exports = {
    extends: [
        'plugin:vue/essential',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        '@vue/typescript'
    ],
    plugins: ['@typescript-eslint']
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module'
    }
}
```

今回この組み合わせ(ESLint+Prettier)に加えて、一番のキモは eslint-config-standard も継承したこと。

```bash
yarn add -D eslint-config-standard
yarn add -D eslint-plugin-node
yarn add -D eslint-plugin-prettier
yarn add -D eslint-plugin-promise
yarn add -D eslint-plugin-standard
```

PR でのレビューを受け設定させていただきました。大変ありがとうございます。

細々としたルールの記述が減り、よりメンテし易くなりました。

CI に Gitlab-CI を使っていますが無難に `eslint` コマンドを使いましょう。

```bash
npx eslint ./ --ext vue,js,ts
```

また `tsc` コマンドも利用すること。

```bash
npx tsc --noEmit
```

トランスパイルの結果を JavaScript には出力しないオプションをすすめます。

### 順序立てて型安全を追求しましょう

これを踏まえて。

1. エンドポイントを interface で定義
2. その他最初は (分かんなかったら) Any で対応

全てはサーバサイドとの通信を安全に完結させるため。

通信処理をひとつの module として切り分け、必要に応じてこの module をインポートして返却値を厳密に管理する。

```ts
export default class SummaryService {
    public async fetchSummary(
        ids: string[],
        person: string,
        createdAt: string
    ): Promise<SummaryEndpoint> {
        const params = getParams(ids, person, createdAt)
        const res = await axios.get(`/summary?${params}`)
        return res.data
    }
}
```

今回 MPA として Vue を導入(将来的には SPA として一括導入を検討)している。

画面全体でデータを管理する必要は無く vuex を一切採用していない。

上記のように非同期通信を最大限活用、Promise.all 本当に便利です。

```ts
mounted() {
    Promise.all([
        this.fetchSummaryA(),
        this.fetchSummaryB(),
        this.fetchSummaryC(),
        this.fetchSummaryD()
    ])
}
```

あとテーブルやグラフチャート用にデータを加工する訳ですが、必要に応じて props を渡します。

親コンポーネントから孫コンポーネントのように 2 世代以上を超えて引数を渡すといったことの無いような設計を堅持しています。

おいおい自力で型定義を書ければ良いでしょう。

基本的にエンドポイントの型定義を書けると、特にプラグインをインストールしない限り問題無いです。

今回トースト UI を別途入れているが、流石に自力で型定義を書かなければいけません。

```ts
declare module "vue-toasted" {
    import Vue, { PluginFunction } from "vue";
    function install(): PluginFunction<any>;
    export interface VueToasted {
        show(message: string): void;
    }
}
```

## コンポーネントで既存のCSSと競合

実際にコンポーネントでは services にアクセスするための加工済データをローカルステートとして管理。こうしたコンポーネント化を進めるに当たって新たに導入検討を進めていた bootstrap-vue の存在。

### 想定と比べて深刻かも

ボタンの背景色が表示されない、モーダルの動かない事象が発生。

Vue CLI 内では Scoped CSS を採用、それはあくまで Vue Component 内の話。

既存の CSS はグローバルに書かれており、競合が発生するのも納得。

そこで CSS のベタ書きに変更。今回は一例にモーダルを自作コンポーネント化しました。

```html
<atoms-button
    ref="branchSelectButton"
    :text="title"
    @handleClick="displayModal"
></atoms-button>
<div v-if="showModal === true">
    <div class="modal-mask" @click.self="showModal = false">
        <div :style="modalWrapperStyle">
            <div class="modal-container">

            </div>
        </div>
    </div>
</div>
```

基本的な考え方としてボタンをタップした時に `showModal` フラグを `true` にする一方で、マスク領域をタップすると `showModal` フラグを `false` にしています。

また Button や Input などで使える v-model をあえてプロジェクト内で使わない方針を立てました。

```html
<input
    v-model="searchText"
/>
```

大変便利であることは承知ですが。

```html
<input
    :value="searchText"
    @update="updateSearchText"
/>
```

内部的にイベントハンドラも含んでいることは非常に煩わしいのです。

## 最後に

細々とした Tips を羅列した、これまでと違ってとても不恰好な登壇になってしまいました。

<a class="link-preview" href="https://slides.com/jiyuujin/20190918#/">小さなことから改善してる話</a>
