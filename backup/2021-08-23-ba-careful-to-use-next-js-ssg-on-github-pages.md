---
date: 2021-08-23
title: Next.js (SSG) を Github Pages で利用する際に注意すること
description: Next.js の SSG を Github Pages でハマる箇所が多々存在するため今回書かせていただいた。
slug: ba-careful-to-use-next-js-ssg-on-github-pages
reaction: 🥴
category: Server
tags: 
 - NextJS
 - React
 - GithubPages
---

Github Actions から Github Pages へ通すため `.github/workflows/deploy.yml` にデプロイするためのソースコードを書く。

ここでのポイントは 2 点。

```yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Transpile
        run: |
          npm install
          npm run build
        env:
          CI: true
          URL_PREFIX: <REPO_NAME>
          GITHUB_PAGES: true

      - name: Export
        run: |
          npm run export
          touch out/.nojekyll

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v2.8.0
        env:
          ACTIONS_DEPLOY_KEY: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: ./out
```

[Static HTML Export](https://nextjs.org/docs/advanced-features/static-html-export) を利用することで Web サーバに Node.js を必要とせず、クライントのみで実行できる静的 HTML にアプリを出力する。

```bash
npm run export
```

Vercel や Netlify を利用する場合にこれをもって完結できる一方 Github Pages を利用する場合ではハマる箇所が多々存在するため今回書かせていただいた。

- JavaScript ファイルが 404 になってしまう
- CSS ファイルなどのリソースを読み込めない

### JavaScript ファイルが 404 になってしまう

これは Github Pages の仕様で `_` から始まるディレクトリが見えなくなる事象を回避するため `.nojekyll` をデプロイ対象のディレクトリ `out` に配置する。

```bash
touch out/.nojekyll
```

### CSS ファイルなどのリソースを読み込めない

`https://{アカウント名}.github.io/{リポジトリ名}` のように basePath が無い URL で取得しないよう assetPrefix を設定する。

```js
const REPO_NAME = ''

const urlPrefix = process.env.NODE_ENV === 'production'
    ? '/' + REPO_NAME
    : ''

const nextConfig = {
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
}

module.exports = nextConfig
```

favicon や `manifest.json` を読み込む際も assetPrefix を設定する。

```tsx
import Head from 'next/head'

const urlPrefix = process.env.NODE_ENV === 'production'
    ? '/conf2021'
    : ''

const SEO = () => {
  return (
    <>
      <Head>
        <link rel="icon" href={`${urlPrefix}/favicon.ico`} />
        <link rel="manifest" href={`${urlPrefix}/manifest.json`} />
      </Head>
    </>
  )
}

export default SEO
```

::: message is-primary

Next.js で PWA を実現するため next-pwa を利用する。

```js
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
  //
}

module.exports = withPWA(nextConfig)
```

:::
