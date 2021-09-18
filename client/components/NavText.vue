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
import useFixedNav from '~/hooks/useFixedNav'
// const ModeChange = () => import('~/components/ModeChange.vue')

export default {
  components: {
    // ModeChange
  },
  setup() {
    return { ...useFixedNav() }
  }
}
</script>
