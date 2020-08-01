import { computed, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'

export default (props: {}, ctx: SetupContext) => {
  const getCurrentMonth = computed(() => {
    return dayjs().format('YYYY-MM')
  })

  const getCurrentDate = (date: Date) => {
    return dayjs(date).format('MM月 DD日')
  }

  return { getCurrentMonth, getCurrentDate }
}
