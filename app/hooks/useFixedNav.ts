export default () => {
  const navRef = ref<HTMLDivElement>()
  if (process.client) {
    window.onscroll = function updateNav() {
      if (isPageOffset()) {
        navRef.value?.classList.add('nav-active')
      } else {
        navRef.value?.classList.remove('nav-active')
      }
    }
  }
  function isPageOffset(): boolean {
    const offset = navRef.value.offsetTop

    return window.pageYOffset > offset
  }
  return { navRef }
}
