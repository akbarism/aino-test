<template>
  <div class="cover">
    <img src="../assets/undraw_eating_together_tjhx.svg" alt="cover" />
  </div>
</template>

<script>
export default {
  name: "coverAuth"
};
</script>

<style lang="scss" scoped>
.cover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  background: #bee662;
  img {
    width: 100%;
    height: 100vh;
  }
}
@media only screen and (max-width: 600px) {
  .cover {
    display: none;
  }
}
</style>
