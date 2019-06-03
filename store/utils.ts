// import swal from 'sweetalert2'

/**
 * ダイアログメッセージを表示
 * @param error エラーフラグ
 * @param title バリデーションメッセージ
 */
// export function setDialog (error: boolean, title: string) {
//   if (error) {
//     return swal({
//       type: 'error',
//       title: title + 'を入力してください'
//     })
//   }
//
//   return swal({
//     title: title
//   })
// }

/**
 * 文字列のバリデーション
 * @param value 文字列
 */
export function isValidText (value: string) {
  if (value === '') {
    return true
  } else {
    return false
  }
}

/**
 * 数値のバリデーション
 * @param value 数値
 */
export function isValidNumber (value: number) {
  if (value === 0) {
    return true
  } else {
    return false
  }
}
