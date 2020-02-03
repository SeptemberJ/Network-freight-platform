<template>
  <div class='Login'>
    <img class='Logo' src='../../static/images/Partner_10.png'>
    <p class='ColorYellow FontSize_10'>登陆我的无车承运账户</p>
    <div class='MainBox'>
      <div class='InnerBox'>
        <el-row>
          <el-col :span='24' class='MarginTB_20'>
            <el-input style='width:250px;' v-model='phone' placeholder='请输入您的账户名' clearable @keyup.enter.native='enterEvent'></el-input>
          </el-col>
          <el-col :span='24' class=''>
            <el-input style='width:250px;' type='password' v-model='password' placeholder='请输入您的密码' clearable @keyup.enter.native='enterEvent'></el-input>
          </el-col>
          <el-col :span='24' class='MarginTB_20 TextAlignC'>
            <el-button class='loginBt CursorPointer' @click='Login' :loading='btLoading'>登陆</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {setCookie} from '../util/utils'
export default {
  name: 'Login',
  data () {
    return {
      btLoading: false,
      phone: '15722500690', // 15190937955 15722500690
      password: '111111' // 111111
    }
  },
  created () {
    // this.changeLocationIdx(0)
  },
  methods: {
    ...mapActions([
      'updateUserInfo'
      // 'changeLocationIdx',
      // 'changeUserId',
      // 'changeUserFmobile',
      // 'changeUserAccount',
      // 'changeUserRole',
      // 'changeUserTicketInfo',
      // 'updatePartyB',
      // 'changeUserCode',
      // 'changeMainUserCode',
      // 'changeUserCheckStatus',
      // 'changeUserBalance',
      // 'changeUserFdepsta',
      // // 'changeUserFsettle',
      // 'changeUserFaccountid',
      // 'changeUserFrate',
      // 'changeSiderIdx',
      // 'changeIfSJOrderSearch',
      // 'changeShowDetail'
    ]),
    // 前往注册
    ToSign () {
      this.$router.push({name: 'Sign'})
      this.changeLocationIdx(1)
    },
    // 前往密码修改
    ToModityPsd () {
      this.$router.push({name: 'Password'})
      this.changeLocationIdx(4)
    },
    enterEvent () {
      let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode
      if (keyCode === 13) {
        this.Login()
      }
    },
    // 登陆
    Login () {
      if (this.phone.trim() === '') {
        this.$message({
          message: '请输入账户名！',
          type: 'warning'
        })
        return false
      }
      if (this.password.trim() === '') {
        this.$message({
          message: '请输入密码！',
          type: 'warning'
        })
        return false
      }
      this.btLoading = true
      this.send({
        name: '/tokens/registerLogin?fmobile=' + this.phone + '&password=' + this.password,
        method: 'POST',
        data: {
        }
      }).then(res => {
        // console.log(res.data)
        let userInfo = res.data.data
        switch (res.data.respCode) {
          case '0':
            setCookie('btwccy_cookie', userInfo.token, 6)
            this.updateUserInfo(userInfo.zRegister)
            // this.changeUserCheckStatus(userInfo.zRegister.checkStatus)
            // this.changeUserId(userInfo.zRegister.id)
            // this.changeUserCode(userInfo.zRegister.usercode)
            // this.changeMainUserCode(userInfo.zRegister.mainUsercode)
            // this.changeUserFmobile(userInfo.zRegister.fmobile)
            // this.changeUserFrate(userInfo.zRegister.frate ? userInfo.zRegister.frate : 0)
            // this.changeLocationIdx(2)
            // if (userInfo.zRegister.taiTou && userInfo.zRegister.taxNumber && userInfo.zRegister.fBankNo) {
            //   this.changeUserTicketInfo(true)
            // } else {
            //   this.changeUserTicketInfo(false)
            // }
            this.$message({
              message: '欢迎登陆鹰速货主平台！',
              type: 'success'
            })
            this.$router.push({name: 'Home'})
            this.btLoading = false
            break
          default:
            this.$message({
              message: res.data.message,
              type: 'warning'
            })
            this.btLoading = false
        }
      }).catch((res) => {
        console.log(res)
        this.btLoading = false
      })
    }
  }
}
</script>

<style lang='less' scoped>
.Login{
  width: 100%;
  overflow: hidden;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  .Logo{
    width: 280px;
    height: 132px;
  }
  .MainBox{
    height: 300px;
    position: relative;
    margin: 2rem auto;
    box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -webkit-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -moz-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    border-radius: 40%;
    .InnerBox{
      height: 300px;
      width: 120%;
      padding: 20px;
      background: #fff;
      margin-left: -10%;
      position: relative;
      .loginBt{
        width: 250px;
        height: 40px;
        margin: 0 auto;
        text-align: center;
        background: #e0b32b;
        color: #fff;
        border-radius: 30px;
      }
      .operation{
        width: 200px;
        margin: 0 auto;
        span{
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
