---
date: 2021-05-27
title: プロフィールサイトのドメインを移管しました
description: 当ブログとは別に製作・運用しているプロフィールサイトのドメインを移管した話について書きました。
slug: transfered-to-my-own-oraganization-domain-on-profile-website
reaction: 🐷
category: Server
tags: 
 - AWS
 - React
 - Gatsby
 - Hosting
 - HTTPS
---

当ブログとは別に製作・運営しているプロフィールサイトの話です。

[Web Developer | Yuma Kitamura](https://yuma-kitamura.nekohack.me)

![](https://i.imgur.com/sN5nHoS.jpg)

この度ドメインを移管しました。

```
old
https://yuukit.me

new
https://yuma-kitamura.nekohack.me
```

## そもそもドメイン移管した訳

初見のひとに yuukit を伝えたところでイマイチ分かりづらい。

姓名を入れたウェブサイトの方が逆に分かりやすい。また自身が個人 organization を近く建てる身であるのを踏まえ、サブドメインに姓名を盛り込んだ。

## 手続きごとは丁寧に

基本的に自分自身の所有するドメインは全て Google Domains で管理している。

この方針に例外は無い。

### 実際にやったこと

前提として、プロフィールサイトは S3 の静的サイトホスティングを利用している。

- AWS の DNS を利用するため Route53 ホストゾーンを作成する
- ACM で SSL 証明書をリクエストする
    - Route53 に CNAME が自動で生成されていることを確認する
- リクエストした SSL 証明書を発行でき次第 CloudFront と紐付ける
    - Route53 でサブドメインパスに対し A レコードを設定していることを確認する

基本的には 2 年前に書いた当ブログを dev ドメインへ移行した時と、やっていることは変わらないです。

[dev ドメインに移行しました](../posts/migrated-to-dev-domain-on-webneko-blog)

また私のプロフィールサイトでは日本語のみならず英語にも対応している。

双方の Base Path `ja/*` や `en/*` にも HTTPS へリダイレクトさせる設定を仕込んだ。

- https://yuma-kitamura.nekohack.me/ja
- https://yuma-kitamura.nekohack.me/en

これに伴い双方ともアクセスできるようになった。

## 最後に

ドメイン移管後も引き続き当ブログと合わせ、よろしくお願いいたします。

- https://yuma-kitamura.nekohack.me
- https://webneko.dev
