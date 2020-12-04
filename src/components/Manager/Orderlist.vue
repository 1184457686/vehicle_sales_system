<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-table :data="orderlist" border class="tableStyle">
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column label="订单号" prop="order_Id"> </el-table-column>
          <el-table-column label="汽车编号" prop="car_Id"> </el-table-column>
          <el-table-column label="买家" prop="buyer"> </el-table-column>
          <el-table-column label="购买时间" prop="order_time"> </el-table-column>
          <el-table-column label="审批">
            <template v-slot="scope">
              <i class="iconfont icon-right" v-if="scope.row.order_status ==='0'|| scope.row.order_status === '1' " @click="changeStatus(scope.row, '1')"></i>
              <i class="iconfont icon-False_circle" v-if="scope.row.order_status ==='0'|| scope.row.order_status === '2'" @click="changeStatus(scope.row, '2')"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderlist: [],
      status: 0
    }
  },
  created () {
    this.getOrderlist()
  },
  watch: {},
  methods: {
    async getOrderlist () {
      const { data: res } = await this.$ajax.get('/managers/orderlist')
      if (res.ok) {
        this.orderlist = res.result.data
        this.$message.success(res.result.msg)
      } else {
        this.$message.error(res.result.msg)
      }
      console.log(this.orderlist)
    },
    async changeStatus (info, status) {
      info.order_status = status
      const { data: res } = await this.$ajax.put('/managers/orderlist', info)
      if (res.ok) {
        this.$message.success(res.result.msg)
      }
    }
  }
}
</script>

<style>
.tableStyle {
  margin-top: 20px;
}
.iconfont {
  font-size: 30px !important;
  cursor: pointer;
}
.icon-right {
  color: #1afa29;
  margin-right: 15px;
}
.icon-False_circle {
  color: #d81e06;
}
</style>
