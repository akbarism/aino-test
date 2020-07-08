import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import axios from "axios";
// import { resolve } from "core-js/fn/promise";
export default new Vuex.Store({
  state: {
    allMenu: [],
    selectedMenu: [],
    allCategory: [],
    selectCategory: [],
    storage: [],
    msg: "",
    token: localStorage.getItem("token") || null,
    mainTotal: [],
    total: 0,
    totalQty: 0
  },
  getters: {
    getUser(state) {
      return state.token !== null;
    }
  },
  mutations: {
    GET_MENU(state, data) {
      state.allMenu = data;
    },
    GET_CATEGORY(state, data) {
      state.allCategory = data;
    },
    SELECTED(state, data) {
      const items = state.selectedMenu.find(
        item => item.data.id === data.data.id
      );
      if (!items) {
        state.selectedMenu.push(data);
      }
    },
    SELECT_CATEGORY(state, data) {
      const items = state.selectCategory.find(
        category => category.id === data.id
      );
      if (!items) {
        state.selectCategory.push(data);
        console.log(data);
      }
    },
    INCREMENT(state, data) {
      let items = state.selectedMenu.find(item => item.id === data.id);
      if (items) {
        items.count += 1;
      }
    },
    DECREMENT(state, data) {
      let items = state.selectedMenu.find(
        item => item.id_menu === data.id_menu
      );
      if (items) {
        if (items.count <= 1) {
          state.selectedMenu = state.selectedMenu.filter(
            item => item !== items
          );
        } else {
          items.count -= 1;
        }
      }
    },
    ERR_MSG(state, error) {
      state.msg = error;
    },
    GET_TOTAL(state) {
      if (state.selectedMenu.length !== 0) {
        const total = [];
        let qty = [];
        for (let i = 0; i < state.selectedMenu.length; i += 1) {
          total.push(
            state.selectedMenu[i].data.price * state.selectedMenu[i].count
          );
          qty.push(state.selectedMenu[i].count);
        }
        state.total = total.reduce((a, b) => a + b);
        state.totalQty = qty.reduce((a, b) => a + b);
      } else if (state.selectedMenu == 0) {
        state.totalQty = 0;
      }
    },
    TEST(state) {
      let a1 = state.allMenu;
      let a2 = state.allCategory;
      const hash = new Map();
      a1.concat(a2).forEach(function(obj) {
        hash.set(obj.id, Object.assign(hash.get(obj.id) || {}, obj));
      });
      state.storage = Array.from(hash.values());
      console.log(state.storage);
    }
  },
  actions: {
    getMenu(context) {
      axios
        .get(
          "https://private-d4ec81-retailmockapp.apiary-mock.com/merchant/2/outlet/1/category/56/product?page=1&limit=10&active=true"
        )
        .then(res => {
          context.commit("GET_MENU", res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategory(context) {
      axios
        .get(
          "https://private-d4ec81-retailmockapp.apiary-mock.com/merchant/2/outlet/1/category"
        )
        .then(res => {
          context.commit("GET_CATEGORY", res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    isLogin(context, data) {
      return new Promise(resolve => {
        axios
          .post(
            "https://private-d4ec81-retailmockapp.apiary-mock.com/auth/login",
            data
          )
          .then(res => {
            localStorage.setItem("id", res.data.data.user.id);
            localStorage.setItem("password", res.data.data.user.password);
            localStorage.setItem("token", res.data.data.access_token.token);
            localStorage.setItem(
              "refreshToken",
              res.data.data.access_token.refresh_token
            );
            resolve(res);
          })
          .catch(error => {
            context.commit("ERR_MSG", error.response.data.err);
          });
      });
    },
    refreshToken(context, data) {
      return new Promise(resolve => {
        axios
          .post(
            "https://private-d4ec81-retailmockapp.apiary-mock.com/auth/token/refresh",
            data
          )
          .then(res => {
            resolve(res);
          });
      });
    }
  },
  modules: {}
});
