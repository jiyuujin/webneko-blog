import { SetupContext } from '@vue/composition-api'

type SocialMenuProps = {
  slugText: string
  title: string
  isVertical: boolean
}

export default (props: SocialMenuProps, ctx: SetupContext) => {
  const socialMenu = ['twitter', 'hatena', 'note']

  const handleClick = (item: string) => {
    let url = ''

    if (item === 'twitter') {
      url = `http://twitter.com/share?text=${props.title}&url=https://webneko.dev/posts/${props.slugText}`
    } else if (item === 'hatena') {
      url = `http://b.hatena.ne.jp/entry/webneko.dev/posts/${props.slugText}`
    } else {
      url = `https://note.mu/intent/post?url=https://webneko.dev/posts/${props.slugText}`
    }

    window.open(
      encodeURI(decodeURI(url)),
      'tweetwindow',
      'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'
    )

    return false
  }

  return { socialMenu, handleClick }
}
