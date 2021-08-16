---
date: 2021-08-16
title: IDE のエクステンションに何を使っていますか
description: VSCode や IntelliJ を始め、日常的に使っているエディタのエクステンション (拡張機能) 皆さまは何を使っていますか。
slug: what-are-you-using-ide-extensions
reaction: 📐
category: Application
tags: 
 - IntelliJ
 - VSCode
---

下記イベントに伴う記事のひとつとして書かせていただいた。

[【オンライン開催】おはようエンジニア 特別編 - エディタの開発環境に役立つエクステンション](https://connpass.com/event/220380/)

筆者 (私) は IntelliJ や VSCode の二刀流として Web 界隈に生息している。

可能な限り IntelliJ 上で済ませるようにしており Docker (MySQL や PostgreSQL) なども IntelliJ 上で動かしている。

## 私がお世話になっているエクステンション

私自身全くエクステンションをインストールしていないことは無いが、エディタの機能をフル活用している訳でもありません。

ちなみに Vetur や Flutter Intl は、 Vue や Flutter といった固有のフレームワークを使う際に便利なエクステンションで、全てのデベロッパが必要という訳ではありません。

- Git Graph
- Bracket Pair Colorizer 2
   - IntelliJ では Rainbow bracket
- Code Spell Checker
- Draw io integration
   - IntelliJ では Diagrams net Integration
- Remote Containers
- Vetur
- Flutter Intl
   - IntelliJ でも Flutter Intl

またエクステンションでは無いものの、ファイル保存時に自動で ESLint fix してくれる機能がある。 IntelliJ では File Watcher という機能が存在する。

[File Watcher](https://pleiades.io/help/idea/using-file-watchers.html)

VSCode でも `setting.json` に下記設定を追加することで同様の機能を実現できる。

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

### Git Graph

コミット履歴をツリー形式で表示してくれる。

[Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

### Bracket Pair Colorizer 2

対応する括弧を色分けして表示してくれる。

[Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)

IntelliJ でも同様のエクステンションが存在する。

[Rainbow bracket](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets)

### Code Spell Checker

スペルミスを検出してくれる。

[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

### Draw io integration

設計図を描画してくれる。

[Draw.io integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)

IntelliJ でも同様のエクステンションが存在する。

[Diagrams.net Integration](https://plugins.jetbrains.com/plugin/15635-diagrams-net-integration)

### Remote Containers

Docker 内で VSCode Server を動かす。ソースコードはボリュームマウントするため Docker 内から見える (VSCode で編集できる)

[Remote Containers](https://code.visualstudio.com/docs/remote/containers)

### Vetur

言わずと知れた Vetur で Vue ファイルを操作しているとオススメのメッセージが表示されるため、ご存知の方も多いでしょう。

[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### Flutter Intl

`pubspec.yaml` に必要なライブラリ書いてインストールする。適宜初期化してロケールを追加すれば、自動で `/lib/generated` に吐き出してくれる。

[Flutter Intl](https://marketplace.visualstudio.com/items?itemName=localizely.flutter-intl)

IntelliJ でも同様のエクステンションが存在する。

[Flutter Intl](https://plugins.jetbrains.com/plugin/13666-flutter-intl)
