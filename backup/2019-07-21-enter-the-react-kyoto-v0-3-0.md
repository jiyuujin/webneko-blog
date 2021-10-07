---
date: 2019-07-21
title: React.kyoto v0.3.0を開催しました
description: 京都とついてるけど大阪で久々にやる！ 、をモットーに 2年ぶり開催となりました。
slug: enter-the-react-kyoto-v0-3-0
reaction: 😉
category: 
tags: 
 - Review
---

当初私自身が立ち上げた訳ではなく、2 年ほどブランクが空いていることもあり、比較的集客しやすい大阪に変更。

大阪なんばにある IT プロパートナーズさんにて開催する運びとなりました。

![](https://i.imgur.com/7vmYGiT.jpg)

### React 16.x Roadmap

たかが 2 年と言いたいところですが React v16.0 台になり、色々変わりました。今後も気になる機能がリリース予定、詳しくは以下公式ロードマップをご確認ください。

<a class="link-preview" href="https://ja.reactjs.org/blog/2018/11/27/react-16-roadmap.html">React 16.x Roadmap</a>

## 今回の登壇の数々

### ReactとDOMイベント

HAL 大阪　船岡之晟さんから、 React でよく見る `onClick () => { }` イベントについて。一般的な JS で見るイベントと機構が実際は違う。合成イベント (Synthetic Event)という React 独自のイベント機構のようですね。

<a class="link-preview" href="https://ja.reactjs.org/docs/events.html">合成イベント (Synthetic Event)</a>

<a class="link-preview" href="https://docs.google.com/presentation/d/1bLvV1ykK2bqReA8dlqSsEqYHzdvHyrl-5loM5JptMMI/edit">React と DOM イベント</a>

もうひとつオマケと題し以下サンプルプロジェクトを通して、なぜ `useEffect` がた変更を検知できないか。

これに対しては `useLayoutEffect` を使って同期通信に対応すること、あとは色々頑張るしかなさそうという話でした。

<a class="link-preview" href="https://codesandbox.io/s/react-useeffect-chat-example-sjcq5">Code Sandbox</a>

### unstated-next による Redux に頼らない状態管理の考察

続いて Ubie 株式会社神保嘉秀さんから。

コンテナの粒度を小さくし過ぎると煩雑にかえって大きくし過ぎると Redux が抱える課題に再び直面。

結果的には設計次第でしょうが、書き換えの頻発する state を対象に部分移行してみてはといった所感を受けました。

<a class="link-preview" href="https://github.com/jamiebuilds/unstated-next">unstated-next</a>

<a class="link-preview" href="https://speakerdeck.com/jmblog/unstated-next-niyoru-redux-nilai-ranaizhuang-tai-guan-li-falsekao-cha">unstated-next による Redux に頼らない状態管理の考察</a>

### Learning Hooks

サイボウズ株式会社 [Taiki Nishi (Nokogiri / @nkgrnkgr)](https://twitter.com/nkgrnkgr) さんから。

React v16.8 よりリリースされた Hooks API について。 `useState` や `useEffect` など、普段使っている方なら新鮮味は無いでしょう。

Recompose に頼らなくても Hooks を使えるようになったのも非常に大きいことを感じる今日この頃です。

<a class="link-preview" href="https://speakerdeck.com/undefined_name/learning-hooks">Learning-Hooks</a>

### 腐らない UI テストのための Storybook + Storyshots

最後に関西 Node 学園オーガナイザ [@shisama](https://twitter.com/shisama) さんから。

React とは直接関係は無かったですが Storybook とそれに伴う UI テストについて。

<a class="link-preview" href="https://speakerdeck.com/masashi/number-react-kyoto-v0-dot-3-0">腐らない UI テストのための Storybook + Storyshots</a>

あと、私ですが急遽当日の午前中に登壇することを決めたものの、思ったように登壇スライドの作成に時間を取れずブログ公開 (下記参照してください) のみとさせていただきました。

次回の関西 Node 学園 #7 にも参加させていただく予定です。

<a class="link-preview" href="https://webneko.dev/posts/the-react-applications-in-serverless-architecture">React で始めるサーバレス</a>

<a class="link-preview" href="https://nodejs.connpass.com/event/137950/">関西 Node 学園 #7</a>

## 最後に

次回の開催は未定です。好評であれば 2-3 か月後にまたやりましょう。

どちらにせよ、さすがにまた 2 年空けることはしません。
