---
date: 2021-10-07
title: Next.js (SSG) でサブパスの 404 を回避した対応
description: Next.js (SSG) でサブパスが 404 になった際に取り組んだことを簡単に書かせていただいた。
slug: solved-subpaths-404-on-next-js-ssg
reaction: 😛
category: Server
tags: 
 - NextJS
 - React
 - Shell
 - Hosting
 - AWS
---

そもそも Vercel や Amplify Console にデプロイするのが常である今日この頃。出会したのは Next.js で SSG 化した静的サイトを S3 にデプロイした際 CSR したページでリロードすると 404 事象だ。

`out/en.html` が吐き出され `https://hoge.com/en` にアクセスして欲しいところ `https://hoge.com/en.html` と拡張子が付く。

Vercel や Amplify Console にデプロイするとよしなりにやってくれるので便利という訳。

- シェルを書く
- Lambda@edge を導入する

安価に対応したかったので、今回は前者を選択した。

## シェルを書く

順を追って解説する。

### next export で出来る HTML から拡張子を取り除く

SSG したタイミングで吐き出される HTML を抽出する。

デフォルトで HTML が呼び出されるのを防ぐために拡張子を取り除く必要がある。

```sh
html_filepaths=$(find ./out -name "*.html" ! -path "*/index.html")
for filepath in $html_filepaths; do
  mv $filepath ${filepath%\.html}
done
```

### Content-Type を付与する

S3 にデプロイした上で Content-Type を付与する。

Web ブラウザでアクセスした際に当該ファイルが HTML であると認識してくれる。

```sh
for filepath in $html_filepaths; do
  path=${filepath#\.\/out\/}
  key=${path%\.html}

  aws s3api copy-object \
    --bucket $bucket_name \
    --copy-source $bucket_name/$key \
    --key $key \
    --metadata-directive "REPLACE" \
    --content-type "text/html" \
    --acl public-read
done
```

### コピー用に空の index.html を作成する

空の index.html を作成する。

```sh
empty_index_html_directory=./out/tmp/
empty_index_html=${empty_index_html_directory}index.html
mkdir -p $empty_index_html_directory
touch $empty_index_html
```

### 追加する index.html のパス一覧を作成する

サブパスそれぞれに空の index.html を準備する。

```sh
target_index_html_paths=()
for filepath_with_extension in $html_filepaths; do
  filepath=${filepath_with_extension%\.html}

  index_html_path=$filepath/index.html
  target_index_html_paths+=($index_html_path)
done
```

### Location ヘッダがついた空の index.html オブジェクトを作成する

空の index.html を S3 バケットに置く。

```sh
for index_html_path in $target_index_html_paths; do
  key=${index_html_path#\.\/out\/}

  # 末尾に /index.html が存在しない URL となる
  destination=https://$bucket_name/${key%\/index.html}

  aws s3api put-object \
    --bucket $bucket_name \
    --body $empty_index_html \
    --key $key \
    --website-redirect-location $destination \
    --acl public-read
done
```

## 最後に

面倒だが `https://hoge.com/en` へアクセスされるようになった。
