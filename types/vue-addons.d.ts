import Vue from 'vue'
import { Route } from 'vue-router'
import { ActionContext as BaseActionContext } from 'vuex'
import { firestore } from 'firebase'
import { MetaInfo } from 'vue-meta'

declare module 'vue/types/vue'

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

declare module 'vue-router/types/router'

declare module 'vuex-type-helper' {
  interface BindOptions {
    maxRefDepth?: number
  }

  export interface ActionContext<State, Getters, Actions, Mutations>
    extends BaseActionContext<State, any> {
    bindFirebaseRef: (
      key: string,
      ref: firestore.Query,
      options?: BindOptions
    ) => Promise<void>
    unbindFirebaseRef: (key: string) => void
  }
}
