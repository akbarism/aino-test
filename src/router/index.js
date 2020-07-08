import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from "../store/index.js";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresVisitor: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  store
});

let isRefreshing = false;
let subscribers = [];

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    const {
      config,
      response: { status, data }
    } = err;

    const originalRequest = config;

    if (data.message === "Missing token") {
      router.push({ name: "login" });
      return Promise.reject(false);
    }

    if (originalRequest.url.includes("login_check")) {
      return Promise.reject(err);
    }

    if (status === 401 && data.message === "Expired token") {
      if (!isRefreshing) {
        isRefreshing = true;
        store
          .dispatch("REFRESH_TOKEN")
          .then(({ status }) => {
            if (status === 200 || status == 204) {
              isRefreshing = false;
            }
            subscribers = [];
          })
          .catch(error => {
            console.error(error);
          });
      }

      const requestSubscribers = new Promise(resolve => {
        subscribeTokenRefresh(() => {
          resolve(axios(originalRequest));
        });
      });

      onRefreshed();

      return requestSubscribers;
    }
  }
);

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed() {
  subscribers.map(cb => cb());
}

subscribers = [];

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getUser) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.getUser) {
      next({
        path: "/home"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
