<template>
  <van-panel :title="panelTitle">
    <van-cell-group>
      <van-field label="姓名:" placeholder="请输入姓名" clearable="true" @input="onNameInput"/>
      <van-field maxlength="11" required="true" type="number" label="手机长号:" clearable="true" placeholder="请输入移动长号" :error-message="phoneNumberErrorMsg" @input="onLongNumberInput"/>
      <van-field maxlength="6" required="true" type="number" label="手机短号:" clearable="true" placeholder="请输入移动短号" @input="onShortNumberInput"/>
    </van-cell-group>
    <van-button type="primary" size="large" @click="onCommitInfo">提交</van-button>
    <mpToast :value="parentVal1" content="提交成功" type="success" @input="subValChange1"/>
    <mpToast :value="parentVal2" content="提交失败" type="error" @input="subValChange2"/>
    <mpToast :value="parentVal3" :content="mobileErrorMsg" type="error" @input="subValChange3"/>
    <mpLoading :showLoading="showLoading" loadingText="提交中"/>
  </van-panel>
</template>
<script>
import mpToast from 'mpvue-weui/src/toast'
import mpLoading from 'mpvue-weui/src/loading'

export default {
  data () {
    return {
      'panelTitle': '',
      'phoneNumberErrorMsg': '',
      'mobileErrorMsg': '',
      'name': '',
      'longNumber': '',
      'shortNumber': '',
      'customManager': '',
      'parentVal1': false,
      'parentVal2': false,
      'parentVal3': false,
      'showLoading': false
    }
  },
  components: {
    mpToast,
    mpLoading
  },
  onLoad: function (options) {
    console.log(options.customManager)
    this.customManager = options.customManager
    this.panelTitle = '您好：' + this.customManager
  },
  methods: {
    onNameInput: function (e) {
      this.name = e.mp.detail
    },
    onLongNumberInput: function (e) {
      this.longNumber = e.mp.detail
    },
    onShortNumberInput: function (e) {
      this.shortNumber = e.mp.detail
    },
    // 子组件val值改变传递父组件
    subValChange1: function (val) {
      this.parentVal1 = val
    },
    // 子组件val值改变传递父组件
    subValChange2: function (val) {
      this.parentVal2 = val
    },
    // 子组件val值改变传递父组件
    subValChange3: function (val) {
      this.parentVal3 = val
    },
    onCommitInfo: function () {
      // 校验手机号码
      var reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      var vNumReg = /^[5|6][0-9]{5}/
      if (this.longNumber === '') {
        this.mobileErrorMsg = '手机号码不能为空'
        // 父组件值改变传递子组件
        console.log(this.parentVal3)
        this.parentVal3 = true
        return
      } else if (!reg.test(this.longNumber) || !vNumReg.test(this.shortNumber)) {
        this.mobileErrorMsg = !reg.test(this.longNumber) ? '长号格式不正确' : '短号格式不正确'
        this.parentVal3 = true
        return
      }
      this.showLoading = true
      var that = this
      this.$http.post({
        url: 'phonenumber/save',
        data: {
          'name': that.name,
          'longNumber': that.longNumber,
          'shortNumber': that.shortNumber,
          'customManager': that.customManager
        }
      }).then(data => {
        this.showLoading = false
        console.log(data)
        if (data.code === 201) {
          this.phoneNumberErrorMsg = '长号已登记'
          return
        }
        if (data.code === 202) {
          this.phoneNumberErrorMsg = '短号已登记'
          return
        }
        if (data.code === 200) {
          this.phoneNumberErrorMsg = ''
          console.log('保存成功', data)
          this.parentVal1 = true
        }
      }).catch(err => {
        this.phoneNumberErrorMsg = ''
        this.showLoading = false
        console.log('catch', err)
        this.parentVal2 = true
      })
    }
  }
}
</script>
<style>
</style>
