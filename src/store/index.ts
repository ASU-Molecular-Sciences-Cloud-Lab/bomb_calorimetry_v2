/* eslint @typescript-eslint/no-explicit-any: 0 */
import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      sampleId: -1,
      name: "",
    };
  },
  getters: {
    getSample: (state: any) => {
      return state.sampleId;
    },
    getName: (state: any) => {
      return state.name;
    },
  },
  mutations: {
    setSample(state: any, id: number) {
      if (id >= 0) {
        state.sampleId = id;
      }
    },
    setName(state: any, name: string) {
      state.name = name;
    },
  },
});
