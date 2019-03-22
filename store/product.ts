import { Module, ActionContext, ActionTree, MutationTree } from 'vuex';
import { RootState } from './types';
import { createClient } from '~/plugins/contentful'

const client = createClient();

const ORDER = '-fields.publishDate';

const PAGE_SIZE = 12;

const namespaced = true;

export const state = (): State => ({
  isCookieAccepted: false,
  posts: {},
  currentPost: null,
  page: 1,
  pagesTotal: 0,
  loading: false
});

interface Dictionary<T> {
  [key: string]: T
}

export interface Post {
  title: string;
  description: string;
  body: string;
}

export interface Param {
  slug: string;
}

export interface State {
  isCookieAccepted: boolean | false;
  posts: Dictionary<Post>;
  currentPost: Post | null;
  page: number;
  pagesTotal: number;
  loading: boolean | false;
}

export interface RootState extends State {
  //
}

export const mutations: MutationTree<State> = {
  acceptCookie (state) {
    state.isCookieAccepted = true
  },
  setPosts (state, payload) {
    state.posts = payload
  },
  setCurrentPost (state, payload) {
    state.currentPost = payload
  },
  setPage (state, payload) {
    state.page = payload
  },
  setPagesTotal (state, payload) {
    state.pagesTotal = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  }
};

export const actions: RootActionTree<State, RootState> = {
  async nuxtServerInit(
    { commit, state }: ActionContext<State, RootState>,
  ) {
    let page = 1
    if (!state.page) {
      page = 1
    }

    // ページを設定する
    commit('setPage', page)

    const contentfulOptions = {
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: ORDER,
      skip: (state.page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE
    }

    await client
      .getEntries(contentfulOptions)
      .then((entries: any) => {
        // console.log(entries)

        // ポストを設定する
        commit('setPosts', entries.items)

        // ページ数合計を設定する
        commit('setPagesTotal', Math.ceil(entries.total / PAGE_SIZE))
      })
      .catch(console.error)
  },
  async initPosts (
    { commit, state }: ActionContext<State, RootState>,
    params: Param
  ) {
    if (params.slug !== '') {
      commit('setLoading', true)

      const CONTENTFUL_OPTION = {
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: ORDER
      }

      await client
        .getEntries(CONTENTFUL_OPTION)
        .then((entries: any) => {
          // console.log(entries)
          const currentPost = entries.items.filter((item: any) => {
            return item.fields.slug === params.slug
          })

          // 現在のポストを設定する
          commit('setCurrentPost', currentPost[0])
        })
        .catch(console.error)
        .finally(() => {
          commit('setLoading', false)
        })
      return
    }

    // ページを設定する
    commit('setPage', state.page)

    const CONTENTFUL_OPTION = {
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: ORDER,
      skip: (state.page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE
    }

    await client
      .getEntries(CONTENTFUL_OPTION)
      .then((entries: any) => {
        // console.log(entries)

        // ポストを設定する
        commit('setPosts', entries.items)

        // ページ数合計を設定する
        commit('setPagesTotal', Math.ceil(entries.total / PAGE_SIZE))
      })
      .catch(console.error)
  }
};

export interface RootActionTree<State, RootState> extends ActionTree<State, RootState> {
  nuxtServerInit(
    context: ActionContext<State, RootState>,
  ): Promise<void>;
  initPosts(
    context: ActionContext<State, RootState>,
    params: Param
  ): Promise<void>;
}

export const getters = {
  //
};

export const product: Module<State, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
};
