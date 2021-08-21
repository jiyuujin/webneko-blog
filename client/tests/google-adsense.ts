import { mount } from '@vue/test-utils'

import GoogleAdsense from '~/components/GoogleAdsense.vue'

describe('GoogleAdsense', () => {
  test('correctly render', () => {
    const props = {
      adSlot: 'XXX',
      adFormat: 'TestFormat',
      adLayout: 'TestLayout',
      adStyle: {
        //
      },
    }
    const wrapper = mount(GoogleAdsense, {
      propsData: props,
    })
    expect(wrapper.exists()).toBe(true)
  })
})
