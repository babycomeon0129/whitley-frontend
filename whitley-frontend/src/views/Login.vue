<template>
  <div class="container login">
    <h1>
      幸安國小 <br />
      <span>體溫查詢系統登入</span>
    </h1>
    <div class="flex-justify-center">
      <div class="loginform">
        <h2>登入</h2>
        <p>請輸入您的帳戶</p>
        <el-input v-model="account" placeholder="帳號"></el-input>
        <el-input v-model="password" placeholder="密碼" type="password"></el-input>
        <el-button type="primary" @click="sendData">登入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'

export default {
  name: 'Login',
  setup () {
    const account = ref('')
    const password = ref('')

    return {
      account,
      password
    }
  },
  methods: {
    sendData () {
      if (this.account === '' || this.password === '') {
        ElMessage.error('帳號或密碼不可為空')
      } else {
        // 開啟loading遮罩
        ElLoading.service({ fullscreen: true })
        const userData = {
          Account: this.account,
          Password: this.password
        }
        fetch('http://localhost:52150/Whitley/Login', {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData),
          method: 'POST'
        }).then(res => res.json())
          .then(data => {
            ElLoading.service().close()
            switch (data.Rtn_State) {
              case '1':
                sessionStorage.setItem('Account', this.account)
                // 關閉loading遮罩
                this.$router.push('/')
                break
              default:
                this.account = ''
                this.password = ''
                ElMessage.error(data.Rtn_Message)
                break
            }
          })
          .catch(error => {
            ElLoading.service().close()
            console.error('Error:', error)
          })
      }
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
  margin: 2em 0 0.5em 0;
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
  width: 50%;
  @media (max-width: 760px) {
        width: 90%;
    }
  h2 {
    color: #000;
  }
  p {
    margin: 0.5em 0;
  }
  ::v-deep .el-input__inner {
    margin-bottom: 1em;
  }
}
</style>
