declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue-cookie-law'

declare module '@microlink/vanilla'

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
