<template>
  <div class="container-fluid">
    <nav>
      <img
        src="../assets/berger.svg"
        width="40px"
        height="40px"
        alt="Burger"
        @click="swipe"
      />
      <button class="refresh">
        <i class="fas fa-sync text-light"></i>
      </button>
    </nav>
    <div class="bellow">
      <section class="side-left">
        <aside class="side-bar swap">
          <section @click="food" class="food bg-1">
            <i class="fas fa-utensils"></i>
          </section>
          <section class="category bg" @click="category">
            <i class="fas fa-list"></i>
          </section>
          <section class="signout" @click="Logout">
            <i class="fas fa-sign-out-alt"></i>
          </section>
        </aside>
        <subCategory />
        <div class="main left">
          <div v-if="displayMenu.length === 0" class="unav">
            <img src="../assets/auth.svg" alt="cover" />
            <h1>Menu not available</h1>
          </div>
          <div class="item" v-else v-for="item in displayMenu" :key="item.id">
            <div class="image">
              <img :src="item.imageUrl" alt="menu" />
            </div>
            <div class="price">
              <p>Rp. {{ item.price }}</p>
            </div>
            <div class="body-menu">
              <h5>{{ item.name }}</h5>
              <div class="info-menu">
                <section class="view">
                  <i class="far fa-eye"></i> {{ item.review }}
                </section>
                <section class="star">
                  <i
                    class="fas fa-star mr-1"
                    v-for="star in item.rating"
                    :key="star.id"
                  ></i>
                </section>
              </div>
              <div class="merchant">
                <i class="fas fa-store"></i> {{ item.merchant.name }}
              </div>
              <div class="add">
                <button class="btn-add" @click="pick(item)">
                  Add to Chart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="just-none" v-if="totalQty === 0"></div>
      <div class="fixed-cart" v-else>
        <div class="content-cart" @click="swipeUp">
          <div class="info">
            <section class="up text-light">
              <p class="m-0">{{ totalQty }} item | {{ total }}</p>
            </section>
          </div>
          <div class="icon-str text-light">
            <i class="fas fa-shopping-cart"></i>
          </div>
        </div>
        <div class="swipe-up">
          <section class="qtw">
            <div class="swipe-down" @click="swipeDown">
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="qty">
              <section class="d-flex">
                <h5>Chart</h5>
                <div class="nomine">{{ totalQty }}</div>
              </section>
              <button @click="checkout">Checkout</button>
            </div>
          </section>
          <section class="isi">
            <section class="item" v-for="item in selectedMenu" :key="item.id">
              <div class="thumb">
                <img
                  :src="item.data.imageUrl"
                  alt="thumbnail menu"
                  width="70px"
                  height="70px"
                />
              </div>
              <div class="counter">
                <section class="name">
                  <p>{{ item.data.name }}</p>
                </section>
                <section class="cntr">
                  <button @click="decrement(item)">-</button>
                  <input type="text" v-model="item.count" />
                  <button @click="increment(item)">+</button>
                </section>
              </div>
              <div class="price">
                <p>Rp.{{ item.data.price * item.count }}</p>
              </div>
            </section>
          </section>
          <section class="ttl">
            <h4>total :</h4>
            <h4>Rp. {{ total }}</h4>
          </section>
        </div>
      </div>
      <Cart />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import subCategory from "../components/subCategory.vue";
import Cart from "../components/Cart.vue";
import Swal from "sweetalert2";

export default {
  name: "Home",
  computed: {
    ...mapState(["displayMenu", "total", "totalQty", "selectedMenu", "storage"])
  },
  components: {
    subCategory,
    Cart
  },
  mounted() {
    this.$store.dispatch("getMenu");
    this.$store.dispatch("getCategory");
  },
  methods: {
    pick(data) {
      this.$store.commit("SELECTED", { data, count: 1 });
    },
    food() {
      document.querySelector(".category-menu").classList.add("none");
      document.querySelector(".category").classList.add("bg");
      document.querySelector(".food").classList.add("bg-1");
    },
    category() {
      document.querySelector(".category-menu").classList.remove("none");
      document.querySelector(".category").classList.remove("bg");
      document.querySelector(".food").classList.remove("bg-1");
    },
    swipe() {
      document.querySelector(".side-bar").classList.toggle("swap");
      document.querySelector(".main").classList.toggle("left");
      document.querySelector(".category-menu").classList.add("none");
      document.querySelector(".category").classList.add("bg");
      document.querySelector(".food").classList.add("bg-1");
    },
    MENU() {
      this.$store.commit("GET_MENU");
    },
    Logout() {
      delete localStorage.id;
      delete localStorage.password;
      delete localStorage.token;
      delete localStorage.refreshToken;
      this.$router.go("/login");
    },
    swipeUp() {
      document.querySelector(".swipe-up").style.height = "500px";
    },
    swipeDown() {
      document.querySelector(".swipe-up").style.height = 0;
    },
    increment(data) {
      this.$store.commit("INCREMENT", data);
    },
    decrement(data) {
      this.$store.commit("DECREMENT", data);
    },
    checkout() {
      Swal.fire({
        title: "Order Succes",
        icon: "success",
        showConfirmButton: false,
        timer: 2200
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container-fluid {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 0;
  nav {
    position: fixed;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    background: #f2f2f2;
    padding: 10px;
    img {
      margin-left: 10px;
      cursor: pointer;
    }
    .refresh {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      width: 50px;
      height: 50px;
      background: #71bf77;
      border-radius: 5px;
      border: none;
      cursor: pointer;
    }
  }
  .bellow {
    display: flex;
    width: 100%;
    .side-left {
      display: flex;
      margin-top: 70px;
      width: 76%;
      .side-bar {
        position: fixed;
        width: 100px;
        height: 566px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
        background: white;
        transition: 0.5s all;
        .food {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 80px;
          background: #ffffff;
          font-size: 40px;
          color: black;
          cursor: pointer;
        }
        .bg-1 {
          background: #71bf77;
          color: white;
        }
        .category {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 80px;
          background: #43557c;
          color: #ffffff;
          font-size: 40px;
          cursor: pointer;
        }
        .bg {
          color: black;
          background: white;
        }
        .signout {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 80px;
          background: white;
          color: black;
          font-size: 40px;
        }
      }
      .swap {
        left: -100px;
        transition: 5s all;
      }
      .none {
        display: none;
        background: #43557c;
      }
      .unav {
        width: 600px;
        height: 600px;
        margin-left: 350px;
        img {
          width: 400px;
          height: 400px;
        }
      }
      .main {
        flex-wrap: wrap;
        display: flex;
        padding: 10px;
        margin-left: 100px;
        .item {
          display: flex;
          flex-direction: column;
          width: 280px;
          height: 350px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.116);
          margin: 10px;
          border-radius: 20px;
          .image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 280px;
            height: 200px;
            padding: 10px;
            background: #f8f8f8;
            border-radius: 20px;
            margin-bottom: 10px;
            img {
              width: 280px;
              height: 200px;
            }
          }
          .price {
            display: flex;
            justify-content: flex-end;
            margin-top: -60px;
            p {
              padding: 5px 10px;
              background: #71bf77;
              color: #ffffff;
            }
          }
          .body-menu {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 5px 10px;
            .info-menu {
              display: flex;
              width: 100%;
              .view {
                width: 55%;
                font-size: 15px;
                color: #c5c5c5;
              }
              .star {
                width: 45%;
                font-size: 15px;
                color: gold;
              }
            }
            .merchant {
              margin-top: 5px;
              width: 100%;
            }
            .add {
              display: flex;
              width: 100%;
              .btn-add {
                width: 100%;
                border: none;
                background: #71bf77;
                padding: 10px 0;
                border-radius: 8px;
                color: #ffffff;
              }
            }
          }
        }
      }
      .left {
        margin-left: 0;
      }
    }
    .fixed-cart {
      display: none;
    }
  }
}
@media only screen and (max-width: 600px) {
  .container-fluid {
    .bellow {
      .side-left {
        width: 100%;
        .side-bar {
          width: 70px;
          height: 100%;
          .food {
            font-size: 25px;
          }
          .category {
            font-size: 25px;
          }
          .signout {
            font-size: 25px;
          }
        }
        .main {
          margin-left: 50px;
          width: 100%;
          .unav {
            width: 100%;
            height: 100%;
            margin-left: 0;
            padding: 15px;
            img {
              width: 200px;
              height: 200px;
            }
            h1 {
              font-size: 25px;
            }
          }
          .item {
            width: 150px;
            height: 250px;
            .image {
              width: 150px;
              height: 150px;
              img {
                width: 150px;
                height: 150px;
              }
            }
            .body-menu {
              h5 {
                font-size: 15px;
              }
              .info-menu {
                .view {
                  font-size: 8px;
                  width: 75%;
                }
                .star {
                  font-size: 5px;
                }
              }
              .merchant {
                font-size: 7px;
              }
              .add {
                flex-direction: column;
                .btn-add {
                  height: 35px;
                  font-size: 10px;
                }
              }
            }
          }
        }
        .left {
          margin-left: 0;
        }
      }
      .fixed-cart {
        position: fixed;
        bottom: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 30px;
        width: 100%;
        padding: 0 10px;
        .content-cart {
          width: 100%;
          display: flex;
          background: #43557c;
          border-radius: 5px;
          padding: 0 5px;
          .info {
            width: 80%;
            .up {
              width: 100%;
              padding: 10px 20px;
              margin-top: 5px;
            }
          }
          .icon-str {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20%;
            height: 60px;
          }
        }
        .swipe-up {
          position: fixed;
          bottom: 10px;
          width: 100%;
          height: 0;
          z-index: 3;
          transition: 0.5s;
          background: white;
          box-shadow: 0px 0px 8px -2px rgba(0, 0, 0, 1);
          border-radius: 20px 20px 0 0;
          .qtw {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 70px;
            .swipe-down {
              width: 100%;
              height: 25px;
              text-align: center;
            }
            .qty {
              display: flex;
              justify-content: space-between;
              width: 100%;
              height: 45px;
              padding: 5px 15px;
              .nomine {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 3px;
                width: 30px;
                height: 30px;
                border-radius: 5px;
                background: #e68e74;
                color: white;
              }
              button {
                border: none;
                padding: 7px;
                border-radius: 5px;
                background: #71bf77;
                color: white;
              }
            }
          }
          .isi {
            width: 100%;
            height: 380px;
            padding: 10px;
            overflow-y: scroll;
            .item {
              width: 100%;
              height: 90px;
              display: flex;
              background: white;
              border-bottom: 2px solid #f6f6f6;
              align-items: center;
              .thumb {
                width: 70px;
                height: 70px;
              }
              .counter {
                width: 130px;
                height: 70px;
                .name {
                  height: 30px;
                  width: 100%;
                  padding: 5px;
                  font-weight: 600;
                }
                .cntr {
                  display: flex;
                  height: 35px;
                  width: 100%;
                  padding: 0 3px;
                  button {
                    width: 35px;
                    border: 1px solid #f6f6f6;
                    font-weight: 600;
                  }
                  input {
                    width: 35px;
                    border: 1px solid #f6f6f6;
                    text-align: center;
                    font-weight: 600;
                  }
                }
              }
              .price {
                height: 70px;
                p {
                  margin-top: 45px;
                  font-weight: 600;
                }
              }
            }
          }
          .ttl {
            display: flex;
            justify-content: space-between;
            background: #43557c;
            padding: 10px;
            font-weight: 600;
            width: 100%;
            height: 60px;
            color: white;
          }
        }
      }
    }
  }
}
</style>
