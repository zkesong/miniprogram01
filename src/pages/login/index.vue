<template>
      <div>
        <div class="user-select">
          <image @click="showPicker" src="../../static/images/user.png"></image>
          <van-field label="姓名:" :value="pickerText" placeholder="请输入姓名" clearable="true" @input="onNameInput"/>
          <mpButton btnClass="btn" @click="login" type="primary" >进入</mpButton>
        </div>
        <mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueArray="pickerValueArray" 
        :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm"></mpvue-picker>
        <mpToast :value="nameError" content="请输入姓名" type="error" @input="input"/>
      </div>
</template>

<script>
import mpInput from 'mpvue-weui/src/input'
import mpButton from 'mpvue-weui/src/button'
import mpToast from 'mpvue-weui/src/toast'
import mpvuePicker from 'mpvue-picker'

export default {
  components: {
    mpvuePicker, mpButton, mpInput, mpToast
  },
  data () {
    return {
      appId: 1,
      nameError: false,
      mode: 'selector',
      deepLength: 0, // 几级联动
      pickerValueDefault: [], // 初始化值
      pickerValueArray: [], // picker 数组值
      pickerText: '',
      singlePicker: [
        {
          // label: '客户经理1', // 选项文本
          // value: 0 // 选项id  二级联动再添加children数组属性
        }
      ]
    }
  },
  onLoad (options) {
    console.log('管理平台配置参数', options)
    if (options.appId) {
      this.appId = options.appId
    }
    this.$http.get({
      url: 'customManager/list/' + this.appId
    }).then(res => {
      console.log(res)
      for (let i = 0; i < res.data.length; i++) {
        this.singlePicker[i] = {
          label: res.data[i].name,
          value: i
        }
      }
    })
  },
  methods: {
    showPicker () {
      this.pickerValueArray = this.singlePicker
      // this.mode = 'multiLinkageSelector'
      this.mode = 'selector'
      this.deepLength = 1
      this.pickerValueDefault = [0]
      this.$refs.mpvuePicker.show()
      console.log(this)
    },
    onConfirm (e) {
      this.pickerText = e.label
    },
    onNameInput (e) {
      this.pickerText = e.mp.detail
    },
    login () {
      if (this.pickerText === '') {
        this.nameError = true
        console.log(this.nameError)
        return
      }
      wx.navigateTo({
        url: '/pages/index/main?customManager=' + this.pickerText
      })
    },
    input (val) {
      this.nameError = val
    }
  }
}
</script>

<style>
.user-select{
    width: 90%;
    height: 100%;
    box-shadow: 1px 1px 20px 1px #8ece90;
    margin: 20% auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.user-select image{
    border-radius: 50%;
    width: 150px;
    height: 150px;
}
.btn{
    width: 80%;
    margin: 10px auto;
}
</style>