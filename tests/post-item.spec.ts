import { mount } from '@vue/test-utils'

import PostItem from '~/components/PostItem.vue'

describe('PostItem', () => {
  test('correctly render', () => {
    const props = {
      post: {
        fields: {
          title: '',
          slug: '',
          heroImage: {
            fields: {
              file: {
                url: ''
              }
            }
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
              image: ''
            },
            sys: {
              contentType: {
                sys: {
                  id: '',
                  linkType: '',
                  type: ''
                }
              },
              createdAt: '',
              environment: {
                sys: {
                  id: '',
                  linkType: '',
                  type: ''
                }
              },
              id: '',
              locale: '',
              revision: '',
              space: {
                sys: {
                  id: '',
                  linkType: '',
                  type: ''
                }
              },
              type: '',
              updatedAt: ''
            }
          },
          publishDate: '',
          tags: [],
          category: ''
        }
      }
    }
    const wrapper = mount(PostItem, {
      propsData: props
    })
    expect(wrapper.exists()).toBe(true)
  })
})
