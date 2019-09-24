<template>
    <div class="atoms-progress-bar">
        <div :style="`background-color: ${backgroundColor}; color: ${textColor}; width: ${ratio}%;`" class="container">
            {{ title }}
        </div>
        <div :style="`width: ${100 - ratio}%;`" class="others"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        backgroundColor: {
            type: String,
            default: '#ccc'
        },
        textColor: {
            type: String,
            default: '#fff'
        },
        ratio: {
            type: Number,
            default: 100
        },
        title: {
            type: String,
            default: ''
        }
    }
})
</script>

<style scoped>
.atoms-progress-bar {
  display: table;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 16px;
}
.container {
  display: table-cell;
  padding: 0.4em 16px;
  border-radius: 16px;
}
.others {
  display: table-cell;
}
</style>
