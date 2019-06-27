<template>
  <div>
    <select
      v-model="newVal"
    >
      <option
        :value="defautValue"
        selected
        style="display: block;"
      >
        {{ column }}選択してください
      </option>
      <option
        v-for="item in option"
        :key="item.value"
        :value="item.value"
      >
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class SingleSelectForm extends Vue {
  @Prop() option!: string[] | number[];
  @Prop() text!: string;
  @Prop() number!: number;
  @Prop() column!: string;
  defautValue: number = 0;

  get newVal() {
    if (this.text) {
      return this.text
    }
    return this.number
  }

  set newVal(val: string | number) {
    this.$emit('form-data', val)
  }
}
</script>

<style scoped>
select {
  width: 80%;
  font-size: 14px;
  font-weight: bold;
  border: solid 1px;
  border-radius: 5px;
  margin: 5px 10px 5px 0;
  padding: 2px 6px 3px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
  -webkit-font-smoothing: antialiased;
}
</style>
