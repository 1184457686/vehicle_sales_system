<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>汽车类型</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" width="80" v-model="searchType">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" class="addType" @click="addType">添加类型</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="typelist" border>
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="car_type" label="类型"> </el-table-column>
          <el-table-column label="创建时间">
            <template v-slot="scope">
              {{scope.row.create_time}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
              <template v-slot="scope">
                   <el-button type="primary" class="edit" @click="edit(scope.row)">编辑</el-button>
              <!-- <el-button type="danger">删除</el-button> -->
              <el-popconfirm title="确认删除该类型？" icon="el-icon-info" icon-color="red" @confirm="remove(scope.row)">
                <el-button slot="reference" type="danger" class="remove">删除</el-button>
              </el-popconfirm>
              </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- 修改和添加的弹窗 -->
  <el-dialog
  @close="close"
  :title="title"
  :visible.sync="dialogVisible"
  width="30%">
   <div>
    <el-form :data='detail'>
      <el-form-item label="类型" label-width="80px" >
        <el-select v-if="detail.car_type" @change="changtype" v-model="detail.car_type">
          <el-option v-for="(item,index) in typelist" :key="index" :value="item.car_type"></el-option>
        </el-select>
    <el-input v-else v-model="type"></el-input>
  </el-form-item>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitType">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
// import _ from 'lodash'
export default {
  data () {
    return {
      typelist: [],
      dialogVisible: false,
      detail: {
        car_type: '',
        create_time: ''
      },
      type: '',
      searchType: ''
    }
  },
  computed: {
    title () {
      return this.detail.car_type ? '修改信息' : '添加类型'
    }
  },
  created () {
    this.getTypeList()
  },
  methods: {
    async getTypeList () {
      const { data: res } = await this.$ajax.get('/managers/type')
      res.ok ? this.$message.success(res.result.msg) : this.$message.error(res.result.msg)
      this.typelist = res.result.Typelist
      console.log(this.typelist)
    },
    edit (info) {
      // console.log(info)
      this.detail = info
      this.dialogVisible = true
    },
    changtype (newType) {
      this.detail.car_type = newType
      // console.log(newType)
    },
    async submitType () {
      if (this.title === '添加类型') {
        const { data: res } = await this.$ajax.post('/managers/type', { car_type: this.type })
        res.ok ? this.$message.success(res.result.msg) : this.$message.error(res.result.msg)
      } else {
        const { data: res } = await this.$ajax.put('/managers/type', this.detail)
        res.ok ? this.$message.success(res.result.msg) : this.$message.error(res.result.msg)
      }
      this.dialogVisible = false
      this.getTypeList()
    },
    addType () {
      this.dialogVisible = true
    },
    close () {
      this.detail = {
        car_type: '',
        create_time: ''
      }
    },
    remove (info) {
      this.$ajax.delete('/managers/type', { data: info })
      this.getTypeList()
    },
    search () {
      this.getTypeList()
    }
  }
}
</script>

<style lang="less" scoped>
.addType{
    margin-left: 14px;
}
.el-table{
    margin-top: 15px;
}
.remove {
  margin-left: 10px !important;
}
</style>
