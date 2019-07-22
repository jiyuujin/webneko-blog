import { Module, ActionContext, ActionTree, MutationTree } from 'vuex';
import { Dictionary, Post, Param } from '~/types/blog';
import { RootState } from './types';
import { createClient } from '~/plugins/contentful';

const client = createClient();

const ORDER = '-fields.publishDate';

const PAGE = 9;

const namespaced = true;

export const state = (): State => ({
  isCookieAccepted: false,
  latestPosts: {},
  posts: {},
  currentPost: null,
  page: 1,
  pagesTotal: 0,
  tags: []
});

export interface State {
  isCookieAccepted: boolean | false;
  latestPosts: Dictionary<Post>;
  posts: Dictionary<Post>;
  currentPost: Post | null;
  page: number;
  pagesTotal: number;
  tags: string[];
}

export interface RootState extends State {
  //
}

export const mutations: MutationTree<State> = {
  acceptCookie (state) {
    state.isCookieAccepted = true
  },
  setLatestPosts (state, payload) {
    state.latestPosts = payload
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
  setTags (state, payload) {
    state.tags = payload
  }
};

export const actions: RootActionTree<State, RootState> = {
  async nuxtServerInit(
    { commit, state }: ActionContext<State, RootState>,
  ) {
    commit('setPage', !state.page ? 1 : state.page)

    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: ORDER,
        // skip: (state.page - 1) * PAGE,
        // limit: PAGE
      })
      .then((entries: any) => {
        commit('setPosts', entries.items)
        commit('setPagesTotal', Math.ceil(entries.total / PAGE))
      })
  },
  async initPosts (
    { commit, state }: ActionContext<State, RootState>,
    params: Param
  ) {
    if (params.slug !== '') {
      const LATEST_PAGE = 12

      await client
        .getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
          order: ORDER,
          limit: LATEST_PAGE
        })
        .then((entries: any) => {
          commit('setLatestPosts', entries.items)
        })

      await client
        .getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
          order: ORDER
        })
        .then((entries: any) => {
          const currentPost = entries.items.filter((item: any) => {
            return item.fields.slug === params.slug
          })

          commit('setCurrentPost', currentPost[0])
        })
      return
    }

    commit('setPage', state.page)

    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: ORDER,
        // skip: (state.page - 1) * PAGE,
        // limit: PAGE
      })
      .then((entries: any) => {
        commit('setPosts', entries.items)
        commit('setPagesTotal', Math.ceil(entries.total / PAGE))
      })

    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: ORDER
      })
      .then((entries: any) => {
        let array: string[] = []
        entries.items.forEach(item => {
          item.fields.tags.forEach(tag => {
            array.push(tag)
          })
        })

        commit('setTags', array.filter((x, i, self) => {
          return self.indexOf(x) === i
        }))
      })
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
