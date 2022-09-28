<template>
  <nav-text />
  <router-view />
  <footer-text />
</template>

<script setup lang="ts">
import NavText from '~/components/NavText.vue'
import FooterText from '~/components/FooterText.vue'
</script>
