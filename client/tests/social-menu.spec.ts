import { mount } from '@vue/test-utils'

import SocialMenu from '~/components/SocialMenu.vue'

describe('SocialMenu', () => {
  test('correctly render', () => {
    const props = {
      slugText: '',
      title: '',
      isVertical: false
    }
    const wrapper = mount(SocialMenu, {
      propsData: props
    })
    expect(wrapper.exists()).toBe(true)
  })
})
