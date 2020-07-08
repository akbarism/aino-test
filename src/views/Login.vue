<template>
  <div class="container-fluid">
    <section class="form-login">
      <header class="head">
        <section class="title"><h1>Point Of Sale</h1></section>
        <section class="tag">
          <h1>Login</h1>
          Welcome, Please Login
          <br />to your account
        </section>
      </header>
      <form @submit="login">
        <div class="formgroup">
          <label for="exampleInputEmail1" class="label">Username</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div class="formgroup">
          <label for="exampleInputPassword1" class="label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <button type="submit" class="btn-login">Login</button>
      </form>
    </section>
    <coverAuth />
  </div>
</template>

<script>
import coverAuth from "../components/coverAuth.vue";

export default {
  name: "Login",
  components: {
    coverAuth
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.$store
        .dispatch("isLogin", { email: this.email, password: this.password })
        .then(res => {
          res;
          console.log(res);
          this.$router.go("/home");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container-fluid {
  width: 100%;
  display: flex;
  background: salmon;
  padding: 0;
  display: flex;
  .form-login {
    width: 30%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    padding: 5px 30px;
    .head {
      width: 100%;
      height: 300px;
      .title {
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
          font-family: "Pacifico", cursive;
          color: #71bf77;
        }
      }
      .tag {
        height: 150px;
        h1 {
          font-weight: 800;
        }
      }
    }
    .label {
      position: absolute;
      margin-top: 3px;
      margin-left: 6px;
      color: #d0cccc;
    }
    .form-control {
      height: 55px;
      padding-top: 20px;
      padding-left: 15px;
      background: white;
      border: 1px solid #e0e0e0;
      box-sizing: border-box;
      box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.2);
    }
    .btn-login {
      padding: 10px 35px;
      border: none;
      border-radius: 5px;
      background: #71bf77;
      margin-top: 10px;
      color: white;
    }
  }
}
@media only screen and (max-width: 600px) {
  .container-fluid {
    width: 100%;
    .form-login {
      width: 100%;
    }
  }
}
</style>
