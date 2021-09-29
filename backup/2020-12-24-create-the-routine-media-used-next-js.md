---
date: 2020-12-24
title: Next.js (SSG) を使ったリーディングメディア開発
description: この記事は JAMStack Advent Calendar 2020 の 24 日目の記事です。Next.js (SSG) を使った JAMStack なメデイアを実現した話について書きました。
slug: create-the-routine-media-used-next-js
reaction: 📚
category: 
tags: 
 - React
 - Advent-Calendar
 - Google-Apps-Script
 - AWS
 - GCP
 - Hosting
 - Vercel
 - NextJS
 - SSG
---

JAMStack は、JavaScript と API、Markup からなることば。2 年前自ら製作を開始、現在もこうして運営中の当ブログも、この内のひとつ。しかし Headless CMS を使わずに、トリガービルドや自動ビルドを利用することでこの JAMStack を実現する話を今回させていただければ。

## 読みものリストを製作しました

ここからが本題。今回は GAS Execution API を使って、楽に JAMStack な Web プロダクトを作れるというお話。実際に製作した Web プロダクトは [Routine | Daily](https://routine.nekohack.app/) として公開中です。

![](https://i.imgur.com/diWcF7F.png)

::: message is-primary

フロントエンドのソースコードはこちら、ちなみにサーバサイド (GAS) のソースコードは現在公開していません。

[jiyuujin/routine](https://github.com/jiyuujin/routine)

:::

### 前提として、

今年の VR 勉強会で登壇させていただいた内容とかぶってしまうので一部割愛させていただく。

この登壇で伝えたかったこと、それは個人で Slack のワークスペースを持つこと。

- IFTTT を利用して RSS から Slack に集める
- 顔文字リアクションが付けられたリンクをスプレッドシートに集める

::: message is-primary

Slack を中心に世界は廻っている。

[https://webneko.dev/posts/recommend-tools-in-vr-study-3](https://webneko.dev/posts/recommend-tools-in-vr-study-3)

:::

それに加え、Slack のワークスペースを無料で使っていると、ある一定の期間を過ぎてしまうと遡って見られなくなる。

😇

### そこで、別の場所 (スプレッドシート) に保管しよう

自分自身のキャリア・趣向に合わせて、かつ無料でいつでも見返せられるものをゴールに設定。

しかし代用できる既存のサービスも無さそう。

そこで自作しようと考える。

具体的には後で見返したい情報に対して顔文字リアクションを付け、その情報については専用のスプレッドシートに保管した。

これによっていつまでも記録を残せられるようになるものと想像を膨らませた。

しかし保管しただけでは到底見返す気も起こらない。

そこで、簡単にフェッチしてこれる GAS Execution API を利用 (後述)

フロントエンドのフレームワークには今年一流行っているという理由だけで Next.js を選択。

## GAS Execution API を利用

スプレッドシートに保存されている情報をひとつのエンドポイントで取得するためには `doGet()` 関数を使えばいとも容易く取得できる。

```ts
function getData(sheetName, page) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName)
  const rows = sheet.getDataRange().getValues()
  const keys = rows.splice(0, 1)[0]
  return rows.filter(row => Number(row[3]) === Number(page)).map(function(row) {
    const obj = {}
    row.map(function(item, index) {
      obj[String(keys[index])] = String(item)
    })
    return obj
  })
}

function doGet(e) {
  const data = getData('main', e.parameter.page)
  const updatedAt = Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd HH:mm')
  const out = ContentService.createTextOutput(JSON.stringify({ data: data, updated_at: updatedAt }, null, 2))
    .setMimeType(ContentService.MimeType.JSON)
  out.setContent(JSON.stringify({ data: data, updated_at: updatedAt }, null, 2)) // JSONPテキストをセット
  return out
}
```

(ここでは `main` シートと名付けたが) 特定のシートに対してデータ全件取得できる。

```json
{
  "data": "data",
  "updated_at": "updatedAt"
}
```

そのレスポンスは JSON 形式で確認できることを確認する。

![](https://i.imgur.com/rzk1bM5.jpg)

ウェブアプリケーションとして導入するため、URL を発行すれば API として使えるようになる。

![]8https://i.imgur.com/UiO90Fa.jpg)

その発行した API をフェッチするには、ひとつ Hooks API (useEffect) もうひとつは SSR を利用する。

結論をいうと前者を選択。

その理由、それは今回実行する API がたったひとつ、クエリパラメータでページのやり取りする (後述) ため。

useEffect の副作用フックを利用してページにアクセスする度更新される方が SSG (静的サイト化) を利用する上で都合が良かった。

```ts
const [items, setItems] = useState([])
const [page, setPage] = useState(1)

useEffect(() => {
    const getItems = async () => {
        setItems([])
        const res = await fetchData(page)
        setItems(res)
    }
    getItems()
}, [page])
```

非同期でフェッチするようにしたこと。フロントエンドでページをステートのひとつとして持たせ、ページを常に監視する。ページの変更がある度にページが再レンダリングされるよう書けば良さそう。

## クエリパラメータでページのやり取りを行う

全件フェッチできるともうひとつぶち当たる問題、ページネーションをフロントエンドで管理するか、サーバサイドで管理するか。

結論をいうと、ページネーションは全てサーバサイドで管理する。今回の場合、顔文字リアクションが付けられたと同時に、そのオブジェクトプロパティにページも追加付与する。具体的なエンドポイントのイメージは下記に示す通り。

```json
{
  "data": [
    {
      "archived_at": "Thu Oct 29 2020 09:05:34 GMT+0900 (日本標準時)",
      "url": "https://webneko.dev/po ..",
      "message": "普段の読みものリストをJAMStackを使って実現する",
      "page": "5"
    },
    /* 以下同様に続く */
  ],
  "updated_at": "updatedAt"
}
```

フロントエンドではフェッチだけで済むが、これも useEffect の副作用フックを最大限活用できることを目指しているため、この設計になった。

## PWA化も忘れずに

折角ここまで来たならというけどこの PWA 化が意外と面倒、まず manifest.json を準備すること。そしてアイコンも準備すること。

### プラグインを設定してしまえば

難なく next-offline をインストールできる。

```bash
yarn add next-offline -D
```

next.config.js で `next-offline` を読み込める設定も行う。

```js
const withOffline = require('next-offline')

const nextConfig = {
  //
}

module.exports = withOffline(nextConfig)
```

この PWA 化によってホームスクリーンに「アプリとして」保存できるようになる。

## 最後に、

つらつらと書かせていただいたが、既に出来上がっているサービスを使わせてもらっているため、製作期間こそ 1-2 日あればできてしまう。

![]8https://i.imgur.com/diWcF7F.png)

既存のサービスで代用できない、というひとつの課題を解決したいという思いから、今回の製作そして現在の運用につながっている。

翌年以降もこうした課題解決力や推進力を見失わず、常に疑問を抱きながら前へ向いていこう。
