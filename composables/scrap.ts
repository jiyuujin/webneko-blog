import { ref, reactive, onMounted } from '@vue/composition-api'

import { addScrap, fetchScraps } from '~/repositories/scrap'

type ScrapProps = {
  slug: string
}

export default (props: ScrapProps) => {
  const form = reactive<{
    message: string
    name: string
  }>({
    message: '',
    name: ''
  })

  const scraps = ref(null)

  const applyMessage = (value: string) => {
    form.message = value
  }

  const applyName = (value: string) => {
    form.name = value
  }

  const reset = () => {
    form.message = ''
    form.name = ''
  }

  const submit = async () => {
    await addScrap(form, props.slug)
    reset()
  }

  onMounted(async () => {
    scraps.value = await fetchScraps(props.slug)
  })

  return {
    form,
    scraps,
    applyMessage,
    applyName,
    reset,
    submit
  }
}
