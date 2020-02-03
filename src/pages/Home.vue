<template>
  <div class="Home">
    <el-container id="HomeMain" style=" border: 0px solid #eee">
      <el-aside width="150px" style="background-color: rgb(101, 194, 148);">
        <SiderBar/>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px；">
          <div style="color:#fff;cursor:pointer;" @click="LogOut">
            <span>退出 </span>
            <span><i class="iconfont-icons ifc-iconlogout-" style="color:#fff;"></i></span>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
            <div class="moduleTit">
              <el-breadcrumb separator="/">
                <!-- 订单管理导航 -->
                <el-breadcrumb-item v-if="siderIdx == '1' || siderIdx == '1-1' || siderIdx == '1-2' || siderIdx == '1-3' || siderIdx == '1-4' || siderIdx == '1-6' || siderIdx == '1-5'">订单管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-1'"><span @click="backOrderList" class="CursorPointer">订单列表</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-1' && showDetail"><span>订单详情</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-2'"><span>订单新增</span></el-breadcrumb-item>
                <!-- 开票管理导航 -->
                <el-breadcrumb-item v-if="siderIdx == '4'">开票管理</el-breadcrumb-item>
                <!-- 用户管理导航 -->
                <el-breadcrumb-item v-if="siderIdx == '2'">用户管理</el-breadcrumb-item>
                <!-- 个人中心导航 -->
                <el-breadcrumb-item v-if="siderIdx == '3' || siderIdx == '3-1' || siderIdx == '3-2'">个人中心</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '3-1'">账户信息</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="HomeMainContent">
              <Center v-if="siderIdx == '3-1'"/>
            </div>
          <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="80%">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="即时配送">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="活动性质">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                  <el-radio label="线上品牌商赞助"></el-radio>
                  <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {clearCookie} from '../util/utils'
import SiderBar from '../components/SiderBar.vue'
import Center from '../components/Center.vue'
export default {
  name: 'Home',
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(7).fill(item),
      dialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  computed: {
    ...mapState({
      siderIdx: state => state.siderIdx,
      showDetail: state => state.showDetail
    })
  },
  components: {
    SiderBar,
    Center
  },
  created () {
    setTimeout(() => {
      let height = document.documentElement.clientHeight
      document.getElementById('HomeMain').style.height = height + 'px'
    }, 0)
  },
  methods: {
    ...mapActions([
      'changeShowDetail'
    ]),
    LogOut () {
      this.$confirm('确定退出当前账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({name: 'Login'})
        this.changeSiderIdx('1-1')
        clearCookie('btwccy_cookie')
      }).catch(() => {
      })
    },
    // 返回订单列表
    backOrderList () {
      this.changeShowDetail(false)
      // this.changeShowMap(false)
      // this.changeIfSJOrderSearch(false)
    }
  }
}
</script>
<style>
  .el-header {
    background-color: rgb(101, 194, 148);
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #519B76;
  }
  .el-main{
    padding: 0 !important;
    background: #f0f2f5;
  }
  .el-breadcrumb{
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
  }
  .moduleTit{
    width: 100%;
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
  }
  .HomeMainContent{
    padding: 20px;
  }
</style>
