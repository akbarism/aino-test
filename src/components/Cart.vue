<template>
  <div class="side-right">
    <header class="count">
      <div class="d-flex">
        <h5>Cart</h5>
        <div class="square text-light">{{ totalQty }}</div>
      </div>
      <button v-if="selectedMenu.length === 1" @click="checkout">
        Checkout
      </button>
    </header>
    <div class="empty-chart" v-if="selectedMenu.length === 0">
      <img
        src="../assets/undraw_eating_together_tjhx.svg"
        alt="empty cart"
        height="250px"
        width="250px"
      />
      <h6>Your cart is empty, please add some items from the menu</h6>
    </div>
    <div class="idle-chart" v-else>
      <div class="selected">
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
              <input type="text" v-model="item.count" @change="canotNull" />
              <button @click="increment(item)">+</button>
            </section>
          </div>
          <div class="price">
            <p>Rp.{{ item.data.price * item.count }}</p>
          </div>
        </section>
      </div>
      <div class="for-total">
        <h5 class="text-light">Total</h5>
        <h5 class="text-light">Rp. {{ total }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Chart",
  computed: {
    ...mapState(["selectedMenu", "total", "totalQty"])
  },
  methods: {
    increment(data) {
      this.$store.commit("INCREMENT", data);
    },
    decrement(data) {
      this.$store.commit("DECREMENT", data);
    },
    grandtotal(data) {
      this.$store.commit("GET_TOTAL", data);
    },
    canotNull(item) {
      if (item.count < 1) {
        item.count = 1;
      }
    },
    checkout() {
      Swal.fire({
        title: "Order Succes",
        icon: "success",
        showConfirmButton: false,
        timer: 2200
      });
    }
  },
  updated() {
    this.grandtotal();
  }
};
</script>

<style lang="scss" scoped>
.side-right {
  width: 24%;
  height: 566px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.096);
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  margin-top: 70px;
  .count {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    padding: 17px;
    .square {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      background: #e68e74;
      border-radius: 5px;
      margin-left: 5px;
    }
    button {
      border: none;
      padding: 7px;
      border-radius: 5px;
      background: #71bf77;
      color: white;
    }
  }
  .empty-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 300px;
    padding: 10px 20px;
  }
  .selected {
    width: 100%;
    height: 400px;
    padding: 0 20px;
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
  .for-total {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    width: 100%;
    height: 95px;
    background: #43557c;
  }
}
@media only screen and (max-width: 600px) {
  .side-right {
    display: none;
  }
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #43557c;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #324570;
}
</style>
