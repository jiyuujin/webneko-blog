---
date: 2021-10-04
title: 家計簿アプリの null-safety 対応
description: 先週土曜日 (2021/10/02) 開催の Flutter Handson Osaka 9 で製作した家計簿アプリ。その null-safety 対応、また Chart 系ライブラリの変更も行ったので簡単に書かせていただいた。
slug: the-household-account-app-then
reaction: 😾
category: Application
tags: 
 - Flutter
 - Dart
 - Riverpod
---

家計簿一覧の取得、それに伴うデータの登録を可能にしたアプリで、簡易データベースとして Google Spreadsheet を利用している。

当ハンズオンでは Dart 2.7 (Flutter 2.2.2-stable) を利用した。

詳しくは下記リポジトリをご確認ください。

[YujiOnishi/flutter_api_handson](https://github.com/YujiOnishi/flutter_api_handson)

そんな家計簿アプリをさらに「いま風」に更新してみた。

主な変更内容は下記の通りです。

- Dart 2.12 以上に更新 (null-safety 適用)
- React Hooks の Flutter 版である Riverpod の更新
- Chart 系ライブラリの選定

詳しく書いていく。

## Dart 2.12 以上に更新

表記通り Dart 2.12 より null-safety が適応されました。

```bash
dart pub outdated --mode=null-safety

flutter upgrade
```

Migration コマンドの実行により Dart 2.14 (Flutter 2.5.1-stable) に更新できた。

こうして Migration 関連の作業用意されているのは嬉しい限りです。

## Riverpod の更新

そもそも Flutter では実質 flutter_riverpod と hooks_riverpod の二択です。

- [riverpod](https://pub.dev/packages/riverpod)
- [flutter_riverpod](https://pub.dev/packages/flutter_riverpod)
- [hooks_riverpod](https://pub.dev/packages/hooks_riverpod)

Riverpod の基本的な用法を使う場合は flutter_riverpod を、また flutter_hooks を併せて使う場合は hooks_riverpod を使う。

基本的にほぼ Provider と変わりません。

- Riverpod 用のウィジェットを継承する必要があること
- Provide するためのコードを global な変数として記述すること

~~実際に HookWidget を継承することで `useXXX` 関数 (たとえば `useProvider` など) として利用できる。~~

~~また Hooks 機能を利用しない場合でも ConsumerWidget を継承することで同様の機能を実現できる。~~

v1.0.0 で `ref.xxx` を使った記法に統一されたことで `useProvider` が廃止され、その代わりに ConsumerWidget と `ref.watch` を使う。

```dart
enum RadioValue { SPENDING, INCOME }

class InputFormState extends StateNotifier<RadioValue> {
  InputFormState() : super(RadioValue.INCOME);

  void changeState(value) {
    this.state = value;
  }
}

final inputFormProvider = StateNotifierProvider<InputFormState, RadioValue>(
    (refs) => InputFormState());
```

WidgetRef を利用するため ConsumerWidget を継承する必要がある。

```dart
class InputForm extends ConsumerWidget {
  RadioValue? _groupValue;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    _groupValue = ref.watch(inputFormProvider);
  }
}
```

## Chart 系ライブラリの選定

charts_flutter が使えないことに直面した。

[Problems with flutter 2.5 #678](https://github.com/google/charts/issues/678)

Issue にも書かれていた方法を試みる。

それは `pubspec.yml` で直接 URL を叩いて取り込む方法です。

```yml
charts_flutter:
  git:
    url: https://github.com/google/charts
    path: charts_flutter
```

しかし状況は変わらない。

### 代わりに fl_chart を使う

charts_flutter 同様 fl_chart に Pie Chart が存在する。

もちろん Pie Chart 以外で使う場面がある。

- Bar Chart
- Line Chart
- Pie Chart

Chart ラッパーを準備するため ChartContainer クラスを作成した。

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ChartContainer extends StatelessWidget {
  const ChartContainer({
    Key? key,
    required this.title,
    required this.color,
    required this.chart,
  }) : super(key: key);

  final Color color;
  final String title;
  final Widget chart;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        alignment: Alignment.center,
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height * 0.5,
        padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              title,
              style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold),
            ),
            Expanded(
                child: Container(
              padding: const EdgeInsets.only(top: 10),
              child: chart,
            ))
          ],
        ),
      ),
    );
  }
}
```

Chart を導入したい箇所に PieChart を導入する。

```dart
ChartContainer(
  title: '収入支出',
  color: const Color(0x00000000),
  chart: PieChart(
    PieChartData(
      sections: [
        PieChartSectionData(
          value: generateData(
            snapshot.data!, Account.spendingFlg),
          title: '支出',
          color: const Color(0xffed733f),
        ),
        PieChartSectionData(
          value: generateData(
            snapshot.data!, Account.incomeFlg),
          title: '収入',
          color: const Color(0xFF733FED),
        ),
      ],
    ),
  )),
```

Chart で表示させたい項目に応じ直感的で使いやすい印象でした。

## 最後に

「いま風」に更新した成果を下記リポジトリに残しています。

[jiyuujin/account_app](https://github.com/jiyuujin/account_app)
