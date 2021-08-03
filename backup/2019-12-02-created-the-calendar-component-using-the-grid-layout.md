---
date: 2019-12-02
title: アドベントカレンダーを自作する
description: この度アドベントカレンダーの専用ページを自作。まずは中核の存在であるカレンダーをGridレイアウトを使って作ります。
slug: created-the-calendar-component-using-the-grid-layout
reaction: 🗓
category: Front
tags: 
 - Vue
 - Advent-Calendar
 - Nuxt
 - CSS
---

## 俺だけアドベントカレンダーとは、

Qiita のアドベントカレンダーでもいくつか書かせていただく予定ですが、それ以外でも技術ネタを発信したいと考え、当ブログに俺だけアドベントカレンダー 専用ページを作りました。

<a class="link-preview" href="https://webneko.dev/advent-calendar/2019">Advent Calendar 2019</a>

この年末恒例特別なイベントという印象がありますが、基本的にはカレンダーを作れば良いのです。当ブログでは既に Vuex ストアでブログのコンテンツ情報が格納されています。ブログのリンク先を各日に設定、1 日から 25 日まで公開することで大方の目的は達成します。

### 曜日から開始、終了位置を求める

日付操作には moment より軽量の `dayjs` を使います。

```ts
const startDay = dayjs(`${this.year}/12/01`).format('dddd')
```

キモは開始日 12 月 1 日の曜日を確認することです。日曜日の場合は 0、月曜日の場合は 1 のように、開始位置を求めます。

```ts
const endDay = dayjs(`${this.year}/12/31`).format('dddd')
```

この開始位置は、月が始まるまでの余白を設定する際に役立ちます。同様に終了日 12 月 31 日の曜日も確認し、終了位置を求めます。

### Gridレイアウトを利用する

カレンダー全体を囲う要素に対して `display: grid;` を指定。

```css
.calendar {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, minmax(20px, 1fr));
    grid-template-rows: 50px;
    grid-auto-rows: 120px;
    overflow: auto;
}
```

その子要素を 7 行ずつループさせれば OK 25 日まで日付の他にアイコンを表示。26 日以降についてはアドベントカレンダーの決まりにより、ブログ記事のリンクと紐付けできないよう日付のみを表示するようにしました。

```css
.day img {
    opacity: 100%;
}
```

該当日の記事が投稿され次第、アイコンの opacity を 100％にし、そのリンク先へ飛べるようにします。

### 開始、終了位置をここで使う

先ほど求めた開始位置や、終了位置をどこで使うのか。

```html
<div
    v-for="i in startOfMonth"
    :key="i"
    class="day day--disabled"
/>
```

2019 年 12 月こそ日曜日からスタートしますが、毎月必ず日曜日から始まる訳ではありません。ですがカレンダーの並びとしてこの日曜日から始めなければならず、開始位置（または終了位置）がキモになるという訳です。

## 詳しくは

ソースコードを確認してください。

<a class="link-preview" href="https://github.com/jiyuujin/webneko-blog/blob/master/components/AdventCalendar.vue">AdventCalendar.vue</a>

あとは容易に動的ページに載せるだけ。 `pages/advent-calendar/` に `_year.vue` を作成し、Route パラメータに該当年を指定します。

```ts
async asyncData({ route }) {
    await store.dispatch('product/fetchPost', {
        'slug': '',
        'month': `${route.params.year}-12`
    })
}
```

最後のキモは Route パラメータ `route.params.year` を使ってアクセスしていること。

既に Vuex ストアでコンテンツ情報を取得しており、今回もブラウザのレンダリング前に該当する年のコンテンツ情報を取得すべく asyncData で呼び出した。

### ここだけの話、来年以降も使えます

該当年を入れるようにしたことで以後使えるようになります。
