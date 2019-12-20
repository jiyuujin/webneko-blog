<template>
  <div :class="isForm ? `form` : ``">
    <slot />
    <footer-text v-if="!isForm" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const FooterText = () => import('~/components/FooterText.vue')

export default Vue.extend({
    components: {
        FooterText
    },
    props: {
        isForm: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style lang="scss" scoped>
.form {
    width: 80%;
    margin: 0 auto;
    padding: 1px;
}

@media (max-width: 500px) {
    .form {
        width: 100%;
    }
}
</style>
