---
date: 2021-11-01
title: VSCodeCon JP 2021 サイトの内幕
description: この度 VS Code Conference JP 2021 ウェブサイト製作を担当、その技術的側面にアプローチして今回は書かせていただいた。
slug: inside-the-website-in-vscodecon-jp-2021
reaction: 🏁
category: Front
tags: 
 - React
 - NextJS
 - TypeScript
 - GithubPages
 - VSCode
---

VSCodeCon 史上初めてカンファレンス用のティザーサイトを製作することとなった今回。

[VSCode Conference JP 2021](https://vscodejp.github.io/conf2021/ja/)

次の要件を満たすとして Next.js を採用した。

- VSCode カンファレンスならでは
- SG と相性が良い

## 主な機能

順に見ていくとする。

- Github Pages へデプロイ
- 英語化対応
- ダークモード対応

### Github Pages へデプロイ

今回 `vscodejp.github.io` というドメインで公開する方針の下 Github Pages へデプロイする。

next build と next export を合わせて進めることで静的 HTML が生成される。

```yaml
jobs:
  build-deploy:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
      - uses: actions/checkout@master

      - name: Use Node.js
        uses: actions/setup-node@master
        with:
          node-version: '12.x'

      - name: Transpile
        run: |
          npm install
          npm run build
        env:
          CI: true
          URL_PREFIX: conf2021
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

また Github Pages 固有の事象として `_` から始まるディレクトリが見えず 404 となってしまう問題に対処する必要がある。

具体的には少し前に書かせていただいた記事をチェックしていただければ幸いです。

[Next.js (SSG) を Github Pages で利用する際に注意すること](../be-careful-to-use-next-js-ssg-on-github-pages)

### 英語化対応

ローカライズは Dynamic Routes を利用している。

各種 API `getStaticPaths` 並びに `getStaticProps` を使うことで、想定している言語を paths / props として返す。

```ts
export async function getStaticPaths() {
  return {
    paths: languages.map((lang) => {
      return { params: { lang: lang } }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      language: languages.includes(params.lang) ? params.lang : defaultLanguage,
    },
  }
}
```

ルート `pages/index.tsx` で各言語に応じたパスへアクセスさせる。

```ts
import React from 'react'
import { useRouter } from 'next/router'
import i18next from 'i18next'

export default function Home() {
  const router = useRouter()

  React.useEffect(() => {
    const { pathname } = router
    if (pathname == '/') {
      router.push('/' + i18next.language.substring(0, 2))
    }
  })

  return null
}
```

Github Pages 同様、具体的には少し前に書かせていただいた記事をチェックしていただければ幸いです。

[Next.js (SSG) でハマったロケール対応](../localization-on-next-js-ssg)

### ダークモード対応

Context と localStorage を利用してテーマを保持している。

```ts
type ColorTheme = {
  colorMode: 'light' | 'dark'
  changeColorMode: (cm: 'light' | 'dark') => void
}

export const ColorThemeContext = createContext<ColorTheme>(null)

export const ColorThemeProvider: FC = ({ children }) => {
  const [colorMode, setColorMode] = useState(undefined)
  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.style.getPropertyValue('--initial-color-mode')
    setColorMode(initialColorValue)
  }, [])

  const changeColorMode = (mode: string) => {
    setColorMode(mode)

    window.localStorage.setItem('color-mode', mode)

    const root = window.document.documentElement
    root.style.setProperty('--initial-color-mode', mode)
    root.style.setProperty(
      '--color-text',
      mode === 'light' ? themeColors.light.textColor : themeColors.dark.textColor,
    )
    root.style.setProperty(
      '--color-background',
      mode === 'light' ? themeColors.light.backgroundColor : themeColors.dark.backgroundColor,
    )
  }
  return (
    <ColorThemeContext.Provider value={{ colorMode, changeColorMode }}>
      {children}
    </ColorThemeContext.Provider>
  )
}
```

やっていることを掻い摘んで話すと下記の通りだ。

- `createContext` で Union 型を定義する
- Global に `Provider` を登録する

そして保存したタイミングで localStorage に格納することで、次回以降のアクセスについてもそのテーマで表示される。

## 最後に

これ以外にスタイルの定義を CSS modules で書いていたり、ライブラリ内の react を preact として書き換えてたりしている。

### 自分仕様の VS Code に変える

余談ですが VS Code のタイトルバーなど、自分仕様にカスタマイズも可能だ。

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.lintTask.enable": true,
  "peacock.color": "#007acc",
  "workbench.colorCustomizations": {
    "activityBar.activeBackground": "#007acc",
    "activityBar.activeBorder": "#ee90bb",
    "activityBar.background": "#007acc",
    "activityBar.foreground": "#e7e7e7",
    "activityBar.inactiveForeground": "#e7e7e799",
    "activityBarBadge.background": "#ee90bb",
    "activityBarBadge.foreground": "#15202b",
    "editorGroup.border": "#007acc",
    "panel.border": "#007acc",
    "sash.hoverBorder": "#007acc",
    "sideBar.border": "#0065a9",
    "statusBar.background": "#0098ff",
    "statusBar.foreground": "#e7e7e7",
    "statusBarItem.hoverBackground": "#007acc",
    "statusBarItem.remoteBackground": "#0065a9",
    "statusBarItem.remoteForeground": "#e7e7e7",
    "titleBar.activeBackground": "#0065a9",
    "titleBar.activeForeground": "#e7e7e7",
    "titleBar.inactiveBackground": "#1857a499",
    "titleBar.inactiveForeground": "#e7e7e799"
  }
}
```

ESLint の設定はもちろん [vscodejp/conf2021](https://github.com/vscodejp/conf2021) では VS Code のブランドカラーも織り交ぜている。
