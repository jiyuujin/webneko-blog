---
date: 2021-01-21
title: wasm-pack を使う
description: Web Assembly の wasm-pack について触れた時の記録をば。
slug: compile-to-web-assembly-use-rust
reaction: 🦀
category: Scrap
tags: 
 - Rust
 - Vue
 - Web-Assembly
---

wasm-pack を使う前にしたごしらえ。

[https://rustwasm.github.io/wasm-pack/installer/](https://rustwasm.github.io/wasm-pack/installer/)

```
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
cargo install cargo-generate
cargo generate --git https://github.com/rustwasm/wasm-pack-template
```

### ビルドを行う

--target を付けてビルドすることで、JavaScript ファイルを吐き出してくれる。逆に --target を付けなければ、webpack に対応する形式で吐き出してくれる。

```
wasm-pack build --target web
```

### Webサーバを立てる

今回 index.html の中で Vue (CDN) を利用して、前者 Web 版としてこの成果物を扱う。

```bash
npx live-server .
```

## 最後に、

リポジトリを公開したので、参考になれば幸いです。

[https://github.com/jiyuujin/csv-parser](https://github.com/jiyuujin/csv-parser)
