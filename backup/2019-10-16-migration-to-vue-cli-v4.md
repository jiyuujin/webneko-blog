---
date: 2019-10-16
title: Vue CLI v4 に更新
description: 昨日の晩に Vue CLI v4 の更新が出たことを受け軽く書きました。
slug: migration-to-vue-cli-v4
reaction: 4️⃣
category: Front
tags: 
 - Vue
 - Vue-CLI
---

## 設計の原則を踏襲しながら

ここ最近は、 [CakePHP](https://cakephp.org/jp) に Vue(TS) を導入するお仕事を進めてます。 Vue 導入前の分が既に一部リリース済みという、新規のような既存案件。先日フロントの設計で大切にしていることについて書かせていただきました、良ければ確認してみてください。

<a class="link-preview" href="https://webneko.dev/posts/in-progress-to-vue-on-cakephp">CakePHP に Vue 導入 - 責務分離の原則を徹底</a>

## Vue CLI v4 🎉

具体的な変更内容については以下公式ページをご確認いただければ。

<a class="link-preview" href="https://cli.vuejs.org/migrating-from-v3/#migrating-from-v3">Migrating from v3</a>

今回掻い摘んで話すと、以下 core-js / sass-loader / jest 周りに注意しました。

特に肝は今回のプロジェクトでも採用している Sass (sass-loader v8) 対応を含むか、という部分。

1. core-js v3 に対応
2. sass-loader v8 に対応
3. @types/jest / ts-jest v24 に対応

```bash
"devDependencies": {
-    "@vue/cli-plugin-babel": "3.12.0",
-    "@vue/cli-plugin-eslint": "3.12.0",
-    "@vue/cli-plugin-typescript": "3.12.0",
-    "@vue/cli-plugin-unit-jest": "3.12.0",
-    "@vue/cli-service": "3.12.0",
+    "@vue/cli-plugin-babel": "4.0.0",
+    "@vue/cli-plugin-eslint": "4.0.1",
+    "@vue/cli-plugin-typescript": "4.0.0",
+    "@vue/cli-plugin-unit-jest": "4.0.0",
+    "@vue/cli-service": "4.0.0",
-    "core-js": "^2.6.5",
+    "core-js": "^3.0.0",
-    "sass-loader": "7.3.1",
+    "sass-loader": "8.0.0",
-    "ts-jest": "23.10.5",
+    "ts-jest": "24.1.0",
}
```

## 最後に

相変わらずマイグレーションガイドを別途準備していただけるのは、非常に有り難いですね。
