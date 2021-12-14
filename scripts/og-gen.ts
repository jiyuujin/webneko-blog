'use strict'

const puppeteer = require('puppeteer')
const path = require('path')

const fs = require('fs')

const OG_SOURCE_DIR_PATH = path.join(__dirname, '..', 'data')
const OG_SOURCE_HTML_FILE_PATH = path.join(OG_SOURCE_DIR_PATH, 'og.html')
const OG_DIR_PATH = path.join(__dirname, '..', 'client', 'static', 'og')

async function captureOgImage(browser: any, title: string, reaction: string, imagePath: string) {
  const page = await browser.newPage()
  await page.setViewport({
    width: 1200,
    height: 630,
  })
  await page.goto('file://' + OG_SOURCE_HTML_FILE_PATH)
  await page.exposeFunction('getTitle', () => title)
  if (reaction) {
    await page.exposeFunction('getReaction', () => reaction)
  }
  await page.reload()
  await page.screenshot({
    path: imagePath,
    type: 'jpeg',
  })
  await page.close()
}

;(async function () {
  const lang = 'en-US'

  const jsonObject = JSON.parse(await fs.readFileSync('./webneko-blog-export.json', 'utf8'))

  let ogList = [{ title: 'Web猫ブログ', slug: 'top', reaction: '' }]

  Object(jsonObject?.entries).forEach((obj: unknown | any) => {
    const field = obj.fields
    if (field.slug !== undefined) {
      const titleText = field.title[lang]

      const slugText = field.slug[lang]

      const reactionText = field.reaction[lang]

      ogList.push({ title: titleText, slug: slugText, reaction: reactionText })
    }
  })

  const browser = await puppeteer.launch()

  for (const { title, slug, reaction } of ogList) {
    const OG_IMAGE_FILE_PATH = `${OG_DIR_PATH}/` + slug + '.jpg'
    await captureOgImage(browser, title, reaction, OG_IMAGE_FILE_PATH)
  }

  await browser.close()
})()
