import { mount } from '@vue/test-utils'

import Calendar from '~/components/Calendar.vue'

describe('Calendar', () => {
  test('correctly render', () => {
    const props = {
      items: [
        {
          fields: {
            title: '',
            slug: '',
            heroImage: {
              fields: {
                file: {
                  url: '',
                },
              },
            },
            description: '',
            body: '',
            author: {
              fields: {
                name: '',
                title: '',
                company: '',
                shortBio: '',
                email: '',
                phone: '',
                facebook: '',
                twitter: '',
                github: '',
                image: '',
              },
              sys: {
                contentType: {
                  sys: {
                    id: '',
                    linkType: '',
                    type: '',
                  },
                },
                createdAt: '',
                environment: {
                  sys: {
                    id: '',
                    linkType: '',
                    type: '',
                  },
                },
                id: '',
                locale: '',
                revision: '',
                space: {
                  sys: {
                    id: '',
                    linkType: '',
                    type: '',
                  },
                },
                type: '',
                updatedAt: '',
              },
            },
            publishDate: '',
            tags: [],
            category: '',
          },
        },
      ],
      ym: '202109',
    }
    const wrapper = mount(Calendar, {
      propsData: props,
    })
    expect(wrapper.exists()).toBe(true)
  })
})
