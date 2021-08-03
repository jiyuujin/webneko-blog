---
date: 2020-11-27
title: Flutterで状態管理を始める 2020年版
description: この記事は Flutter Advent Calendar 2020 の 1 日目の記事です。初心者向けにFlutterで状態管理 (ChangeNotifier) を始める話を書きました。
slug: startup-state-management-with-flutter-in-2020
reaction: ❣️
category: Application
tags: 
 - Flutter
 - Advent-Calendar
 - Dart
---

## なんぞや、私

ということで Flutter Osaka 主催のミートアップにて、拙い司会を進めているのをしばしば見た方もいらっしゃるでしょう。

本業で Web フロントエンド (今年は Vue/Nuxt.js よりも React/Next.js 多め) を中心にリプレースを進めている。

一方で、自身のキャリアが iOS developer (Objective-C/Swift) を源流にいまを生きていることから、最近は Flutter などにも注力中。

::: message is-primary

直近の登壇。

- VR 勉強会 3 (2020/06/21)
   - [Slackを中心に世界は廻っている](https://webneko.dev/posts/recommend-tools-in-vr-study-3)
- PWA night 16 (2020/05/20)
   - [もっと身近にやってた](https://webneko.dev/posts/pwa-more-closer-2020)

:::

Advent Calendar (Qiita) に参加させていただくこと自体初めてのことではありませんが、Flutter の記事を書くのは初めて。

今回簡易的な出退勤管理アプリの製作をひとつのネタに、状態管理を始める話をできれば。

## 出退勤管理アプリの製作

ざっくりアプリ側に Flutter (製作開始当時 v1.1.0) を、続いて API サーバ側 AWS Lambda を採用。

とはいえそこまで複雑な構成を敷いている訳ではありません。API サーバで行っていることは、出勤 (もしくは退勤) した際に POST API を投げ、逐一 DynamoDB にデータを置く。出勤、退勤それぞれを判別できるよう、アプリ側で State を準備する。

- 出勤の際はアプリ側で出勤用フラグを指定して API を投げる
- 退勤の際はアプリ側で退勤用フラグを指定して API を投げる

こうしてアプリ側で出勤と退勤を区別。

そのステータスは GET API を叩いて作られるもので ChangeNotifier という状態管理の手法を用いてアプリ内に格納 (後述)

API サーバの内部実装については今回割愛させていただくとして、アプリ側に主眼をおく。

::: message is-primary http パッケージ。

[http](https://pub.dev/packages/http) パッケージを使いましょう。

:::

```dart
final formatter = DateFormat("yyyyMMdd");
Map<String, String> queryParams = {
  "date": formatter.format(new DateTime.now())
};
String queryString = Uri(queryParameters: queryParams).query;
final response = await http.get(url + '?' + queryString);
```

シンプルに FutureBuilder の下で、非同期にそのレスポンスを展開。通信の完了した状態と、完了していない状態によってウィジェットを分けることができる。

```dart
body: FutureBuilder(
  future: futureMethod,
  builder: (BuildContext context, AsyncSnapshot snapshot) {
    if (snapshot.hasData) {
      return Center(child: Text('Done'));
    } else if (snapshot.hasError) {
      return Center(child: Text('Error'));
    } else {
      return Center(child: CircularProgressIndicator());
    }
  },
),
```

```dart
Future<bool> futureMethod() {
  someFunc();
  return true;
}
```

ここで、この FutureBuilder のトリガーメソッド futureMethod の戻り型を bool に設定、完了したか否かを明確にすると良さそうです。

### 状態管理の手段に ChangeNotifer を使う

今回の出退勤管理アプリでは状態管理の手段に ChangeNotifier を使った。

そもそも皆さんは状態管理の手段に何を使っていますか。

1. Riverpod
2. StateNotifer
3. freezed

momo さんの書かれた [Flutterの状態管理手法の選定](https://medium.com/flutter-jp/state-1daa7fd66b94) によるとざっくり上記三点に分けられる。

- 今回の決め手としてひとつに使われている場面が多く事例と照らし合わせ易いこと。
- bloc パッケージの BlocProvider の内部実装にも Provider が利用されているなど親和性も高く、定番の状態管理ツールになっていること。

歴史的な背景や経緯などは [Flutterの状態管理手法の選定](https://medium.com/flutter-jp/state-1daa7fd66b94) で。

::: message is-primary provider パッケージ、ChangeNotifier を使ったアプリのサンプル例。

[provider](https://pub.dev/packages/provider) パッケージを使いましょう。

実際に [以下](https://flutter.dev/docs/development/data-and-backend/state-mgmt/simple) チェックいただくとすんなり入れられる。

:::

前提として親ウィジェットで Provider を登録すること。

```dart
void main() => runApp(
  MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (context) => StatusModel()),
    ],
    child: MyApp(),
  ),
  // MyApp()
);
```

この辺り React の Redux でも同じような実装を進めるので、私にとって導入のハードルはさほど高くありません。

```dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Consumer<StatusModel>(builder: (context, model, child) {
      //
    }
  }
}
```

ステータス変更は Flutter Material のボタンをタップすることがトリガーとなる。

このトリガーで `Provider.of<T>(context, listen: false).changeStatus()` の listen を false にした。

これによって無駄な再レンダリングは行われない、すなわち必要なレンダリングのみで済ませることができるようになった。

```dart
Widget build(BuildContext context) {
  return Scaffold(
    floatingActionButton: FloatingActionButton(
      onPressed: () => handleClick(),
      tooltip: '出勤する',
      child: const Icon(Icons.thumb),
    ),
  );
}
```

```dart
void handleClick() {
  //
}
```

そのステータスに応じて tooltip のテキストを変えたり、アイコンのタイプを変えたりできるようになります。あとは実際に handleClick で POST API を叩くよう設定することで、アプリ側から API サーバに対して出勤、退勤したことを知らせることができるようになる。

## 最後に、

このように出退勤管理アプリをひとつの例に、アプリ内で Provider の機能を使って状態管理をいかにして進めるかという焦点に合わせ書かせていただいた。

ChangeNotifier と比べ Flutter 依存度の下がったかつ Provider を強力にした Riverpod が今、特に使われ始めているようです。

個人的には Flutter バリバリと言えるプロジェクト経験がまだ無いので、一度そういうプロジェクトにジョインしてみたさも出てきました。

現時点では Riverpod もまだ開発版であるため、実際の本番環境で使うのは来年までしばらく待った方が良いでしょう。

(2021 年は Riverpod 元年として来そうな予感を感じさせます)

という所感が出てきたところ、今日はこのへんで。
