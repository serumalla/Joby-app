import Vue from "vue";
import Vuex from "vuex";
//import { resolve } from "core-js/fn/promise";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobs: [],
    displayJobs: [],
    rows: 0,
    showSpinner: false
  },
  mutations: {
    SET_JOBS(state, jobs) {
      state.jobs = jobs;
    },
    SET_DISPLAY_JOBS(state, displayJobs) {
      state.displayJobs = displayJobs;
    },
    SET_ROWS(state, rows) {
      state.rows = rows;
    },
    SET_SPINNER(state, showSpinner){
      state.showSpinner = showSpinner;
    }

  },
  getters: {
    jobs(state) {
      return state.jobs;
    },
    displayJobs(state) {
      return state.displayJobs;
    },
    rows(state) {
      return state.rows;
    },
    showSpinner(state){
      return state.showSpinner;
    }
  },
  actions: {
    async fetchData({commit}) {
      commit("SET_SPINNER", true);
      return new Promise(resolve => {
        setTimeout(async () => {
          const res = await fetch("jobs.json");
          const val = await res.json();
          resolve(val);
          commit("SET_SPINNER", false);
        }, 1000);
      });
    },
    async fetchJobs({ dispatch, commit }) {
      const myJson = await dispatch("fetchData");
      commit("SET_JOBS", myJson);
      commit("SET_ROWS", myJson.length);
      const displayJobs = myJson.slice(0, 3);
      commit("SET_DISPLAY_JOBS", displayJobs);
    },
    async paginate({ commit, state }, { currentPage, perPage }) {
      const start = (currentPage - 1) * perPage;
      const jobs = state.jobs.slice(start, start + 3);
      commit("SET_DISPLAY_JOBS", jobs);
    },
    updatePagenation({commit, dispatch}, {myJson, currentPage, perPage}){
      commit("SET_JOBS", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", {currentPage, perPage});
    },
    async search({dispatch}, {text}){
      const myJson = await this.dispatch("fetchData");
      const values = myJson.filter(val => 
        val.name.toLowerCase().includes(text.toLowerCase())
        );
        dispatch("updatePagenation", {
          myJson: values,
          currentPage: 1,
          perPage: 3
        });
    }
  },
  modules: {}
});
