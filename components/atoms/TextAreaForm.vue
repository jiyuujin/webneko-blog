<template>
  <div>
    <div>
      <label>
        {{ column }}
      </label>
    </div>
    <div>
      <textarea
        v-model="newVal"
        :type="column === 'Password' ? 'password' : null"
        :placeholder="column + 'を入力してください'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class TextAreaForm extends Vue {
  @Prop() data!: string;
  @Prop() column!: string;

  get newVal() {
    return this.data
  }

  set newVal(val: string) {
    this.$emit('form-data', val)
  }
}
</script>

<style scoped>
textarea {
  width: 80%;
  height: 100px;
  font-size: 14px;
  font-weight: bold;
  border: solid 1px;
  border-radius: 5px;
  margin: 10px 10px 10px 0;
  padding: 2px 6px 3px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-out;
  -webkit-font-smoothing: antialiased;
}
</style>
