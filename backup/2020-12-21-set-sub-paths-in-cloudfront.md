---
date: 2020-12-21
title: CloudFrontでサブパスを設定する
description: 自身のプロフィールサイトを多言語化させた対応に伴い、CloudFrontの更新作業が入ったので簡単に。
slug: set-sub-paths-in-cloudfront
reaction: 🏠
category: Scrap
tags: 
 - AWS
---

今回多言語化を実施したプロフィールサイトは以下に示した通り。

https://yuukit.me/

この度ルートのみ、ミニマムな構成に `/ja` と `/en` を新たに設定したことでルート (index.html) 以外のページを更新した時に遭遇した 404 エラー。

```
The specified key does not exist.
```

上記エラーは該当の Distribution で Custom Error Response を設定することで解決。

- HTTP Error Code: `404: Not Found`
- Customize Error Response: `Yes`
- Response Page Path: `/index.html`
- HTTP Response Code: `200: OK`

その他、メモっておきたいことがあれば随時。
