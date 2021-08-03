import { mount } from '@vue/test-utils'

import HeaderText from '~/components/HeaderText.vue'

describe('Header', () => {
  test('correctly render', () => {
    const props = {
      //
    }
    const wrapper = mount(HeaderText, {
      propsData: props
    })
    expect(wrapper.exists()).toBe(true)
  })
})
