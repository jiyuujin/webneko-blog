import MarkdownIt from 'markdown-it'

export default ({ app }, inject) => {
  const md = new MarkdownIt({
    preset: 'default',
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    // https://github.com/highlightjs/highlight.js/issues/2277
    highlight(str, lang) {
      const hl = require('highlight.js')
      if (lang && hl.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' + hl.highlight(str, { language: lang, ignoreIllegals: true }).value + '</code></pre>'
        } catch (__) {}
      }
      // 言語設定がない場合、プレーンテキストとして表示する
      return (
        '<pre class="hljs"><code>' + str + '</code></pre>'
      )
    },
  })
    .use(require('markdown-it-container'), 'warning', {
      validate: function (params) {
        return params.trim().match(/^message\s+(.*)$/)
      },
      render: function (tokens, idx) {
        const m = tokens[idx].info.trim().match(/^message\s+(.*)$/)
        if (tokens[idx].nesting === 1) {
          return '<div class="message ' + md.utils.escapeHtml(m[1]) + '">'
        } else {
          return '</div>\n'
        }
      },
    })
    .use(require('markdown-it-link-attributes'), {
      pattern: /https?:/,
      attrs: {
        target: '_blank',
        rel: 'nofollow noopener noreferrer',
      },
    })
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-video'))
    .use(require('@nekohack/markdown-it-link-preview'))

  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target')
    if (tokens[idx]['attrs'][0][1].match('http')) {
      if (aIndex < 0) {
        tokens[idx].attrPush(['class', 'custom-link'])
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank'
      }
    }
    return defaultRender(tokens, idx, options, env, self)
  }

  inject('md', md)
}
