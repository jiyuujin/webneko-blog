---
date: 2019-02-04
title: 東京で初登壇させていただきました
description: 昨年後半より、露出をメキメキと増やしていますが、この度東京で初めて喋る機会をいただきました。
slug: enter-the-laravel-vue-js-meetup-7
reaction: 🗼
category: 
tags: 
 - Laravel
---

5 分 LT でしたが想定以上に喋り過ぎてしまい、当初考えていた Laravel で Google Oauth2 認証を使って業務効率化を図った話でも良かったでしょう。

近い内にどこかで、と考えておりますのでその際はよろしくお願いします。

## コンシューマ向け SPAでプロダクトを開発して得た知見

前置きとして今回はにゃんこ大戦争とは別の経験から話しました。公式サイトのみ PC/SP 両対応、アプリ内ブラウザは文字通り SP のみ。 CSS フレームワークを一切採用せず、複雑な mixins も採用していません。Web サイト側で API 40-50 程度、 Component は 100 超えの規模感。管理画面もゼロから制作していましたが、先の 2-3 倍の規模感をご想像ください。

<a class="link-preview" href="https://slides.com/jiyuujin/20190131">コンシューマ向け SPA でプロダクトを開発して得た知見</a>

## その他 LTセッション

### 初めてのLaravelで学習を始めるまでのお話

[@show60](https://twitter.com/show60)さんの登壇、Laravel を始める上で必須の環境構築、奥の深い設計周りについて。初心者ならでは、の詰まった点を発表されました。

<a class="link-preview" href="https://speakerdeck.com/show60/chu-metefalselaraveldexue-xi-woshi-merumadefalseohua">初めての Laravel で学習を始めるまでのお話</a>

### Popular Vue.js UI Frameworks in 2019

[株式会社プラムザ (plumsa)](https://www.plumsa.co.jp/) ララ・ベル子さんの「中の人」の登壇、 UI フレームワークを Github スター数で比較してみた話でした。

<a class="link-preview" href="https://speakerdeck.com/fromarm4/popular-vue-dot-js-ui-frameworks-in-2019">Popular Vue.js UI Frameworks in 2019</a>

### 実運用におけるLaravelとNuxtでのRepositoryのレイヤ分割の話

[@konshou](https://twitter.com/konshou)さんの登壇、クリーンアーキテクチャや ADR など実際によく見る構図について。

これらは実際にどう使われているの、といった観点で話されました。

1. DB などデータソースに変更があった場合、ドメインのレイヤのみ変更する
2. フロントとのつなぎ込みの変更があった場合、ServiceProvider のレイヤのみ変更する

<a class="link-preview" href="https://speakerdeck.com/konshou/shi-yun-yong-niokerularaveltonuxtdefalserepositoryfalsereiyafen-ge-falsehua">実運用における Laravel と Nuxt での Repository のレイヤ分割の話</a>

### Testing on Laravel

[@nunulk](https://twitter.com/nunulk) さんの登壇、 Laravel でのテストの話。

これまでスピードを重視したことで個人的にはテストをがっつり書いてこなかった人でしたが、 Model Factory + Faker の辺りが凄く気になりました。

そろそろ本気を出してテストを書いていきたいですね。

<a class="link-preview" href="https://speakerdeck.com/nunulk/testing-on-laravel">Testing on Laravel</a>
