declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// vue-cookie-law
declare module 'vue-cookie-law' {
  //
}

// @microlink/vanilla
declare module '@microlink/vanilla' {
  //
}

// vue-infinite-loading
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
