import { mount } from '@vue/test-utils'

import BuyMeACoffee from '~/components/BuyMeACoffee.vue'

describe('BuyMeACoffee', () => {
  test('correctly render', () => {
    const provide = {
      key() {
        return Symbol()
      }
    }
    const wrapper = mount(BuyMeACoffee, {
      provide
    })
    expect(wrapper.exists()).toBe(true)
  })
})
