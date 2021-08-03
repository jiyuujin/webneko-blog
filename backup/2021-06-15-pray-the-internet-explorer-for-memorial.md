---
date: 2021-06-15
title: IE を供養する
description: Microsoft 公式直々に IE サポート終了のアナウンスがあったことを祈念して簡単に書いた。
slug: pray-the-internet-explorer-for-memorial
reaction: 🥶
category: Application
tags: 
 - Web
 - Browsers
---

漸く Microsoft 公式が IE サポートを来年 6 月 15 日に終えることを報じた。

![](https://i.imgur.com/2jWZ7bh.jpg)

開発者界隈では安堵といった様子が大勢。

公式のサポートが終了するにあたって FAQ ページも出されている。

[「Internet Explorer 11 デスクトップ アプリケーションのサポート終了」の発表に関連する FAQ](https://blogs.windows.com/japan/2021/05/19/internet-explorer-11-desktop-app-retirement-faq/)

::: message is-primary

Windows 10 における Internet Explorer デスクトップアプリケーションを 2022 年 6 月 15 日に廃止し、サポートを終了します。この日以降 IE11 デスクトップアプリケーションを利用しようとすると Microsoft Edge にリダイレクトされます。

:::

今後 IE 対応に力を注ぐことも多くないことは想像できるが、この度あえて自身がこれまでに施してきた処理内容をまとめて公開することにした。

### 各社 IE 対応をザッピング

参考までに公式サポートが報じられる以前から、とりわけ 2021 年に入って以降 IE サポートの終了を告知するケースが増えている。

- [Backlog IE11 サポート終了のお知らせ | Backlog](https://backlog.com/ja/product-updates/announcement/ie11-support-ends/)
- [Internet Explorer のサポート終了とその後の BASE の進化 | BASE](https://devblog.thebase.in/entry/ie-forever)
- [Internet Explorer 11 （IE11） のサポート終了について | board](https://the-board.jp/blogs/news_end_of_support_for_ie11)
- [ウェブサイト開発における IE11 サポート終了のお知らせ](https://www.digitalcube.jp/news/11416/)
- [Internet Explorer 11 および Edge レガシのサポート終了について | ESRI ジャパン](https://blog.esrij.com/2020/08/25/post-37271/)
- [Internet Explorer 11 サポート終了ならびに Microsoft Edge 更新についてのお知らせ | はてな ブックマーク](https://bookmark.hatenastaff.com/entry/2020/08/13/111055)
- [今後 LIG が制作する Web サイトは Internet Explorer の対応をやめます。 | LIG](https://liginc.co.jp/481562)
- [Internet Explorer サポート終了のお知らせ | minne](https://minne.com/infos/2215)
- [さくらインターネット 全サービスにおける Internet Explorer サポート終了のお知らせ](https://www.sakura.ad.jp/information/announcements/2020/10/29/1968205310/)
- [Internet Explorer (IE) は使えますか？ | STORES](https://faq.stores.jp/hc/ja/articles/360049598591-Internet-Explorer-IE-は使えますか-)
- [サントリーウェブサイト IE サポート終了のお知らせ | サントリー](https://www.suntory.co.jp/note/detail/200824_000095.html)
- [Internet Explorer 対応終了について | スマレジ](https://help.smaregi.jp/hc/ja/articles/360051247814--重要なお知らせ-Internet-Explorer-対応終了について)
- [Internet Explorer への対応終了のお知らせ | SmartHR](https://smarthr.jp/other/22512)
- [Internet Explorer 11 のサポート終了のお知らせ | Zendesk](https://support.zendesk.com/hc/ja/articles/360002084367-Internet-Explorer-11のサポート終了のお知らせ)

### オープンソースの世界でも

Vue 3 や Angular12 で IE サポートの終了がアナウンスされている。

- [Proposal for dropping ie11 support in Vue 3 | vuejs/rfcs #296](https://github.com/vuejs/rfcs/discussions/296)
- [RFC: Internet Explorer 11 support deprecation and removal | angular/angular #41840](https://github.com/angular/angular/issues/41840)

## そもそも IE がどれほど遅れているのか

そもそも Internet Explorer は ES6 すらも対応していないクソ仕様。

ParentNode や ChildNode で Element には children をサポートする一方 Document にはサポートしない。

|機能|使用できるか|
|:---|:---|
|`ParentNode.append()`|x|
|`ParentNode.childElementCount`|o|
|`ParentNode.children`|o|
|`ParentNode.firstElementChild`|o|
|`ParentNode.lastElementChild`|o|
|`ParentNode.prepend()`|x|
|`ParentNode.querySelector()`|o|
|`ParentNode.querySelectorAll()`|o|

|機能|使用できるか|
|:---|:---|
|`ChildNode.after()`|x|
|`ChildNode.before()`|x|
|`ChildNode.remove()`|x|
|`ChildNode.replaceWith()`|x|

### IE では使えないあんなものこんなもの

コレクション系の処理 (find など) を始め `XMLHttpRequest` と同様に使える fetch など IE11 では使えない。

```js
fetch('url')
    .then((response) => response.text())
    .then((text) => console.log(text))
    .catch((error) => console.log(error));
```

非同期処理を実現できる Promise も IE11 では使えない。

```js
new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('😆');
    }, 300);
})
.then(emoji =>{
    console.log(emoji); // 😆
});
```

## 自力で頑張る IE 対応

それでも私自身には IE 対応に力を注ぐ瞬間があった。

これまで私自身が対応した IE 対応をザッピング。スポット的なものを中心に集めており容易に対応可能なものから、後半にかけて少々重めなものまで。

### table-layout

画面全体に対して table タグが覆っている場面を例にとった。すると Chrome では横幅ぴったり表示され遜色ない結果も IE では右端はみ出る不恰好な結果に。

```css
.data-table {
  table-layout: fixed;
  margin: 0 auto;
  margin-top: 150px;
  width: 100%;
  max-width: 800px;
}
```

#### IE では

上記のような横にはみ出てしまうデザインの崩れに対しては width を削除することで一件落着。

```css
.data-table {
  table-layout: fixed;
  margin: 0 auto;
  margin-top: 150px;
  max-width: 800px;
}
```

### IntersectionObserver

画像や動画を遅延読み込みする際にスクロールイベントで使えるものの IE11 では使えない。

しかし Polyfill が存在するので、有り難く利用させてもらう。

[w3c/IntersectionObserver](https://github.com/w3c/IntersectionObserver/tree/main/polyfill)

```js
document.querySelectorAll('img').forEach(target => {
    const io = new IntersectionObserver((entries, observer)=>{
        entries.forEach( entry =>{
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-lazy');
                img.setAttribute('src', src);
                observer.disconnect();
            }
        });
    });
    io.observe(target);
});
```

### object-fit-images

こちらも Polyfill が存在するので、有り難く利用させてもらう。

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.4/ofi.js" defer></script>
```

[fregante/object-fit-images](https://github.com/fregante/object-fit-images)

IE の時だけ `objectFitImages()` を呼び出す。

```js
window.addEventListener('load', function() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') !== -1 ||
        ua.indexOf('trident') !== -1 ||
        ua.indexOf('edge') !== -1) {
        objectFitImages();
    }
});
```

Polyfill で解決できない場合 CSS を書いて解決。

```css
.application-icon {
    width: 1.375rem; // 22px
    height: 1.375rem;
    border-radius: $border-radius;
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}

@supports (object-fit: cover) {
    .application-icon {
        position: static;
        top: 0;
        left: 0;
        -o-object-fit: cover;
        object-fit: cover;
        -ms-transform: none;
        -moz-transform: none;
        -webkit-transform: none;
        transform: none;
    }
}
```

### `getComputedStyle`

`getElementById()` で得られるスタイルシートの情報は、要素のインラインで設定されているものだけ。ブラウザ上で適用されているスタイルを呼び出したい場合には `getComputedStyle()` を使う。

`getComputedStyle()` 後にプロパティ名を直接書いても使える一方 IE11 ではそれが使えないので、その代わりに `Element.currentStyle` を使う。

```js
const body = document.querySelector('.overview .overview__description__body');
const bodyEl = document.getElementById('overviewDescriptionBody');

let bodyLineHeight;
if (ua.indexOf('msie') !== -1 ||
    ua.indexOf('trident') !== -1 ||
    ua.indexOf('edge') !== -1) {
    bodyLineHeight = bodyEl.currentStyle.lineHeight;
} else {
    bodyLineHeight = getComputedStyle(body)
        .getPropertyValue('line-height')
        .replace(/[^-\d\.]/g, '');
}
```

## 最後に

こればかりはあくまでほんの一部に過ぎない。先日の WWDC 2021 で Safari における拡張機能の標準化がアナウンスされたこともあり、個別のブラウザに対して工数をかけることが少なくなることを祈る所存です。
