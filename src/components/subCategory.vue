<template>
  <div class="category-menu none">
    <h5 class="text-light">Category</h5>
    <section
      class="sub-category"
      v-for="category in allCategory"
      :key="category.id"
      @click="cate(category.id)"
    >
      <img :src="category.imageUrl" alt="icon" />
      <h5>{{ category.name }}</h5>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "subCategory",
  data() {
    return {};
  },
  computed: {
    ...mapState(["allCategory"])
  },
  methods: {
    cate(id) {
      this.$store.commit("SORT_BY", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.category-menu {
  display: flex;
  position: fixed;
  margin-left: 90px;
  flex-direction: column;
  width: 200px;
  background: #43557c;
  padding: 20px;
  text-align: center;
  height: 350px;
  .sub-category {
    width: 100%;
    height: 80px;
    padding: 10px;
    background: white;
    margin-bottom: 15px;
    cursor: pointer;
  }
  .sub-category:active {
    transform: scale(0.9);
  }
}
@media only screen and (max-width: 600px) {
  .category-menu {
    margin-left: 70px;
  }
}
</style>
