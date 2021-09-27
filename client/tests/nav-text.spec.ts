import { mount } from '@vue/test-utils'

import NavText from '~/components/NavText.vue'

describe('NavText', () => {
  test('correctly render', () => {
    const props = {}
    const wrapper = mount(NavText, { propsData: props })
    expect(wrapper.exists()).toBe(true)
  })
})
