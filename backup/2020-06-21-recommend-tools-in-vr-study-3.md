---
date: 2020-06-21
title: Slackを中心に世界は廻っている
description: VR勉強会 #3 / #study_in_vr で登壇させていただきました。YouTube Live上でお話できなかった、Github API v4 をどのように使っているかなど、皆さまの参考になればと思います。
slug: recommend-tools-in-vr-study-3
reaction: 🌐
category: Server
tags: 
 - Google-Apps-Script
 - NodeJS
---

## 推しツール

そもそもここでいう `ツール` というのは大変広過ぎる意味を持つ訳ですが、今回はちょっとでも面倒と感じる瞬間を低減させるために導入を進めた手段が多いです。

これから説明する全ての基本になっている存在が Slack。

- Slack
- Github API v4
- Github ISSUE
- Google Apps Script
- Google Cloud (Trigger Run)
- Google Spreadsheet
- Nuxt.js (Vue.js)
- Netlify

### 週一KPTで、

一日の始まりに進捗を確認すること。また `週一KPT` 恐らく私自身だけではなく各個人でやっているでしょう。

そのまとめ作業にかける時間を少しでも低減したい。そこで直近一週間のコミットログや、各 label に応じて ISSUE を取得している。

たとえば、コミットログを出すクエリは以下の通り。

```ts
const currentDate = dayjs().format('YYYY/MM/DD')

const pastQuery = `
  query{
    viewer {
      repositories(first: 100) {
        nodes {
          defaultBranchRef {
            target {
              ... on Commit {
                history(since: "${currentDate}") {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`
```

喫緊やらなきゃいけない ISSUE を取得するクエリは以下の通り。

```ts
const query = `
  {
    repository(owner: "${USER}", name: "${REPO}") {
      id,
      name,
      description,
      issues(first: 50, states: OPEN) {
        totalCount,
        nodes {
          title
        }
      },
      labels(first: 10) {
        nodes {
          name,
          id
        }
      }
    }
  }
`
```

後はそのクエリを含めた API を叩く。

ざっくりだけどこうやってクエリを書けることがわかると、日々つまらないことから少しは気持ちが変わる。

```ts
const params = {
  'headers' : {
    'Authorization' : 'Bearer ' +  TOKEN
  },
  'method' : 'get',
  'contentType' : 'application/json',
  'payload' : JSON.stringify({
     'query': query
  }),
  'muteHttpExceptions': true
}

const response = await UrlFetchApp.fetch(API_V4, params)
const json = JSON.parse(response.getContentText())
```

毎日同じ時間帯に流すトリガーを設定することで、日々の進捗を slack を見るだけで把握できると共に、ちょっとした手間を省くことができました。

### API設計書をHTMLに吐く

これまでのような ISSUE 管理に留まりません。

事前準備の HTML に合わせ情報を書き出す用途でもこの GAS を利用。

API 設計書として読み込むのもこの GAS を活用。

```js
onClick = function() {
  google.script.run.sourceTemplateMenu_onClicked();
};
```

HTML テンプレート上に設定したボタンの発火メソッドで自動的に書き出す処理を掘り込む。

```ts
private static insertValues(content: string, info: ApiInfo): string {
  content = StringUtil.replaceAll(content, "#{apiId}", info.apiId);
  // ..
  return content;
}
```

すると容易に設計書として吐き出すことができる。

## 情報の仕入れは、

⚠️ こちらは cluster / YouTube Live 上でお話した内容です。

基本的には IFTTT を利用して、はてなエントリーや note の RSS を追跡。

個人 slack かつ専用の channel に流しているが、これだけではありません。

流れる全ての情報の内、自ら何らかの `顔文字アクション` を取った情報について GAS を利用して指定のスプレッドシートに蓄積させました。

```js
const baseUrl = 'https://slack.com/api/conversations.history';
const baseParams = [
  'token=' + token,
  'channel=' + channel,
  'oldest=' + messageTs,
  'latest=' + messageTs,
  'inclusive=' + true
];

const latestMessage = '';
const params = baseParams.concat([latestMessage]).join('&');
const encodeType =　'application/x-www-form-urlencoded';
const res = postMessageToSlack(baseUrl + '?' + params, encodeType);

function postMessageToSlack(url, encodeType) {
  const res = UrlFetchApp.fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': encodeType
    }
  });
  return JSON.parse(res);
}
```

`/api/conversations.history` と、適切なパラメータを設定すれば正しくリアクションを受け取れる。そしてその情報を、自分だけのために製作・運用を進めている管理画面 (Nuxt + Firestore) で表示させる。

![admin-tip](//images.ctfassets.net/gzkue3szf85p/2lYQN5gx0MyYGXfsGn8JpS/18067dbb843ab4ec8056d624632bea9f/ss_admin_2.JPG)

レイアウトについては Tailwind CSS を。

個別のアトミックコンポーネントについては @nekohack/j-stylebook という自ら製作から運用まで手掛けるプラグインを使っている。

![admin-tag-modal](//images.ctfassets.net/gzkue3szf85p/6VdRHZxxCdzibvXIMXCmu0/88b0425a9a501e5e00471e36fadd0419/nuxtadmin-1.png)

一部のデザインについてはプライベートでやっている割に凝り過ぎたデザインで。

そんな中、自動化を進める上で特に力を入れたポイントを主に 2 点列挙。

- ひとつはスプレッドシート名を年月で管理したこと。
- 存在する年月を使う場合はそのシート名を使い、一方で使おうとする年月が存在してなかった場合は新たなシート名を作ったこと。

```js
const today = new Date();
const sheetName = Utilities.formatDate(
  today,
  'Asia/Tokyo',
  'yyyyMM'
);

const sheet = SpreadsheetApp
  .getActive()
  .getSheetByName(sheetName);

// 存在していない場合新たに作る
if(!sheet) SpreadsheetApp.create(sheetName);
```

もうひとつはフロント (Nuxt.js) から読み込む際に予め、使い易く情報を成形していること。

Firestore 上で作っているスキーマは以下の通り。

```ts
export interface TipForm {
  title: string
  url: string
  description: string
  tags: number[]
  event: number
  time: Date
}
```

ここで主に情報成形後に入力しているカラムは title と url。予め正規表現を使って、容易に URL を抜き出す。するとフロント (Nuxt.js) では API を叩いて上手く配置してあげるだけ、それなりの Web サイトとして自身の見たい情報を集約できる。

そう遠くない内に実現したいこと。現状 Firebase Auth により私自身のみが見られるようになっているが、それを他の人たちも見られるようになれば。

おいおい報告していければ。

:::message .is-primary

Chrome で新しいタブを開いた時に、その場でテックニュースを仕入れることのできる Chrome Extension の存在があるとのこと。

それから私もちょこちょこ触らせていただいてます。

- [Chrome extension](https://chrome.google.com/webstore/detail/daily-20-source-for-busy/jlmpjdjjbgclbocgajdjefcidcncaied?hl=en)
- [Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/daily/)

:::
