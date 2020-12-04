<template>
  <div>
    <!--面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" @keyup.enter.native="search" @input="refresh">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <!-- <el-col :span="3">
          <el-button type="primary" class="addUser" @click="addUser">添加用户</el-button>
        </el-col> -->
      </el-row>
      <el-row class="tableView">
        <el-table :data="usersList" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="头像" width="90">
            <template v-slot="scope">
              <img :src="scope.row.avatar" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="用户名" prop="username" width="168"></el-table-column>
          <el-table-column label="密码" prop="password"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="性别" prop="gender"></el-table-column>
          <el-table-column label="年龄" prop="age"></el-table-column>
          <el-table-column label="电话号码" prop="tel" width="113"></el-table-column>
          <el-table-column label="住址" prop="address" width="126"></el-table-column>
          <el-table-column label="操作" width="180">
            <template v-slot="scope">
              <el-button type="primary" class="edit" @click="editUser(scope.row)">编辑</el-button>
              <!-- <el-button type="danger" @click="remove(scope.row.username)">删除</el-button> -->
              <el-popconfirm title="确认删除该用户？" icon="el-icon-info" icon-color="red" @confirm="remove(scope.row.username)">
                <el-button slot="reference" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
      </el-row>
    </el-card>
    <!-- 修改用户的弹窗 -->
    <el-dialog title="修改用户" :visible.sync="dialogVisible" width="30%">
      <!-- 内容主体 -->
      <div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="头像" label-width="80px">
            <el-upload action="none" :show-file-list="false" :auto-upload="false" :list-type="ListType" :on-change="handleAvatarSuccess" class="avatar_box">
              <img v-if="detail.avatar" :src="detail.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <div class="content">
            <el-form-item label="用户名:">
              <el-input disabled v-model="detail.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:">
              <el-input v-model="detail.password"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input v-model="detail.name"></el-input>
            </el-form-item>
            <el-form-item label="性别:">
              <el-select v-model="detail.gender" @change="gender">
                <el-option value="男"></el-option>
                <el-option value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄:">
              <el-input v-model="detail.age" type="date" @input="SetAge"></el-input>
            </el-form-item>
            <el-form-item label="电话号码:">
              <el-input v-model="detail.tel"></el-input>
            </el-form-item>
            <el-form-item label="住址:">
              <el-input v-model="detail.address"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="putInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      detail: {},
      usersList: [],
      currentPage: 0,
      total: 0,
      dialogVisible: false,
      imageUrl: ''
    }
  },
  created () {
    this.getUsersList()
  },
  computed: {
    ListType () {
      // return this.imageUrl ? 'picture' : 'picture-card'
      return 'picture'
    }
  },
  methods: {
    async getUsersList () {
      const { data: res } = await this.$ajax.get('/managers/userList', { params: this.queryInfo })
      if (!res.ok) return this.$message.error(res.result.msg)
      this.usersList = res.result.data
      this.total = res.result.total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },
    handleCurrentChange (newSize) {
      this.queryInfo.pagenum = newSize
      this.getUsersList()
    },
    search () {
      this.getUsersList()
    },
    // 当输入框内容重新为空的时候刷新列表
    refresh () {
      if (this.queryInfo.query === '') {
        this.getUsersList()
      }
    },
    // 删除用户
    async remove (name) {
      const { data: res } = await this.$ajax.post('/managers/delete', { username: name })
      if (!res.ok) return this.$message.error(res.result.msg)
      this.queryInfo = {
        query: '',
        pagenum: 1,
        pagesize: 5
      }
      this.currentPage = this.queryInfo.pagenum
      this.getUsersList()
      return this.$message.success(res.result.msg)
    },
    editUser (info) {
      this.detail = _.cloneDeep(info)
      // this.detail = info
      this.dialogVisible = true
    },
    handleAvatarSuccess (file) {
      this.getBase64(file.raw, e => {
        this.detail.avatar = e
      }, (err) => {
        console.log(err)
      })
    },
    gender (nengender) {
      this.detail.gender = nengender
    },
    SetAge (newAge) {
      this.detail.age = newAge
    },
    // 更新数据
    async putInfo () {
      const { data: res } = await this.$ajax.put('/managers/update', this.detail)
      res.ok ? this.$message.success(res.result.msg) : this.$message.error(res.result.msg)
      this.getUsersList()
      this.dialogVisible = false
    },
    // 将图片资源转换为base64格式
    getBase64 (imageFile, callback, errorCallback) {
      try {
        const reader = new FileReader()
        reader.readAsDataURL(imageFile)
        reader.onload = function (e) {
          if (callback) {
            const base64Str = e.target.result
            callback(base64Str)
          }
        }
      } catch (error) {
        console.error(error)
        if (errorCallback) {
          errorCallback(error)
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
.addUser {
  margin-left: 15px;
}
.tableView {
  margin: 15px 0;
}
.edit {
  margin-right: 10px;
}
.avatar_box {
  position: relative;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.content {
  margin-top: 48px;
}
.el-form.item {
  margin-bottom: 6px !important;
}
</style>
