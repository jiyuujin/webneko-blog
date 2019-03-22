# webneko-blog-ver2

Nuxt + TypeScript + Contentful

## ビルド

```bash
# Local Dev Server
$ npm run dev
```

## 設計原則

- Atomic Designで言うatomsに最小単位コンポーネントを、templatesにテンプレートを設定する。ただし、Vuexストアにアクセスしない。
- 各エンティティごとに小〜中規模程度のコンポーネントを設定する。Vuexストアにアクセスしても良い。
   1. post
   2. profile
   3. layouts
   4. contact

### Vuexストア

Page components、各エンティティで使用することを想定する。

asyncDataメソッドでブログコンテンツを取得。と同時にslugオプションを利用して、各ページコンテンツを取得する必要があった。
