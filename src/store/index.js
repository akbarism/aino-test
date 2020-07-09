import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import axios from "axios";
export default new Vuex.Store({
  state: {
    allMenu: [],
    allCategory: [],
    selectedMenu: [],
    msg: "",
    token: localStorage.getItem("token") || null,
    mainTotal: [],
    total: 0,
    totalQty: 0,
    tampung: [],
    displayMenu: []
  },
  getters: {
    getUser(state) {
      return state.token !== null;
    }
  },
  mutations: {
    GET_MENU(state, data) {
      state.allMenu = data;
      state.displayMenu = data.data;
    },
    SORT_BY(state, id) {
      state.displayMenu = state.allMenu.data.filter(item => {
        return item.merchant.outlet.category.id == id;
      });
      console.log(state.tampung);
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
    SELECTED_TWO(state, data) {
      const items = state.selectedMenu.find(
        item => item.data.id === data.data.id
      );
      if (!items) {
        document.querySelector(".fix-add").style.display = "none";
        state.selectedMenu.push(data);
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
