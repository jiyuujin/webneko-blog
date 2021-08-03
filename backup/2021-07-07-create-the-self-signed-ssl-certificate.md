---
date: 2021-07-07
title: オレオレ自己署名 SSL 証明書を作る
description: オレオレ自己署名 SSL 証明書を Web ブラウザに信用させるため OpenSSL 並びに mkcert を利用して HTTPS 化を果たす方法を書いた。
slug: create-the-self-signed-ssl-certificate
reaction: 🔑
category: Server
tags: 
 - SSL
 - HTTPS
 - OpenSSL
 - mkcert
---

平日朝にやっているおはようエンジニアの中で触れられたオレオレ自己署名 SSL 証明書。昨今 localhost 環境で HTTPS へアクセスすることも普通となった。

## OpenSSL を使って Web ブラウザに信用させる

OpenSSL コマンドによる RSA 公開鍵暗号を利用すると今いるディレクトリに `server.key` と `server.crt` を生成してくれる。

```bash
openssl req \
   -newkey rsa:2048 \
   -x509 \
   -nodes \
   -keyout server.key \
   -new \
   -out server.crt \
   -subj /CN=localhost \
   -reqexts SAN \
   -extensions SAN \
   -config <(cat /etc/ssl/openssl.cnf \
       <(printf '[SAN]\nsubjectAltName=DNS:localhost,IP:192.168.0.1')) \
   -sha256 \
   -days 3650
```

- キーチェインアクセスで `server.crt` をドラッグ & ドロップする
- いずれの Trust も Always Trust に変更する

`server.key` や `server.crt` と同じディレクトリで [https://localhost:3000](https://localhost:3000) に HTTPS のサーバーが起動する。

```bash
echo -e 'const https = require("https");\nconst fs = require("fs");\n\nconst serverKeyPath = "server.key";\nconst serverCrtPath = "server.crt";\nconst httpsPort = 3000;\n\nhttps.createServer(\n  {\n    key: fs.readFileSync(serverKeyPath),\n    cert: fs.readFileSync(serverCrtPath),\n  },\n  (req, res) => {\n    res.end("hello, world");\n  }\n).listen(httpsPort, () => {\n  console.log(`Listen HTTPS on ${httpsPort}...`);\n});\n' | node
```

### 起動スクリプト

```js
const https = require("https");
const fs = require("fs");

const serverKeyPath = "server.key";
const serverCrtPath = "server.crt";
const httpsPort = 3000;

https.createServer(
  {
    key: fs.readFileSync(serverKeyPath),
    cert: fs.readFileSync(serverCrtPath),
  },
  (req, res) => {
    res.end("hello, world");
  }
).listen(httpsPort, () => {
  console.log(`Listen HTTPS on ${httpsPort}...`);
});
```

## mkcertを使いゼロコンフィグで信用させる

mkcert を使えば 3 分で SSL 証明書を作れる。

[FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)

```bash
brew install mkcert

# For Firefox
brew install nss

mkcert -install
```

ルート `/Users/<USER_NAME>` にキー、証明書が生成されていることを確認する。

```bash
mkcert example.com "*.example.com" example.test localhost 127.0.0.1 ::1
```

生成済のキー、証明書を付けるビルドオプションを利用して localhost を起動する。

```bash
# Gatsby
gatsby dev --key-file ~/example.com+5-key.pem --cert-file ~/example.com+5.pem --https
```

これで localhost の HTTPS 化が実現した。
