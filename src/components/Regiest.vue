<template>
  <div class="bgimg" :span="24">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <h1>注册</h1>
      </div>
      <el-form ref="form" :rules="rules" :model="queryInfo" label-width="80px">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="queryInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="queryInfo.password" show-password></el-input>
        </el-form-item>
       <el-form-item>
         <el-button type="primary" round @click="regiest">注册</el-button>
         </el-form-item>
          <el-link @click="backLogin">返回登录</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var checkUsername = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (!value) return callback(new Error('请输入用户名'))
      if (!regEmail.test(value)) return callback(new Error('请输入有效邮箱'))
    }
    var checkPassword = (rule, value, callback) => {
      const regPasword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,11}$/
      if (!value) return callback(new Error('请输入密码'))
      if (!regPasword.test(value)) return callback(new Error('密码必须由字母和数字组成'))
    }
    return {
      queryInfo: {
        // username: '2504960884@qq.com',
        // password: 'zhuyong123',
        username: '',
        password: '',
        name: '',
        tel: '',
        gender: '男',
        age: '0',
        avatar: '',
        address: ''
      },
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    backLogin () {
      this.$router.push('/login')
    },
    async regiest () {
      const { data: res } = await this.$ajax.get('/regiest', { params: this.queryInfo })
      console.log(res)
    }
  },
  computed: {
    Isshowpassword () {
      // return 'password'
      return 'text'
    }
  }
}
</script>

<style lang="less" scoped>
.bgimg {
  height: 100%;
  width: 100%;
  /* background-color: rgb(201, 232, 247); */
  background: url("../assets//Img/bgImg.png") no-repeat 100% 100%;
}
.avatar_box {
  position: relative;
  left: 50%;
  // top: -15%;
  width: 90px;
  height: 64px;
  border-radius: 50%;
   transform: translate(-50%, 0%);
   h1 {
     margin-bottom: 0;
   }
}
.login_box {
  width: 450px;
  height: 300px;
  position: absolute;
  left: 70%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
}
.el-input {
  width: 300px;
}
.el-button {
  width: 300px;
  margin: auto;
}
.el-link{
  float: right;
}
</style>>
