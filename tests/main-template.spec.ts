import { mount } from '@vue/test-utils'

import MainTemplate from '~/components/MainTemplate.vue'

describe('MainTemplate', () => {
  test('correctly render', () => {
    const props = {
      tags: ['Vue']
    }
    const wrapper = mount(MainTemplate, {
      propsData: props
    })
    expect(wrapper.exists()).toBe(true)
  })
})
