'use strict'

const contentful = require('contentful')

const fs = require('fs-extra')
const { Feed } = require('feed')
const { promisify } = require('util')

require('dotenv').config()

let feed = new Feed({
  title: 'Web猫ブログ',
  description:
    '2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。',
  feed_url: 'https://webneko.dev/feeds.xml',
  site_url: 'https://webneko.dev/',
  copyright: 'nekohack',
  language: 'ja'
})

const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
})

client
  .getEntries({
    content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    order: '-fields.publishDate'
  })
  .then(async (entries) => {
    for (let index = 0; index < entries.items.length; index++) {
      const post = entries.items[index]
      feed.items.push({
        link: `https://webneko.dev/posts/${post.fields.slug}`,
        title: post.fields.title,
        description: post.fields.description,
        body: post.fields.body,
        pubDate: post.fields.publishDate
      })
    }
    await promisify(fs.writeFile)('./static/feeds.xml', feed.rss2())
  })
  .catch((err) => {
    console.log(err)
  })

export default function () {}
