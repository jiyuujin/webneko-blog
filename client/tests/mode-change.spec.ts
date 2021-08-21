import { mount } from '@vue/test-utils'

import ModeChange from '~/components/ModeChange.vue'

describe('ModeChange', () => {
  test('correctly render', () => {
    const provide = {
      key() {
        return Symbol()
      },
    }
    const wrapper = mount(ModeChange, {
      provide,
    })
    expect(wrapper.exists()).toBe(true)
  })
})
