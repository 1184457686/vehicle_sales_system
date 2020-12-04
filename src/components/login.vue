<template>
  <div class="bgimg" :span="24">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/Img/heima.png" class="avatar" alt="" no-d />
      </div>
      <el-form ref="form" :model="queryInfo" label-width="80px">
        <el-form-item label="用户名:">
          <el-input v-model="queryInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" @keyup.enter.native="login">
          <el-input type="password" v-model="queryInfo.password" show-password  ></el-input>
          <el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-form-item>
        </el-form-item>
       <el-form-item>
         <el-button type="primary" round @click="login">登录</el-button>
         </el-form-item>
          <el-link @click="regiest">立即注册</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        username: '',
        password: ''
      },
      checked: false
    }
  },
  mounted () {
    this.getCookie()
  },
  methods: {
    async login () {
      const { data: res } = await this.$ajax.get(
        '/login',
        { params: this.queryInfo }
      )
      if (!res.ok) return this.$message.error(res.result.msg)
      this.$message.success(res.result.msg)
      console.log(res)
      if (res.result.role_id === 'user') {
        window.sessionStorage.setItem('token', res.result.token)
        this.$router.push('/home')
      } else {
        window.sessionStorage.setItem('token', res.result.token)
        this.$router.push('/userList')
      }
    },
    regiest () {
      this.$router.push('/regiest')
    },
    getCookie () {
      console.log(document.cookie)
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
  top: -15%;
  width: 90px;
  height: 90px;
  border-radius: 50%;
   transform: translate(-50%, 0%);
  .avatar {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 50%;
    border: 1px solid rgb(255, 255, 255);
    -webkit-user-drag: none;
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
.el-form-item{
  margin-bottom: 7px;
}
.el-input {
  width: 300px;
}
.el-button {
  width: 300px;
  // margin: auto;
}
.el-link{
  float: right;
}
</style>>
