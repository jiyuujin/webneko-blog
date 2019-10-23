import { Module, ActionContext, ActionTree, MutationTree } from 'vuex';
import dayjs from 'dayjs'
import { PAGE, LATEST_PAGE, ORDER } from '~/services/blog';
import { KeyValue, Post, Param } from '~/types/blog';
import { RootState } from './types';
import { createClient } from '~/plugins/contentful';

const client = createClient();

const namespaced = true;

export const state = (): State => ({
  isCookieAccepted: false,
  latestPosts: {},
  posts: {},
  currentPost: null,
  page: 1,
  archives: {}
});

export interface State {
  isCookieAccepted: boolean | false;
  latestPosts: KeyValue<Post>;
  posts: KeyValue<Post>;
  currentPost: Post | null;
  page: number;
  archives: KeyValue<Post>;
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
  setArchives(state, payload) {
    state.archives = payload
  }
};

export const actions: RootActionTree<State, RootState> = {
  async fetchAllPosts (
    { dispatch }: ActionContext<State, RootState>
  ) {
    await Promise.all([
      dispatch('fetchPosts'),
      dispatch('fetchLatestPosts')
    ])
  },
  async fetchPosts({ commit }) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: ORDER,
        limit: PAGE
        // skip: (state.page - 1) * PAGE
      })
      .then((entries: any) => {
        commit('setPosts', entries.items)
      })
  },
  async fetchLatestPosts({ commit }) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: ORDER,
        limit: LATEST_PAGE
        // skip: (state.page - 1) * PAGE
      })
      .then((entries: any) => {
        commit('setLatestPosts', entries.items)
      })
  },
  async fetchPost({ commit }, params) {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: ORDER
      })
      .then((entries: any) => {
        if (params.slug) {
          const currentPost = entries.items.filter((item: any) => {
            return item.fields.slug === params.slug
          })
          commit('setCurrentPost', currentPost[0])
        }

        if (params.month) {
          const archives = entries.items.filter((item: any) => {
            if (!item.fields.title.includes('振り返り')) {
              return dayjs(item.fields.publishDate).format('YYYY-MM').includes(params.month)
            }
          })
          commit('setArchives', archives)
        }
      })
  }
};

export interface RootActionTree<State, RootState> extends ActionTree<State, RootState> {
  fetchAllPosts(
    context: ActionContext<State, RootState>
  ): Promise<void>;
  fetchPosts(
    context: ActionContext<State, RootState>
  ): Promise<void>;
  fetchLatestPosts(
    context: ActionContext<State, RootState>
  ): Promise<void>;
  fetchPost(
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
