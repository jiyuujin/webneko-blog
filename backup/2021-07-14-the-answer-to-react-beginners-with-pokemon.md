---
date: 2021-07-14
title: アンサー記事 - ポケモンと共に React を学ぶ
description: チームメンバー並びに社内のエンジニアの力を底上げするため React 教育にあたって、今回作成したドキュメントサイトを補足する内容となっています。
slug: the-answer-to-react-beginners-with-pokemon
reaction: 🦁
category: Front
tags: 
 - React
 - TypeScript
 - Pokemon-API
 - Vercel
 - VuePress
---

もともと React をあまり触ったことのない方へ向けて教育用リポジトリを作成、とはいえ社内に限った活動でもなくこの知見を外部発信させていただいた。

[Pokemon アプリ | Hack React](https://hack-react.netlify.app/handson/pokemon.html)

詳細は上記ドキュメントサイトを見ていただくとして。

今回のゴールである Pokemon API をフェッチして Vercel へのデプロイを果たした。

[Hack Pokemon](https://hack-pokemon.vercel.app)

## 今回のテーマはフェッチと検索を扱う

目標を Hooks API をベースとした Web アプリケーションを作ることとした。今回のターゲットを考慮して、フレームワーク Next.js を一切使わない選択をとった。

その目標を達成するため複数の技術的なマイルストーンを合わせ準備している。

- `useSWR` を利用して API をフェッチする
- `useState` を利用した状態管理
- `useMemo` を利用した再描画の仕組み

今回は状態管理やユニットテストを扱っていない。次回以降、この辺りを中心にテーマを選定したい (ご気軽に Issue や PR ください)

[jiyuujin/hack-react](https://github.com/jiyuujin/hack-react)

### 状態管理で別の手段 `useEffect` も存在する

API のフェッチを `useEffect` で行い state を `useState` で管理する方法も存在する。

```tsx
const [pokemonData, setPokemonData] = React.useState<Array<{ name: string; url: string }>>()
React.useEffect(() => {
    const data = fetch(`https://pokeapi.co/api/v2/pokemon?limit=200&offset=200`)
    setPokemonData(data.results)
}, [])

{/*読み込み中*/}
if (!pokemonData) return <div>Loading..</div>

{/*読み込みに成功した*/}
return (
    <React.Fragment>
        {pokemonData?.map((pokemon: { name: string; url: string }) => (
            <div key={pokemon.name}>
                {pokemon.name}
            </div>
        ))}
    </React.Fragment>
)
```

`useSWR` を使うか `useEffect` を使うのは各プロジェクトの設計方針により決定しましょう。

## その他

そもそも React でコンポーネントを書く際クラスと関数に分けられる。今回扱った教材の Hooks API は後者の範疇に入る。

Hooks 導入以前まで、関数コンポーネントに state を持たせられなかった代わりに state を持たせるためクラスコンポーネントを実装する他なかった。

### 関数コンポーネントを使うべき理由

主な理由を下記の通り。クラスコンポーネントでは `this` を用いて state を参照しなければいけず、更新する際も state に `this` を用いて参照しなければいけない。

- `this` を使う必要が無くなる
- メソッドを bind する必要が無くなる
- 初期化する `constructor` を書く必要が無くなる

#### クラス

クラスコンポーネントの例。

```ts
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleCount = this.handleCount.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}
```

#### 関数

関数コンポーネントの例。

```ts
const Example = () => {
  const [count, setCount] = React.useState<number>(0);

  function handleClick() => {
    setCount(() => count + 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>+1</button>
    </div>
  );
}
```
