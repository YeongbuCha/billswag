import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: [],
    isSearching: false,
    selected: [],
  },
  getters: {},
  mutations: {
    SET_ALBUMS(state, albums) {
      state.albums = albums;
    },
    SET_SEARCHING(state, isSearching) {
      state.isSearching = isSearching;
    },
    SET_SELECTED(state, album) {
      if (state.selected.length < 4) {
        state.selected = [...state.selected, album];
      }
    },
  },
  actions: {
    searchAlbums({ commit }, searchInput) {
      if (searchInput !== null) {
        axios
          .get(`https://billswag.herokuapp.com/api/${searchInput}/`)
          // API SERVER에서 아래 내용만 넘겨주는 거로 바꿔야함
          .then((res) => {
            commit("SET_ALBUMS", res.data.results.albummatches.album);
          })
          .catch((err) => console.error(err));
      }
    },
    selectAlbum({ commit }, album) {
      commit("SET_SELECTED", album);
    },
    clearAlbums({ commit }) {
      commit("SET_ALBUMS", []);
    },
    toggleIsSearching({ commit }, isSearching) {
      commit("SET_SEARCHING", isSearching);
    },
  },
});
