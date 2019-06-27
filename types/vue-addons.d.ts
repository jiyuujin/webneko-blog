import { NuxtContext } from 'nuxt';
import Vue from 'vue';
import { Route } from 'vue-router';
import { MetaInfo } from 'vue-meta';
import { MicrolinkPlugin } from '~/plugins/microlink';

declare module 'vue/types/vue' {
  interface Vue {
    $microlinkjs: MicrolinkPlugin;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    // asyncData?: (ctx: NuxtContext) => Promise<any>;
    // fetch?: (ctx: NuxtContext) => Promise<any>;
    // layout?: string;
    // middleware?: string | string[];
    head?: MetaInfo | (() => MetaInfo)
    key?: string | ((to: Route) => string)
    scrollToTop?: boolean
    watchQuery?: boolean | string[]
  }
}
