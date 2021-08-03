---
date: 2019-02-19
title: NUXT MEETUP 7 リポート
description: 一昨日行われたLaravel JP Conference参戦の序でに、特別に東京滞在を延長！Nuxt Meetup #7に参戦しました。会議室を提供いただいた株式会社ピースオブケイク様、この度はありがとうございました。
slug: enter-the-nuxt-js-meetup-7-piece-of-cake
reaction: ⛰
category: 
tags: 
 - Nuxt
---

初めまして、2/1 京都のゲーム会社ポノス・にゃんこスタジオより転戦した Web 猫こと、jiyuujin です。

今回のミートアップは、株式会社ピースオブケイクさんで開催されました。移転したばかりの素敵なオフィス、素晴らしい環境でございました。改めて場所提供のほどありがとうございます。

スポンサーLT では、CTO [@konpyu](https://twitter.com/konpyu) さんによる登壇。メディアプラットフォーム Note の Angular から Nuxt へのリプレースについて取り上げられた。

去年の Vue Fes でも、福井烈さんの発表「note のフロントエンドを Nuxt.js で再構築した話本番運用は既に始まっている」があったように大きな話題となっています。

<a class="link-preview" href="https://vuefes.jp/speakers/fukuiretu/">note のフロントエンドを Nuxt.js で再構築した話本番運用は既に始まっている。</a>

## 掻い摘んでご紹介

### レガシーブラウザと向き合う Nuxt.js

面白法人カヤックのフロントエンドエンジニア、[@kengotoiro](http://twitter.com/kengotoiro) さんの登壇、[Lobi Web版](https://web.lobi.co/)の Angular から Nuxt へリプレースをした話でした。

開発中辛かったこととして、Nuxt が 1 系 → 2 系の移行期にありドキュメント少なくハマった。

機能拡張する場合レガシーブラウザで動くように変換するため、Polyfill.io を使うと `nuxt.config.js` の head に記載するだけで簡単に対応できる。

<a class="link-preview" href="https://slides.com/kengooowaki/nuxt-js/#/">レガシーブラウザと向き合う Nuxt.js</a>

### Nuxt を中心とした開発エコシステムと、個人開発のススメ

受託開発をメインに行っているフロントエンドエンジニア、七洋株式会社の金井淳さんから。

キッチン周りの課題を解決するサービス[small dish](https://smalldish.jp) (Beta Version)の開発で、Nuxt を採用。

Contentful で Model、Fields を永続化データで実装。Vuex ストアで献立やアイデア、いいねなど管理して、スピーディに開発している話でした。

### Catch up Nuxt.js 2018.02

最近異常に活発な Nuxt.js の活動方針について、[@andoshin11](https://twitter.com/andoshin11) さんの発表でした。

nuxt-edge を使うと、毎日ビルド・アップデートされる。その他気になった点として、以下挙げられるかと。

1. Universal Fetch 対応、ビルトインに node-fetch、fetch polyfill
2. nuxt.config.js に Promise が入った。
3. .nuxtignore ファイルがサポートされた。
4. ユニットテストで気軽に動作確認できるようになった。
5. Nuxt で TS サポート本格化。nuxt-ts が使えるようになった。

私自身 TS サポートしか知らずでしたが、色々新しい発見があり非常に興味深い話でした。

<a class="link-preview" href="https://speakerdeck.com/andoshin11/catch-up-nuxt-dot-js-2019-dot-02">Catch up Nuxt.js 2018.02</a>

### Re: ゼロから始める Nuxt 生活

株式会社 nana music でサーバサイド中心に開発する角谷さんから、音楽アプリのリプレースについて。

今回 Django + Nuxt を採用。Vuex は便利、メンテされていない typescript-template を使わないなど、技術全体を俯瞰する見方が多かったです。

<a class="link-preview" href="https://speakerdeck.com/xkxaxkx/re-zerokarashi-merunuxtsheng-huo">Re:ゼロから始める Nuxt 生活</a>

### Nuxt と Tailwind.css

急遽一人 LT のキャンセルが出て、10 分で作ってくれました。

弊社石岡の発表、Fabric Tokyo のリプレースした話。UI フレームワークにこだわった時の変更や、クラス名を考える時の辛さを払拭するため、Tailwind.css を採用。

私も機会あればこの「天才的な」CSS フレームワークを使ってみたいと。

<a class="link-preview" href="https://slides.com/masaakikunsan/deck#/">Nuxt と Tailwind.css</a>
