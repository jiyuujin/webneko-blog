<template>
  <div class="scrap">
    <div class="contact-title">スクラップ</div>

    <div class="form">
      <textarea
        v-model="form.message"
        :rows="5"
        :style="{ width: 'calc(100% - 1.2rem)' }"
      />
    </div>
    <div class="form">
      <j-input
        :text="form.name"
        placeholder="名前"
        width="100%"
        @handleInput="applyName"
      />
    </div>
    <div class="form">
      <j-button text="送信します" @handleClick="submit" />
      <span>
        <a
          href="https://nekohack-privacy-policy.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          プライバシーポリシーはこちらで
        </a>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import useScrap from '~/composables/scrap'

export default defineComponent({
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return { ...useScrap(props) }
  }
})
</script>

<style scoped>
.form {
  padding: 8px 0;
}

textarea {
  z-index: 1;
  padding: 0.8rem 0.2rem;
  color: #000;
  background: transparent;
  background-color: #fff;
  border: 1px solid #007bc7;
  border-radius: 4px;
  outline: 0;
  appearance: none;
}
</style>
