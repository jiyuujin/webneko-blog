import { mount } from '@vue/test-utils'

import NotifyAlert from '~/components/NotifyAlert.vue'

describe('NotifyAlert', () => {
  test('correctly render', () => {
    const props = {
      title: 'Test',
    }
    const wrapper = mount(NotifyAlert, {
      propsData: props,
    })
    expect(wrapper.exists()).toBe(true)
  })
})
