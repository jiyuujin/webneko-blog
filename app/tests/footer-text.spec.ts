import { mount } from '@vue/test-utils'

import FooterText from '~/components/FooterText.vue'

describe('Footer', () => {
  test('correctly render', () => {
    const props = {}
    const wrapper = mount(FooterText, {
      propsData: props,
    })
    expect(wrapper.exists()).toBe(true)
  })
})
