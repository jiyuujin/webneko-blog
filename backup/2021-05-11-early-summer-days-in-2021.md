---
date: 2021-05-11
title: Go を書き始めた 2021 GW
description: 今年も「ゴールデンウィーク」という名のおやすみ期間がやって来ました。心機一転 Go や LitElement に挑戦した良いひとときを過ごせた所存です。
slug: early-summer-days-in-2021
reaction: 🚝
category: Server
tags: 
 - Docker
 - Go
 - LitElement
---

今年のおやすみ期間 (ゴールデンウィーク) は Go と LitElement に焦点を当てた。

Web 界隈、 `知らない` という状態こそ避けるべき。何事も知ることから始まる訳で、オブジェクト指向の観点からいうと Java や PHP の経験に限らず知見を蓄えておいた方が良いでしょう。

その中でも特に LitElement を使って PWA 対応のウェブサイトを製作した話については、後日投稿予定の記事で詳細に書かせていただくので暫しお待ちいただければ幸いです。

この度 Go に触れ、自身のキャリアをこれまでのキャリアをさらに拡張し得る可能性を実感。また Web Components や Polymer という JavaScript フレームワークとは違う分野の知見も得られ、貴重な時間を過ごせたと感じた。

## Go を使って簡易的な REST API を製作する

基本的には RDB / Docker の下 CRUD を含めた API を設計した。今回のゴールは API サーバ [http://localhost:9000](http://localhost:9000) でレスポンスを受け取るまで。

実際に下記のようなスキーマを想定した。

|Column|Type|
|:---|:---|
|ID|String|
|Email|String|
|Password|String|
|Salt|String|
|Name|String|
|IsSuperUser|Boolean|
|Enabled|Boolean|
|UpdatedAt|Date|
|CreatedAt|Date|

::: message is-primary

よくあるユーザ向けデータベースを想定した。

パスワードをハッシュ値へ変換する際に付与されるランダムな文字列を `Salt` と表し、ユーザランクが上位に存在しているフラグを `IsSuperUser` と表す。

:::

### dockernize の際に注意すること

受け取ったレスポンスをフロントエンドで表示するため nginx 用コンテナだけではなく proxy 用コンテナを間に挟む必要がある。

```yaml
services:
  proxy:
    build: ./nginx
    ports:
      - 8082:80
```

読み込む Dockerfile はこちら。

```Dockerfile
FROM nginx:1.19-alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

[http://localhost:9000](http://localhost:9000) で API を受け取れるようになった。

### GORM を使ったデータのやり取り

リレーショナルデータベースとオブジェクト指向プログラミングの架け橋的存在 `ORM` に GORM が存在する。

[GORM | The fantastic ORM library for Golang](https://gorm.io/index.html)

その導入は至って簡単です。

```bash
go get -u github.com/jinzhu/gorm
```

先に設計したスキーマの下 model を構築する。

```go
type User struct {
	gorm.Model
	ID uint
	Email string
	Password string
	Salt string
	Name string
	IsSuperUser bool
	Enabled bool
	UpdatedAt time.Time
	CreatedAt time.Time
}
```

構造体をインスタンス化して DB のデータをフェッチする。以下のように `Unscoped()` でフェッチした DB に対しては、別途 SQL に条件が追加されない仕組みで動く。

```go
var users []User
db.Unscoped().Find(&users)
```

DB にデータを反映したい時はその情報を構造体に与えれば良い。

```go
user := User{}
user.ID = 0
user.Name = "Test"
// ..
db.Create(&user)
```

書き味の良さを感じた。

### 並列処理 goroutine について

簡単に goroutine の挙動を試した。

[type WaitGroup](https://golang.org/pkg/sync/#example_WaitGroup)

具体的には goroutine を発行する際 `sync.WaitGroup` での `Add()` で処理を待つ goroutine 数をインクリメントする。この処理が終了する頃には `Done()` を呼び出し goroutine 数をデクリメントする。

```go
func main() {
  var wg sync.WaitGroup // goroutine を発行、インスタンス化
  for i := 0; i < 100; i++ {
    wg.Add(1) // goroutine 数のインクリメント
    go func() {
      defer wg.Done() // goroutine 数のデクリメント、全て終わると 0 になる
    }()
  }
  wg.Wait() // goroutine 数が 0 になるまで待つ
}
```

`Add()` を goroutine 内では使えないことに注意。
