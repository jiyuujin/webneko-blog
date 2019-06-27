<template>
  <div class="pagination">
    <a
      :class="page === 1 ? 'disabled' : ''"
      :style="page === 1 ? 'opacity: 0.5;' : 'opacity: 1;'"
      href="#"
      @click="prev(page)"
    >
      &laquo;
    </a>
    <a
      :class="page === max ? 'disabled' : ''"
      href="#"
      @click="next(page)"
    >
      &raquo;
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Pagination extends Vue {
  @Prop() page!: number;
  @Prop() max!: number;
  disabled: boolean = true;

  prev(newVal: number) {
    if (this.page !== 1) {
      this.$emit('page-data', newVal - 1)
    }
  }

  next(newVal: number) {
    if (this.page !== this.max) {
      this.$emit('page-data', newVal + 1)
    }
  }
}
</script>

<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: solid 4px #ddd;
  border-radius: 24px;
  margin: 0 4px;
}

.pagination a.active {
  background-color: #42b883;
  color: white;
  border: solid 4px #42b883;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}

.disabled {
  pointer-events: none;
}
</style>
