<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>汽车管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8" >
          <el-input placeholder="请输入内容" v-model="pagination.query">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="addCar">添加车辆</el-button>
        </el-col>
      </el-row>
        <el-table :data="carlist" border>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column  label="车辆图片">
            <template v-slot="scope">
             <img :src="scope.row.car_img" alt=""  class="picture">
            </template>
          </el-table-column>
          <el-table-column prop="car_name" label="车名"></el-table-column>
          <el-table-column prop="car_descrip" label="描述"></el-table-column>
          <el-table-column prop="car_brith" label="生产日期"></el-table-column>
          <el-table-column prop="car_type" label="类型"></el-table-column>
          <el-table-column prop="car_price" label="价格(元)"></el-table-column>
          <el-table-column label="操作" width="180px">
              <template v-slot="scope">
                   <el-button type="primary" class="edit" @click="editBtn(scope.row)" >编辑</el-button>
              <!-- <el-button type="danger">删除</el-button> -->
              <el-popconfirm title="确认删除该类型？" icon="el-icon-info" icon-color="red" @confirm="remove(scope.row)">
                <el-button slot="reference" type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        </el-row>
    </el-card>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  @close="close">
  <div>
    <!-- rules="addRules" -->
    <el-form label-width="80px" ref="dialogRef" >
      <el-form-item label="图片"  >
        <el-upload action="none" :show-file-list="false" :auto-upload="false" list-type="picture" :on-change="handleAvatarSuccess" class="avatar_box">
              <img v-if="detail.car_img" :src="detail.car_img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      </el-form-item >
        <div class="content">
      <el-form-item label="车名">
        <el-input v-model="detail.car_name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="detail.car_type">
          <el-option v-for="(item,index) in typelist" :key="index" :value="item.car_type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="detail.car_descrip"></el-input>
      </el-form-item>
      <el-form-item label="生产日期">
        <el-input type="date" v-model="detail.car_brith"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input type="number" step="1000" v-model="detail.car_price"></el-input>
      </el-form-item>
        </div>
    </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carlist: [],
      dialogVisible: false,
      typelist: [],
      detail: {
        car_img: '',
        car_name: '',
        car_type: '',
        car_descrip: '',
        car_price: '',
        car_brith: ''
      },
      pagination: {
        query: '',
        pagesize: 5,
        pagenum: 1
      },
      currentPage: 0,
      total: 0,
      edit: false
    }
  },
  created () {
    // 获取车辆信息
    this.getCarlist()
  },
  methods: {
    // 获取所有车辆
    async getCarlist () {
      const { data: res } = await this.$ajax.get('/managers/carlist', { params: this.pagination })
      this.carlist = res.result.data
      this.total = res.result.total
    },
    // 获取类型列表
    async getTypeList () {
      const { data: res } = await this.$ajax.get('/managers/type')
      if (!res.ok) {
        this.$message.error(res.result.msg)
      }
      this.typelist = res.result.Typelist
    },
    addCar () {
      this.getTypeList()
      this.dialogVisible = true
    },
    handleAvatarSuccess (file) {
      this.getBase64(file.raw, e => {
        this.detail.car_img = e
      }, (err) => {
        console.log(err)
      })
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
    },
    // dialog关闭数数据清空
    close () {
      this.detail = {
        car_img: '',
        car_name: '',
        car_type: '',
        car_descrip: '',
        car_price: '',
        car_brith: ''
      }
    },
    async submitForm () {
      console.log(123)
      if (this.edit) {
        var { data: res } = await this.$ajax.put('/managers/carlist', this.detail)
        console.log(789)
      } else {
        var { data: res } = await this.$ajax.post('/managers/carlist', this.detail)
        console.log(456)
      }
      if (!res.ok) {
        this.$message.error(res.result.msg)
      } else {
        this.$message.success(res.result.msg)
      }
      this.dialogVisible = false
      this.getCarlist()
    },
    async remove (info) {
      const { data: res } = await this.$ajax.delete('/managers/carlist', { data: info })
      res.ok ? this.$message.success(res.result.msg) : this.$message.error(res.result.msg)
      this.getCarlist()
    },
    handleSizeChange (newSize) {
      this.pagination.pagesize = newSize
      this.getCarlist()
    },
    handleCurrentChange (newNum) {
      this.pagination.pagenum = newNum
      this.getCarlist()
    },
    editBtn (info) {
      this.detail = info
      this.edit = true
      this.dialogVisible = true
    },
    search () {
      this.getCarlist()
    }
  }
}
</script>

<style lang="less" scoped>
.el-col{
  margin-right: 10px;
}
.el-table{
  margin-top: 15px;
}
.content {
  margin-top: 20px;
}
.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.picture{
  width: 50px !important;
}
.edit {
  margin-right:10px ;
}
</style>
