<template>
  <div class="nav-container">
    <nav id="nav" ref="navRef" class="nav">
      <div class="nav-content">
        <h1 class="nav-icon">
          <a href="/">
            webneko<span class="nav-hidden">.dev</span>
          </a>
        </h1>

        <div class="nav-links">
          <a href="https://nekohack.me" class="nav-link">
            Org
          </a>
          <a href="https://yuma-kitamura.nekohack.me" class="nav-link">
            Profile
          </a>
        </div>
        <!--
        <mode-change key="top-mode-change" />
        -->
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api'
// const ModeChange = () => import('~/components/ModeChange.vue')

export default {
  components: {
    // ModeChange
  },
  setup() {
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
}
</script>
