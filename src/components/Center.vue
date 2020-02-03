<template>
  <div class="Center">
    <!-- 货主 -->
    <el-row>
      <el-col :span="12" class="TextAlignL">
        <div class="MarginT_10">
          <span class="LeftTit">当前账户：</span>
          <span>{{formInfo.fmobile}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">公司名称：</span>
          <span>{{formInfo.company_name}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">联系人员：</span>
          <span>{{formInfo.company_lxr}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">联系电话：</span>
          <span>{{formInfo.company_phone}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">抬头：</span>
          <span>{{formInfo.tai_tou}}</span>
        </div>
      </el-col>
      <el-col :span="12" class="TextAlignL">
        <div class="MarginT_10">
          <span class="LeftTit">账户余额：</span>
          <span>{{formInfo.faccount}} (¥)</span>
          <el-button type = 'success' size="mini" class="MarginL_10" @click="recharge">充值</el-button>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">银行账号：</span>
          <span>{{formInfo.f_bank_no}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">开户行：</span>
          <span>{{formInfo.f_bank}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">开户地址：</span>
          <span>{{formInfo.fbankaddr}}</span>
        </div>
      </el-col>
    </el-row>
    <!-- 充值 -->
    <el-dialog
      title="账户充值"
      :visible.sync="dialogVisibleCharge"
      width="500px"
      :close-on-click-modal='false'
      :before-close="handleClose">
      <div>
        <el-form :model="formCharge" :rules="chargeRules" ref="formCharge" label-width="100px" class="demo-ruleForm">
          <el-form-item label="充值金额" prop="amount">
            <el-input style="width: 200px;float:left;margin-left: 10px;" v-model="formCharge.amount" clearable placeholder="请输入要充值的金额">
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="支付方式" prop="payWay" class="TextAlignL">
            <el-radio-group v-model="formCharge.payWay" style="margin-left:10px;">
              <!-- <el-radio label="微信"></el-radio>
              <el-radio label="支付宝"></el-radio> -->
              <el-radio label="公对公打款"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" v-if="formCharge.payWay == '公对公打款' && userRole != 3" class="TextAlignL" size="mini">
            <span style="padding-left: 10px;font-size: 12px;">( 请使用已绑定的 {{formInfo.f_bank_no}} 账户进行打款 )</span>
            <br/>
            <span style="padding-left: 10px;font-size: 12px;">账号： 121933148810301</span>
            <br/>
            <span style="padding-left: 10px;font-size: 12px;">账户名： 上海鹰速物流有限公司</span>
            <br/>
            <span style="padding-left: 10px;font-size: 12px;">开户行： 招商银行长寿路支行</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCharge = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('formCharge')">确 定</el-button>
      </span>
    </el-dialog>
    <div style="width:100%;height:30px;border-bottom: 1px dashed #ddd;margin:20px 0;"></div>
    <!-- <el-row class="MarginT_40">
      <span class="PaddingR_10">操作时间</span>
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="选择开始日期">
      </el-date-picker>
      --
      <el-date-picker
        v-model="endDate"
        type="date"
        placeholder="选择结束日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-row> -->
    <!-- 交易明细 -->
    <el-row>
      <el-col :span="24"><h3>交易记录明细</h3></el-col>
      <el-col :span="24">
        <el-table
        :data="CapitalFlowData"
        style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="addtime"
            label="交易时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="tradeSn"
            label="交易编号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="fmoney"
            label="交易金额(¥)">
          </el-table-column>
          <el-table-column
            prop="typeTxt"
            label="交易类型">
          </el-table-column>
          <el-table-column
            prop="foriginTxt"
            label="支付方式">
          </el-table-column>
          <el-table-column label="到账情况" width="200" fixed="right">
            <template slot-scope="scope">
              <span style="padding: 0 10px;" v-if="scope.row.fstatus == 1 && scope.row.forigin == 2">到账成功</span>
              <span style="padding: 0 10px;" v-if="scope.row.fstatus == 0 && scope.row.forigin == 2">暂未到账</span>
              <span style="padding: 0 10px;" v-if="scope.row.fstatus == 2">交易关闭</span>
              <el-button
                size="mini"
                type="danger"
                v-if="scope.row.fstatus == 0 && scope.row.forigin == 2" @click="sureConfirm(scope.$index, scope.row)">确认打款
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="CapitalFlowData.length > 0">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Center',
  data () {
    return {
      startDate: '',
      endDate: '',
      formInfo: {
        phone: '',
        companyName: '',
        companyNo: '',
        bank: '',
        bankNo: '',
        taitou: '',
        faccount: '',
        tax: '',
        ID: '',
        tel: '',
        license: '',
        contract: ''
        // role: ''
      },
      dialogVisibleCharge: false,
      formCharge: {
        amount: 2000,
        payWay: '公对公打款'
      },
      chargeRules: {
        amount: [
          { required: true, message: '请输入要充值的金额！', trigger: 'change' }
        ],
        payWay: [
          { required: true, message: '请选择支付方式！', trigger: 'change' }
        ]
      },
      CapitalFlowData: [],
      currentPage: 1,
      pageSize: 10,
      sum: 0
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userInfo.id,
      userRole: state => state.userInfo.userRole,
      checkStatus: state => state.userInfo.checkStatus,
      userFdepsta: state => state.userFdepsta,
      ImgURL_PREFIX: state => state.ImgURL_PREFIX
    })
  },
  created () {
    this.getBasicInfo()
    this.getCapitalFlow()
  },
  methods: {
    ...mapActions([
      'changeUserFdepsta',
      'changeUserBalance'
    ]),
    // 充值
    recharge () {
      if (this.checkStatus === '2') {
        this.$message({
          message: this.$store.state.prohibitTips,
          type: 'warning'
        })
      } else {
        this.dialogVisibleCharge = true
      }
    },
    handleClose (done) {
      this.$confirm('确认取消充值？').then(_ => {
        done()
      }).catch(_ => {})
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.userFdepsta && this.formCharge.amount < 2000) {
            this.$message({
              message: '押金至少2000¥!',
              type: 'warning'
            })
            return false
          } else {
            this.sureRecharge()
          }
        } else {
          this.$message({
            message: '请输入充值金额！',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 充值
    sureRecharge () {
      // let rechargeInfo = {
      //   id: this.userId,
      //   amount: this.formCharge.amount,
      //   type: this.formCharge.payWay === '支付宝' ? 0 : (this.formCharge.payWay === '微信' ? 1 : '2') // 充值方式 0-支付宝 1-微信 2-公对公打款
      // }
      this.send({
        name: '/yqzlController/recharge?id=' + this.userId + '&famount=' + this.formCharge.amount,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '充值成功!',
            type: 'success'
          })
          this.dialogVisibleCharge = false
          this.getBasicInfo()
          this.getCapitalFlow()
        } else {
          this.$message({
            message: res.data.message ? res.data.message + '!' : '充值失败!',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 确认打款
    sureConfirm (idx, row) {
      if (this.checkStatus === '2') {
        this.$message({
          message: this.$store.state.prohibitTips,
          type: 'warning'
        })
      } else {
        this.send({
          name: '/yqzlController/confirm?id=' + row.id,
          method: 'GET',
          data: {
          }
        }).then(res => {
          if (res.data.respCode === '0') {
            this.$message({
              message: '确认成功!',
              type: 'success'
            })
            this.getCapitalFlow()
          } else {
            this.$message({
              message: res.data.message + '，确认失败！',
              type: 'error'
            })
          }
        }).catch((res) => {
          console.log(res)
        })
      }
    },
    // 查看明细
    deleteChargeRecord (index, row) {

    },
    // 获取基本信息
    getBasicInfo () {
      this.send({
        name: '/zRegisterController/' + this.userId,
        method: 'GET',
        data: {
        }
      }).then(res => {
        let Info = res.data.data
        if (res.data.respCode === '0') {
          this.changeUserFdepsta(Info.fdepsta)
          this.changeUserBalance(Info.faccount)
          this.formInfo = Info
          // this.formInfo.account = Info.fmobile
          // this.formInfo.companyName = Info.companyName
          // this.formInfo.companyNo = Info.companyNo
          // this.formInfo.contact = Info.companyLxr
          // this.formInfo.tel = Info.companyPhone
          // this.formInfo.tax = Info.taxNumber
          // this.formInfo.taitou = Info.taiTou
          // this.formInfo.bank = Info.fBank
          // this.formInfo.bankNo = Info.fBankNo
          // this.formInfo.faddress = Info.faddress
          // this.formInfo.faccount = Info.faccount
          // this.formInfo.ID = Info.fidentity
          // 货主 承运商
          if (this.userRole === '1' || this.userRole === '2') {
            this.formInfo.contract = Info.companyContract ? (this.ImgURL_PREFIX + Info.companyContract) : ''
            this.formInfo.license = Info.companyLicence ? (this.ImgURL_PREFIX + Info.companyLicence) : ''
          }
          // 个人
          if (this.userRole === '3') {
            this.formInfo.license = Info.fidentityFront ? (this.ImgURL_PREFIX + Info.fidentityFront) : ''
            this.formInfo.contract = Info.fidentityBack ? (this.ImgURL_PREFIX + Info.fidentityBack) : ''
          }
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    handleCurrentChange () {
      this.getCapitalFlow()
    },
    getCapitalFlow () {
      this.send({
        name: '/zPayAccountRegisterController/list/' + this.currentPage + '/' + this.pageSize + '/' + this.userId + '/{pay_type}',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.sum = res.data.size
          this.CapitalFlowData = res.data.data.map((item) => {
            // 充值方式 0_支付宝 1_微信 2_公对公打款 3_系统结算
            switch (item.forigin) {
              case 0:
                item.foriginTxt = '支付宝'
                break
              case 1:
                item.foriginTxt = '微信'
                break
              case 2:
                item.foriginTxt = '公对公打款'
                break
              case 3:
                item.foriginTxt = '系统结算'
                break
              case 4:
                item.foriginTxt = '余额'
                break
              default:
                item.foriginTxt = '系统结算'
            }
            // 交易类型 0_充值 1_接单扣款 2_押金支付 3_提现 4_订单收入 5_押金退回 6_开票费用
            switch (item.payType) {
              case '0':
                item.typeTxt = '充值'
                break
              case '1':
                item.typeTxt = '接单扣款'
                break
              case '2':
                item.typeTxt = '押金支付'
                break
              case '3':
                item.typeTxt = '提现'
                break
              case '4':
                item.typeTxt = '订单收入'
                break
              case '5':
                item.typeTxt = '押金退回'
                break
              case '6':
                item.typeTxt = '开票费用'
                break
            }
            return item
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.Center{
  background: #fff;
  margin: 20px 20px 60px 20px;
  padding: 20px;
  .LeftTit{
    width: 120px;
    text-align: left;
    color: #909399;
    font-weight: bold;
    display: inline-block;
  }
}
</style>
