<template>
  <section class="error">
    <div>
      <h1
        v-if="error.statusCode === 404"
        class="title"
      >
        Page Not Found
      </h1>
      <h1 v-else>
        Error!
      </h1>
    </div>
    <div>
      <h2 class="sub">
        <nuxt-link to="/">
          ホーム
        </nuxt-link>
      </h2>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        error: {
            type: Object
        }
    }
})
</script>

<style scoped>
.error {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.sub {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
