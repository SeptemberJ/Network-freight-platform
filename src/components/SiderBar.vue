<template>
  <el-menu :unique-opened="true"
    :default-active="siderIdx"
    @select="changeSideMenu"
    background-color="#65c294"
    text-color="#fff"
    class="el-menu-vertical-demo">
    <el-submenu index="1">
      <template slot="title">
        <i class="iconfont-icons ifc-iconorder" style="color:#fff;"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">订单列表</el-menu-item>
        <el-menu-item index="1-2">订单新增</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <!-- 企业货主才有开票 -->
    <el-menu-item index="4">
      <i class="iconfont-icons ifc-iconticket" style="color:#fff;"></i>
      <span slot="title">开票管理</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="iconfont-icons ifc-iconusers" style="color:#fff;"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title">
        <i class="iconfont-icons ifc-iconuser" style="color:#fff;"></i>
        <span>个人中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">账户信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      siderIdx: state => state.siderIdx
    })
  },
  methods: {
    ...mapActions([
      'changeSiderIdx',
      'changeAddOrderType',
      'changeShowDetail',
      'changeShowMap',
      'changeIfSJOrderSearch'
    ]),
    changeSideMenu (index, keyPath) {
      let levelCount = keyPath.length
      if (levelCount > 1) {
        this.changeSiderIdx(keyPath[levelCount - 1])
      } else {
        this.changeSiderIdx(keyPath[0])
      }
    }
  }
}
</script>
