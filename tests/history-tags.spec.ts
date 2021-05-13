import { mount } from '@vue/test-utils'

import HistoryTags from '../components/HistoryTags.vue'

describe('HistoryTags', () => {
  test('correctly render', () => {
    const props = {
      tags: ['Vue']
    }
    const wrapper = mount(HistoryTags, {
      propsData: props
    })
    expect(wrapper.exists()).toBe(true)
  })
})
