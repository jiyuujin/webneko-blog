export const ADcode = '(adsbygoogle = window.adsbygoogle || []).push({});'

export const adsenseList = () => {
  return [
    {
      hid: 'ADsrc',
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_ID}`,
      crossorigin: 'anonymous',
    },
    { hid: 'ADcode', innerHTML: ADcode },
  ]
}
