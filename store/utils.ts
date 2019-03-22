import swal from 'sweetalert2'

export function setDialog (error: boolean, title: string) {
  if (error) {
    return swal({
      type: 'error',
      title: title + 'を入力してください'
    })
  }

  return swal({
    title: title
  })
}

export function isValidText (value: string) {
  if (value === '') {
    return true
  } else {
    return false
  }
}

export function isValidNumber (value: number) {
  if (value === 0) {
    return true
  } else {
    return false
  }
}
