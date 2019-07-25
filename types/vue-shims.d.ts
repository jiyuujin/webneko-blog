declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// デコレータで @Component を使うため必要
declare module 'vue-class-component'

// クッキーの利用を明示するため必要
declare module 'vue-cookie-law'

// 無限スクロールを使うため必要
declare module 'vue-infinite-loading' {
  import Vue from 'vue'

  export default class InfiniteLoading extends Vue {
    spinner: string;
    direction: string;
    distance: number;
    onInfinite: Function;
    forceUseInfiniteWrapper: boolean;
  }

  export interface StateChanger {
    loaded(): void;
    complete(): void;
    reset(): void;
  }
}