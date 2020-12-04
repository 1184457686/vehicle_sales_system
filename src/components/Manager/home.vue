<template>
<el-container>
  <!-- 头部 -->
  <el-header>
    <div>
    <img src="../../assets/Img/heima.png" alt="">
    <span>车辆销售后台管理系统</span>
    </div>
    <div>
      <el-button @click="loginOut">退出</el-button>
    </div>
    </el-header>
    <!-- 主题 -->
  <el-container>
    <!-- 侧边菜单栏 -->
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="toggle-button" @click="toggleCollapse">|||</div>
      <!-- 菜单 -->
    <el-menu
      :default-active="index"
      :collapse = 'isCollapse'
      background-color="#545c64"
      text-color="#fff"
      unique-opened
      router
      @select="checkIndex"
      :collapse-transition="false"
      active-text-color="#409EFF">
      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item @change="change" index="/userList">
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="car">
        <template slot="title">
          <i class="iconfont icon-car" ></i>
          <span class="icon">汽车管理</span>
        </template>
        <el-menu-item @change="change" index="/CarList">
          <i class="el-icon-menu"></i>
          <span>汽车列表</span>
        </el-menu-item>
        <el-menu-item @change="change" index="/CarType">
          <i class="el-icon-menu"></i>
          <span>汽车类型</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="order">
        <template slot="title">
          <i class="iconfont icon-car" ></i>
          <span class="icon">订单管理</span>
        </template>
        <el-menu-item @change="change" index="/OrderList">
          <i class="el-icon-menu"></i>
          <span>订单列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <!-- 内容主题 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      index: '/userList'
    }
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    change () {
      // this.$router.push('/test')
      console.log(123)
    },
    loginOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    checkIndex (newindex) {
      this.index = newindex
    }
  }
}
</script>
<style lang='less' scoped>
.el-header {
  background-color: #808A87;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #808A87;
  .el-menu {
    border: none;
  }
}
.el-container {
  height: 100%;
}
.toggle-button{
  background-color: #C0C0C0;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-icon-user-solid{
  margin-right: 5px;
}
.icon{
  margin-left: 10px;
}
</style>
