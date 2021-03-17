<template>
  <div class="container login">
    <h1>
      幸安國小 <br />
      <span>體溫查詢系統登入</span>
    </h1>
    <div class="loginform">
      <h2>登入</h2>
      <p>請輸入您的帳戶</p>
      <input type="text" placeholder="帳號" v-model="username">
      <input type="text" placeholder="密碼" v-model="password">
      <button type="button" class="btn btn-login">登入</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'

export default {
  name: 'Login',
  setup () {
    const username = ref('')
    const password = ref('')

    return {
      username,
      password
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/_global";
$default-color: #2d9cdb;
$logintext-color: #73818f;

.login {
  text-align: center;
}

h1 {
  font-size: 64px;
  font-weight: bold;
  color: $default-color;
  letter-spacing: 20px;
  line-height: 70%;
  margin-top: 2em;
  span {
    letter-spacing: 0;
    font-size: 25px;
  }
}

.loginform {
  text-align: left;
  border: 1px solid #c8ced3;
  border-radius: 5px;
  padding: 2em;
  color: $logintext-color;
  h2 {
    color: #000;
  }
  p {
    margin: 0.5em 0;
  }
}

input {
  margin-bottom: 1em;
}

.btn-login {
  background: $default-color;
  color: #fff;
  &:hover {
    background:#1b8eb7;
  }
}
</style>
