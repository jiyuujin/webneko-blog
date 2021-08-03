---
date: 2021-03-06
title: Riverpod (Flutter hooks) 要点をまとめました
description: Flutter Handson Osaka 8 で Riverpod を扱ったのでこれを使う際の要点を簡単に書いた。
slug: summarize-the-points-of-riverpod
reaction: 🤓
category: Application
tags: 
 - Flutter
 - Dart
---

## 前提として `pubspec.yml` を見る

Flutter Handson Osaka 8 ではバージョン `1.26.0-17.6.pre` を利用したが、バージョン `2.0.1` でも動作に問題が無いことを確認した。

その上で今回は以下パッケージを利用した。

- [flutter_hooks](https://pub.dev/packages/flutter_hooks)
- [hooks_riverpod](https://pub.dev/packages/hooks_riverpod)
- [state_notifier](https://pub.dev/packages/state_notifier)

```yml
dependencies:
  flutter:
    sdk: flutter
  flutter_hooks: ^0.15.0
  hooks_riverpod: ^0.12.4
  state_notifier: ^0.6.0
```

## 「人狼」アプリを手段にして、状態管理の手法 Riverpod を理解する

プレイヤー入力画面と配役決め画面の製作を通して Riverpod への理解を深める。

以下に示すはプレイヤー入力画面です。

![](https://i.imgur.com/nKzUA8U.jpg)

### `ProviderScope` を使えば Provider にアクセス可能な階層をコントロールできる。

React hooks と違いクラス `HookWidget` を継承することで、該当クラス内で Flutter hooks が使えるようになる。

```dart
ProviderScope(
  child: MyApp(),
),

class MyApp extends HookWidget {
  //
}
```

## Root でなくても Provider を作成できる

役割をシャッフルして決める `shufflePositions()` を予め定義する。

```dart
final gameProvider = StateNotifierProvider((_) => Game());

class Game extends StateNotifier<int> {

  List<String> _positions = ['村人', '村人', '人狼', '人狼', '占い師', 'てるてる'];
  List<String> get positions => _positions;

  void shufflePositions() {
    _positions.shuffle();
  }

}
```

## 状態を読み込むには `useProvider` が使える

ここでも同様にクラス `HookWidget` を継承して Provider インスタンスを作成することで、該当クラス内で Flutter hooks が使えるようになる。

```dart
class GameApp extends HookWidget {

  @override
  Widget build(BuildContext context) {
    final provider = useProvider(gameProvider);
  }

}
```

先に定義した `shufflePositions()` を呼び出すことで役割をシャッフルして決められる。

```dart
class StartApp extends HookWidget {

  void start(BuildContext context, Game provider) {
    provider.shufflePositions();
  }

}
```

## 最後に

React hooks と同様の使い勝手 (クラスを継承して書くのではなく関数レベルで書けるようになるなど) が良くなれば。

作成済リポジトリは公開中です。

[jiyuujin/riverpod_web](https://github.com/jiyuujin/riverpod_web)

ロジック強化版と称し凝った「人狼」アプリは下記リポジトリです。

[YujiOnishi/jinro](https://github.com/YujiOnishi/jinro)

### ChangeNotifer について

過去に私自身が勤怠管理アプリを製作するに当たって、昨年のアドベントカレンダーで書かせていただいた。

[Flutter で始める状態管理 2020 年版](../startup-state-management-with-flutter-in-2020)

Riverpod が主流になると同時に ChangeNotifer を使う機会が減ることを感じながら、こちらも良ければ確認してみてください。
