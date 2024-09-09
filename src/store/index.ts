/* eslint @typescript-eslint/no-explicit-any: 0 */
import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      sampleId: -1,
      name: "",
      calorimeterCode: "",
    };
  },
  getters: {
    getSample: (state: any) => {
      return state.sampleId;
    },
    getName: (state: any) => {
      return state.name;
    },
    getCalorimeterCode: (state: any) => {
      return state.calorimeterCode;
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
    setCalorimeterCode(state: any, code: string) {
      state.calorimeterCode = code;
    },
  },
});
