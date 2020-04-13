import { Module, ActionTree, MutationTree } from 'vuex'

const namespaced = true

type RootState = {
  version: string
}

export const state = (): State => ({
  isCookieAccepted: false
})

export interface State {
  isCookieAccepted: boolean | false
}

export const mutations: MutationTree<State> = {
  acceptCookie(state) {
    state.isCookieAccepted = true
  }
}

export const actions: RootActionTree<State, RootState> = {
  accept(flag) {
    this.commit('product/acceptCookie', flag)
  }
}

export interface RootActionTree<State, RootState>
  extends ActionTree<State, RootState> {
  //
}

export const getters = {
  //
}

export const product: Module<State, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
