---
date: 2019-12-16
title: Composition API 勘所など
description: 来たるVue3に向けじわじわと盛り上がりを見せるComposition API。この導入にあたって気付いたこと、今後に活かしたいことを軽く記録しておきます。
slug: notices-of-composition-api-in-vue3-eve
reaction: 😄
category: Front
tags: 
 - Vue
 - TypeScript
---

## 導入編は登壇スライドで

先日の v-kansai もくもく会 #3 (with WeJS) や v-okinawa #3 (忘年 LT 大会) で簡単に喋らせていただいてます。

実際に Composition API のインストールからどうやって使うかを中心に、またこちらの記事で書き進めて分かった苦労話を中心に書きました。

<a class="link-preview" href="https://slides.com/jiyuujin/composition-api-in-vue3-eve">Composition API</a>

基本的には最終 RFC の段階にあるとのこと、大幅な仕様変更は恐らく無いと考えられるため早速お仕事の場面に導入しても良いかなと。

## ちょっと使ってみて

まず template で使う変数を全て setup の戻り値に入れてあげなければいけないこと。

```ts
import { createComponent, SetupContext } from '@vue/composition-api'

export default createComponent({
    setup(props: {}, ctx: SetupContext) {
        return {
            //
        }
    }
})
```

Vue を TSX で書いた場合には忘れないですが、図らずも template と分けて書ける Vue でありながら Composition API のデメリットとも。

そして気になったあるいは苦労した点を以下 3 つほど。

- Which do u use, reactive or ref
- Where is asyncData
- unable to change from Vue original way..
   - slot
   - is
   - ..

### basically u use reactive

従来の書き方だと `data` を使ってインスタンス変数を定義します。

```ts
export default Vue.extend({
    data() {
        return {
            //
        }
    }
})
```

自分なりの設計指針のひとつとして、関連度の高い element をひとつの object として定義する場合は reactive を。

一方で単独の element をひとつの object として定義した方が切り分けられる場合は ref を想定。

ですがこの両者を使う際に特筆することがあるとのことで、自身の認識が少々甘かったことに気付かされました。

それは reactive を使って定義した object を composition function の外部で使った時の挙動で再描画されません。もし再描画させたければ別途 ref 化(toRefs)する必要があるので注意が必要とのことでした。

<a class="link-preview" href="https://mya-ake.com/posts/vue-composition-api-columns/">Composition API</a>

と、福岡のみゃけさんの記事を参考にさせていただきましたのでこちらに掲載させていただきます。

### asyncData isn't existed

ページのレンダリング前に読み込みたい。けど asyncData が削除されているので、その代わりに fetch を使わなければいけません。

またライフサイクルメソッドにも変更が存在するので個別に注意が必要。

- Rename onBeforeDestroy to onBeforeUnmount
- Remove onCreated
- Remove onDestroyed

<a class="link-preview" href="https://github.com/vuejs/composition-api/commit/9d8855a4a293321075c93b15d631a43681c2605b">Deprecated lifecycles</a>

### unable to exchange Vue original way

今まで同様 template と分けて書いていれば問題なく Composition API を使えます。

ですが自身もその一人で最近 Vue を TSX で書いてるタイプですが、一癖かかる問題に出会したので軽く書いておきます。

#### [slot](https://jp.vuejs.org/v2/guide/components-slots.html)

親テンプレートそれぞれに合わせる形でスロットを定義できるもので、Vue を使ってコンポーネントを作っている人なら誰しもが使う、あのスロットです。

```ts
import { createComponent, SetupContext } from '@vue/composition-api'

export default createComponent({
    setup(props: MainTemplateProps, ctx: SetupContext) {
        return () => (
            <div class={styles.MainTemplate}>
                {ctx.slots.default()}
            </div>
        )
    }
})
```

一見動きそうですが、あいにく動きません。

```ts
interface Data {
  [key: string]: unknown
}

interface SetupContext {
  attrs: Data
  slots: Slots
  parent: ComponentInstance | null
  root: ComponentInstance
  emit: ((event: string, ...args: unknown[]) => void)
}

function setup(
  props: Data,
  context: SetupContext
): Data
```

SetupContext に slots が存在することは公式ページからも確認できます。

```ts
import { createComponent } from '@vue/composition-api'

export default createComponent({
    setup(props: MainTemplateProps, { slots }) {
        return () => (
            <div class={styles.MainTemplate}>
                {slots.default()}
            </div>
        )
    }
})
```

issue を確認させてもらったところ動いた。

<a class="link-preview" href="https://github.com/vuejs/composition-api/issues/84">context.slots is empty in setup() #84</a>

#### [is](https://jp.vuejs.org/v2/api/#is)

続いて TSX を使った時にとある問題が発生。コンポーネントを動的に切り替えられる [is](https://jp.vuejs.org/v2/api/#is) についてはいかがでしょうか。

```ts
import { createComponent, SetupContext } from '@vue/composition-api'

type SvgProps = {
    name: string
}

export default createComponent({
    props: {
        name: {
            type: String,
            required: true
        }
    },
    setup(props: SvgProps, ctx: SetupContext) {
        const svg = () => import(`@/assets/img/${props.name}.svg`)

        return () => (
            <component is={svg} style="width: 16px;" />
        )
    }
})
```

指定の SVG を template に吐き出すため作ったコンポーネントですが、これもあいにく動きません。

無理に TSX で書く必要は無いため、今まで同様 Vue ファイルのまま作成しました。

## 最後に、

現時点で把握しているのはこの辺りで他、挙動に問題はありませんでした。ですのでガチガチの型管理を目指すのであれば TSX で書ける。

とはいえ template と分けて書ける Vue の良さは引き続き残るので、無理に TSX で書かなくても良いとも。
