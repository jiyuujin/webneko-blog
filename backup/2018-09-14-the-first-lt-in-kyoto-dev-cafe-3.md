---
date: 2018-09-14
title: 初めて登壇に挑戦
description: Parcelをモジュールバンドラに使って、さくっとプロフィールサイトを制作。ちなみにご縁があって初登壇させていただきました！
slug: the-first-lt-in-kyoto-dev-cafe-3
reaction: ✊
category: 
tags: 
 - Vue
 - Parcel
---

## 初LTの総括

Vue.js ユーザグループの Slack でのお誘いをきっかけに、ノリで登壇させていただくことになりました。

<a class="link-preview" href="https://docs.google.com/presentation/d/e/2PACX-1vSFU25_aUcdfksE887xYYdsG3QdlUgrQDAxZh3BRdpbA6I91HPwax6PgpEQAAK4y7EYzdeIRY2OysZ3/pub">あえて Nuxt を使わずプロフィールサイトを作った話</a>

[@SatohJohn](https://twitter.com/SatohJohn) さん始め後から聞いた話によると、15 分予定のところ 20 分話していたとのこと。時間調整は難しい。

![](https://i.imgur.com/zoe9ULw.jpg)

### Parcelを採用して、

Parcel 選定は、大きな Web アプリに成長しないことを踏まえての判断です。基本的に Config ファイルは不要、ビルド高速であること。下記のコマンドを叩くことで、簡単に Web アプリを構築できます。

```json
{
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html --public-url ."
  },
}
```

ただし実感としてはルーティング周りで挙動の怪しい印象がありました。プロダクション環境でビルド (parcel build) すると vue-router が機能していない点。中々解決できず。 出始めの新興勢力につき今後に期待と言ったところでしょうか。

## その他

さらっと流します。あくまで Vue.js Meetup という訳では無かったものの、結果 Vue を布教する回となりました。何かとディスられる jQuery、 Vue の対比は興味深かったです。
