---
date: 2021-09-30
title: Next.js (SSG) でハマったロケール対応
description: Next.js (SSG) でロケール対応した際に少々ハマった点が存在したので簡単に書かせていただいた。
slug: localization-on-next-js-ssg
reaction: 🏌🏻‍♀️
category: Front
tags: 
 - NextJS
 - React
 - TypeScript
 - GithubPages
 - Hosting
 - SSG
---

Next.js でロケール対応すると SSG 化できない事象に出会した。

::: message is-primary

主な特徴は下記 2 つ。

- Next.js 11 最新を使っている
- Github Pages にデプロイしている (SSG)

:::

順当に考えれば next-i18next を選択する訳だが、これが SSG にとって不都合だった。

```bash
i18n support is not compatible with next export.
```

Issue も立てられていたようです。

[i18n with next export calls getStaticProps for each defined lang, but then errors #18318](https://github.com/vercel/next.js/issues/18318)

ただこちらは close されており、今後対応される可能性も低いです。

## i18next を使う

Next.js 用のプラグインとして提供されている訳では無いものの i18next を一から使ってみた。

`pages/_app.tsx` でロケール設定を読み込むために `i18n.init.js` を作成する必要がある。

```js
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { languages, defaultLanguage } from './i18n.config'

const locales = Object.assign(
  {},
  ...Object.keys(languages).map((index) => {
    return {
      [languages[index]]: {
        translations: require('./public/locales/' + languages[index] + '/common.json'),
      },
    }
  }),
)

const detection = {
  order: [
    'querystring',
    'cookie',
    'localStorage',
    'sessionStorage',
    'navigator',
    'htmlTag',
    'path',
    'subdomain',
  ],
  lookupCookie: 'lng',
  lookupLocalStorage: 'lng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'],
  cookieOptions: { path: '/', sameSite: 'strict' },
}

i18next.use(LanguageDetector).init({
  detection: detection,
  fallbackLng: defaultLanguage,
  resources: locales,
  ns: ['translations'],
  defaultNS: 'translations',
  returnObjects: true,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
  },
})

export default i18next
```

新たに作成する `i18n.config.js` で対応言語、初期言語を設定する。

```js
export const languages = ['en', 'ja']

export const defaultLanguage = 'en'
```

`pages/_app.tsx` で読み込む。

```ts
import i18next from 'i18next'
import '../i18n.init'
```

あと翻訳ワードとそれぞれに対する ID を管理するため JSON ファイルを `public/locales` 下に置く必要がある。

### ルートページを作成する

ルートパスでサブパスからルーティングを判断する。

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

### `pages/[lang].tsx` でサブページを読み込む

対応言語に合わせてルーティングを設定する。

`getStaticPaths` と `getStaticProps` を組み合わせることで、導入予定の (導入の可能性が高い) 全ての言語を網羅させる。

```ts
import * as React from 'react'
import i18next from 'i18next'
import { defaultLanguage, languages } from '../../../i18n.config'

export default function Home() {
  return (
    {/*省略*/}
  )
}

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

### 使いたい箇所に導入するだけ

i18next を適宜インポートして、該当の ID を指定すれば OK。

```ts
import i18next from 'i18next'

const Section = () => {
  return (
    <section>
      <h1>{i18next.t('title')}</h1>
    </section>
  )
}
```

結果として遠回りになったものの、国際化対応でき安堵。
