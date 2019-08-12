/* eslint-disable */
import Vue from 'vue';
import { Route } from 'vue-router';
import { ActionContext as BaseActionContext } from 'vuex';
import ApolloClient from 'apollo-client';
import { firestore } from 'firebase';
import { MetaInfo } from 'vue-meta';

// apollo
type QueryOption = {
  query: Object,
  variables: Object
}

type MutateOption = {
  mutation: Object,
  variables: Object
}

interface Apollo {
  query(
    queryOption: QueryOption
  );
  mutate(
    mutateOption: MutateOption
  );
}

interface ApolloHelpers {
  onLogin(
    token: string,
    apolloClient?: ApolloClient<{}>,
    tokenExpires?: number
  ): Promise<void>;
  onLogout(
    apolloClient?: ApolloClient<{}>
  ): Promise<void>;
  getToken(
    tokenName?: string
  ): string;
}

// vue
declare module 'vue/types/vue' {
  interface Vue {
    $apollo: Apollo;
    $apolloHelpers: ApolloHelpers;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    // asyncData?: (ctx: NuxtContext) => Promise<any>;
    // fetch?: (ctx: NuxtContext) => Promise<any>;
    layout?: string;
    middleware?: string | string[];
    head?: MetaInfo | (() => MetaInfo)
    key?: string | ((to: Route) => string)
    scrollToTop?: boolean
    watchQuery?: boolean | string[]
  }
}

// vue-router
declare module 'vue-router/types/router' {
  //
}

// vuex
declare module 'vuex-type-helper' {
  interface BindOptions {
    maxRefDepth?: number;
  }

  export interface ActionContext<
    State,
    Getters,
    Actions,
    Mutations
    > extends BaseActionContext<State, any> {
    bindFirebaseRef: (
      key: string,
      ref: firestore.Query,
      options?: BindOptions
    ) => Promise<void>;
    unbindFirebaseRef: (
      key: string
    ) => void;
  }
}
/* eslint-enable */
