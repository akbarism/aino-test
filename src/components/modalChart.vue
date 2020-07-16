<template>
  <div>
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
            <h5>Chart</h5>
            <div class="nomine">{{ totalQty }}</div>
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
        <section class="ttl">total : {{ total }}</section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "modalChart",
  computed: {
    ...mapState(["total", "totalQty", "selectedMenu"])
  },
  methods: {
    swipeUp() {
      document.querySelector(".swipe-up").style.height = "400px";
    },
    swipeDown() {
      document.querySelector(".swipe-up").style.height = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
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
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.096);
    border-radius: 10px 10px 0 0;
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
        width: 100%;
        height: 45px;
        padding: 5px;
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
      }
    }
    .isi {
      width: 100%;
      height: 300px;
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
      background: #4557c4;
      padding: 10px;
      font-weight: 600;
      width: 100%;
      height: 50px;
      color: white;
    }
  }
}
</style>
