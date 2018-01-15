<template>
  <div id="add-popup">
    <div id="gray"></div>
    <div class="color-ribbon">
      <img src="../../assets/img/yanhua.png">
    </div>
    <div id="popup" class="popup">
      <div class="pop-head">
        <img :src="info.headImg" width="240" height="240">
        <p v-html="info.name"></p>
      </div>
      <div class="pop-content">
        <img src="../../assets/img/top.png">
      </div>
      <div class="pop-info">
        <img :src="prizeList[index-1].img">
        <p>{{prizeList[index-1].name}}</p>
      </div>
      <div class="pop-button clearFix">
        <div id="sure">
          <a href="javascript:;" @click="sureBtn">确认获奖</a>
        </div>
        <div class="return">
          <a href="javascript:;" @click="returnBtn">重新抽奖</a>
        </div>
      </div>
      <div class="pop-foot"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      prizeList: [
        { "img": "http://localhost:8080/static/img/computer.png", "name": "小米(MI)Air 13.3英寸全金属轻薄笔记本电脑" },
        { "img": "http://localhost:8080/static/img/phone.png", "name": "小米6 双摄拍照游戏手机" },
        { "img": "http://localhost:8080/static/img/cooker.png", "name": "小米智能电饭煲" }
      ]
    }
  },
  methods: {
    sureBtn() {
      this.$emit("closePopBox", 1)
    },
    returnBtn() {
      this.$emit('closePopBox', 0)
    }
  },
  props: {
    info: {},
    index: 0
  }
}

</script>
<style scoped>
@import 'popBox.css'

</style>
