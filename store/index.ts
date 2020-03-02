import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

// Modules
import { product } from './product'

Vue.use(Vuex)

type RootState = {
  version: string
}

const store: StoreOptions<RootState> = {
  modules: {
    product: product
  },
  state: {
    version: '1.0.0'
  }
}

export const createStore = () => {
  return new Vuex.Store<RootState>(store)
}

// export default createStore
