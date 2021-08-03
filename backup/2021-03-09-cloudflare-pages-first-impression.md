---
date: 2021-03-09
title: Cloudflare Pages を使ってみる
description: 静的サイト (SSG) のデプロイに Cloudflare Pages を使う機会があったので簡単に書いた。
slug: cloudflare-pages-first-impression
reaction: ⚡️
category: Server
tags: 
 - Cloudflare
 - Vercel
 - Netlify
 - Hosting
---

## Cloudflare Pages を使う

Cloudflare Pages を使う機会があったので簡単に書いた。

[Cloudflare Pages](https://pages.cloudflare.com/)

具体的には静的サイト (SSG) として運用を目指した。

デプロイ方法は Netlify や Vercel と同じ要領で進められる。

![](https://i.imgur.com/9dXYy1R.jpg)

気になるのは下記 3 点ほど。

- プロダクション環境のデプロイがデフォルト
- プレビュー環境のデプロイへのアクセスは現時点で無し (近く公開予定)
- ビルド時間で Vercel に軍配

暫し待つばかり。

3 つ目のビルド時間は想定外。

![](https://i.imgur.com/jh7QSrM.jpg)

同じタイミングでビルドがスタートするも、さぞキャッシュが効いていないかのような挙動。

## Google Domains でドメインを管理する

デプロイを終えまず方針として当ブログ `webneko.dev` と同じく Cloudflare Pages に乗せるドメインは Google Domains で管理したい。

その中でネームサーバは Cloudflare のものを利用する。

先日 Netlify に乗せるドメインを Google Domains で管理する話を書いた。

[dev ドメインに移行しました](../migrated-to-dev-domain-on-webneko-blog)

こちらも参考にしながら進めれば良さそうです。

### A / CNAME レコードを設定する

Cloudflare は IP アドレス `172.217.5.78` を返す。

[DNS Aレコード | Cloudflare](https://www.cloudflare.com/ja-jp/learning/dns/dns-records/dns-a-record/)

その上で A レコードに加え Google Domains 固有の DNS レコードを設定する。

- A レコードの IP アドレスに `172.217.5.78` を設定する
- CNAME レコードにベンダー固有の DNS レコード `ghs.googlehosted.com` を設定する

### リポジトリとの繋ぎ込みを設定する

デプロイ済のリポジトリに `カスタムドメイン` タブが存在するので、そこでカスタムドメインを設定する。

### ファンクション利用も 😲

Cloudflare Workers を使えば可能なようですが、今回静的サイト (SSG) の利用につきまたどこかで。

### その他

下記含め無料でできてしまう辺り Netlify や Vercel と同じくらい使い勝手は良かったです。

- SSL/TLS 有効化
- DNSSEC (DNS レスポンスが偽造されるのを保護してくれる)

## 最後に

近く実現が予定されていることを除けば、ビルド時間が気になるくらいでした。

ビルドするだけならお金はかからないこと、まだβ版であることを考え暫くは Vercel と一緒に様子を見ていきたい次第です。
