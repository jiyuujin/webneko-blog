let lazyloadads = false
window.addEventListener(
  'scroll',
  function () {
    if (
      (document.documentElement.scrollTop !== 0 && lazyloadads === false) ||
      (document.body.scrollTop !== 0 && lazyloadads === false)
    ) {
      ;(function () {
        let ad = document.createElement('script')
        ad.type = 'text/javascript'
        ad.async = true
        ad.src =
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        let sc = document.getElementsByTagName('script')[0]
        sc.parentNode.insertBefore(ad, sc)
      })()
      lazyloadads = true
    }
  },
  true
)
