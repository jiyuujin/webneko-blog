import { computed } from '@vue/composition-api'
import dayjs from 'dayjs'
import { PostItem } from '../types/blog'

type CalendarProps = {
  items: Array<PostItem>
  ym: string
}

export default (props: CalendarProps) => {
  const startOfMonth = computed(() => {
    const startDay = dayjs(`${props.ym}/01`).startOf('month').format('dddd')
    if (startDay === 'Sunday') {
      return 0
    } else if (startDay === 'Monday') {
      return 1
    } else if (startDay === 'Tuesday') {
      return 2
    } else if (startDay === 'Wednesday') {
      return 3
    } else if (startDay === 'Thursday') {
      return 4
    } else if (startDay === 'Friday') {
      return 5
    } else if (startDay === 'Saturday') {
      return 6
    }
    return null
  })

  const endOfMonth = computed(() => {
    const d = new Date(props.ym)
    const day = dayjs(new Date(d.getFullYear(), d.getMonth() + 1, 0))
    const endDay = dayjs(day).format('dddd')
    if (endDay === 'Sunday') {
      return 6
    } else if (endDay === 'Monday') {
      return 5
    } else if (endDay === 'Tuesday') {
      return 4
    } else if (endDay === 'Wednesday') {
      return 3
    } else if (endDay === 'Thursday') {
      return 2
    } else if (endDay === 'Friday') {
      return 1
    } else if (endDay === 'Saturday') {
      return 7
    }
    return null
  })

  const days = computed(() => {
    const d = new Date(props.ym)
    const day = dayjs(new Date(d.getFullYear(), d.getMonth() + 1, 0))
    return dayjs(day).format('DD')
  })

  const getPost = (day: number) => {
    let post: PostItem | null | undefined
    props.items.map((item: PostItem) => {
      if (day === Number(dayjs(item.fields.publishDate).format('DD'))) {
        post = item
      }
    })
    return post
  }

  return { startOfMonth, endOfMonth, days, getPost }
}
