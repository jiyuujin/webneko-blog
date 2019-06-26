declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// デコレータで @Component を使う時に必要
declare module 'vue-class-component'

// クッキーの利用を明示するために必要
declare module 'vue-cookie-law'
