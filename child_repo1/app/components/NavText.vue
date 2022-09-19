<template>
  <div class="nav-container">
    <nav id="nav" ref="navRef" class="nav">
      <div class="nav-content">
        <h1 class="nav-icon">
          <a href="/" title="トップへ戻る">
            webneko<span class="nav-hidden">.dev</span>
          </a>
          <!--
          <Nuxt3Svg />
          -->
        </h1>

        <div class="nav-links">
          <a href="https://nekohack.me" title="Orgを見る" class="nav-link">
            Org
          </a>
          <a href="https://yuma-kitamura.nekohack.me" title="Profileを見る" class="nav-link">
            Profile
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
// import Nuxt3Svg from '~/assets/nuxt3.svg'

export default {
  // components: {
  //   Nuxt3Svg
  // }
}
</script>
