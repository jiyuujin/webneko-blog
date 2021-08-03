import Vue from 'vue'
import sanitizeHTML from 'sanitize-html'

const defaultOptions = {
  allowedTags: ['a', 'b'],
  allowedAttributes: {
    div: ['message'],
    a: ['href'],
    img: ['src']
  }
}

Vue.use(sanitizeHTML, defaultOptions)

Vue.prototype.$sanitize = sanitizeHTML
