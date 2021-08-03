---
date: 2020-01-23
title: Transitionを実践的に使う
description: VueでTransitionを使うにあたって少しハマった場面に遭遇、今年最初の登壇として yumemi.vue #5 で喋らせていただきました。
slug: vue-transition-more-pratically
reaction: 😃
category: Front
tags: 
 - Vue
 - TypeScript
 - CSS
---

今年最初の登壇として yumemi.vue #5 で喋らせていただきました。Vue.js 初心者に向けて Transition の導入方法から、実際に自ら実践したプロダクトの一部(下記)をご紹介しております。

1. 開始日、終了日を指定する
2. リストから該当するオブジェクトを選択する

<a class="link-preview" href="https://slides.com/jiyuujin/20200123">yumemi.vue #5</a>

## まず前提として、

私を含め、これまで(意外と)使ったことの無い人たちが多いような気もするので基礎から。導入したいと考えている要素に対して `<transition>` タグを挿入します。その表示する場面(enter)、表示の消える場面(leave)それぞれについてスタイルを指定することで簡単に Transition を実現できます。

仮に name 属性を slide-fade とした場合、下記いずれも要素が挿入される前に Transition が発火。

1. enter のスタイルを slide-fade-enter という名前で指定
2. leave のスタイルを slide-fade-leave という名前で指定

この後、活性中のスタイルについては。

1. slide-fade-enter-active という名前で指定
2. slide-fade-leave-active という名前で指定

また発火終了後についても。

1. slide-fade-enter-to という名前で指定
2. slide-fade-leave-to という名前で指定

と、少々古めの Vue で無ければ (Vue2.1.8 以降に限る) 個別にスタイルを指定できます。

### RangePickerを例に

以下個人的に npm プラグイン化を実現したコンポーネントのひとつに RangePicker が存在。

<a class="link-preview" href="https://www.npmjs.com/package/@nekohack/j-stylebook">@nekohack/j-stylebook</a>

左側のショートカットボタンをクリックしても開始日と終了日を指定できるコンポーネントとなっています。

![](https://i.imgur.com/4amxrmC.png)

このモーダルを開く瞬間、閉じる瞬間それぞれに Transition を導入しています。

```scss
.slide-fade-enter-active {
    transition: all .2s ease;
}

.slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
```

あと、今回は mode 属性を付けました。

```html
<transition name="slide-fade" mode="out-in">
    <div></div>
</transition>
```

この属性を out-in に設定することで、現在の Transition の終了を待って新しい Transition に遷移させられる。

一見すると大変細かい変更となります。

### 均一のアニメーションにならないツラミ

続いて Range Picker とは違う例から、選択の state をローカルステートとして持たせることを目指した複数選択モーダルについて。左ペインに対象となるリストを予め表示、適当なオブジェクトを選択して右ペインに選択済みのオブジェクトを表示します。こういったコンポーネントでも Transition の活躍する場はありました。

![](https://i.imgur.com/Wjbn6vg.jpg)

適当なオブジェクトをクリックし右ペインに反映される瞬間 Transition を導入しています。

```html
<transition-group tag="div" name="selected">
    <div v-for="store in stores" :key="store">
        <!-- 一覧表示 -->
    </div>
</transition-group>
```

```scss
.selected-enter-active,
.selected-leave-active {
  transition: all 0.15s ease-out;
}

.selected-enter {
  transform: translateX(5px);
  opacity: 0;
}

.selected-enter-to {
  transform: translateX(0px);
  opacity: 1;
}

.selected-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
```

ここでひとつも選択していない状態から新たにひとつ追加した時に、実装したはずの Transition を確認できません。

どの選択された状況下においても均一のアニメーションを提供しなければといったことが求められる訳ですが、これ以上スタイルの微調整を続けるには難しそうです。

そこでフックを使った調整も可能であることを知る。

<a class="link-preview" href="https://jp.vuejs.org/v2/guide/transitions.html#JavaScript-%E3%83%95%E3%83%83%E3%82%AF">JavaScript フック</a>

```ts
beforeEnter(el) {
    el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + 'ms'
}
afterLeave(el) {
    el.style.transitionDelay = ''
    if (this.selectedIds.length !== 0) {
        this.isEmpty = false
    } else {
        this.isEmpty = true
    }
}
```

表示のタイミングを一律ずらすことで解決しました。

## 最後に、

既に一部プロダクトに対し盛り込んだ機能ばかりでしたが、意外と Transition を実用的に使えることが判明しました。

今後もユーザエクスペリエンス向上に向け、大いにこの Transition を活用していきたい。
