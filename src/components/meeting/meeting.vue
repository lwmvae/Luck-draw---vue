<template>
  <div class="container">
    <div class="con">
      <div class="left">
        <div class="head clearFix">
          <div class="head-left clearFix">
            <span>抽取奖项:</span>
            <i>三等奖</i>
            <ul>
              <li data-id="1">一等奖</li>
              <li data-id="2">二等奖</li>
              <li data-id="3">三等奖</li>
            </ul>
          </div>
          <div class="head-right">
            <p>名额:<span class="already">0</span>/<span class="total">5</span></p>
          </div>
        </div>
        <div class="list">
          <div class="list-wrapper" ref="listWrapper" :class="{figure:addClass}">
            <img :src="item.headImg" :title="item.name" v-for="item in meeting">
          </div>
          <div class="head-winner" v-show="addClass">
            <img src="../../assets/img/winner.png">
          </div>
        </div>
        <div class="button">
          <button @click="start" v-show="startShow">开始抽奖</button>
          <button @click="end" v-show="!startShow">停止</button>
        </div>
      </div>
      <div class="right">
        <h2>获奖名单</h2>
        <div class="first">
          <div class="title title-left">
            <p>一等奖</p>
            <img src="../../assets/img/aside.png">
          </div>
          <h3>虚位以待……</h3>
          <ul class="win-list">
            <!-- <li><img src="img/1.jpg"><span>张三</span><i>X</i></li> -->
          </ul>
        </div>
        <div class="second">
          <div class="title title-right">
            <p>二等奖</p>
            <img src="../../assets/img/aside.png">
          </div>
          <h3>虚位以待……</h3>
          <ul class="win-list">
          </ul>
        </div>
        <div class="third">
          <div class="title title-left">
            <p>三等奖</p>
            <img src="../../assets/img/aside.png">
          </div>
          <h3>虚位以待……</h3>
          <ul class="win-list">
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMeeting } from 'api/meeting'
let timer, theta, imageIndex = 0
export default {
  data() {
    return {
      meeting: [],
      startShow: true,
      addClass:false
    }
  },
  methods: {
    start() {
      this.startShow = !this.startShow
      this.addClass = !this.addClass
      this.setUpCarousel(400)
      this.setupNavigation()
    },
    end() {
      this.startShow = !this.startShow
      clearInterval(timer)
      

    },
    setUpCarousel(s) {
      const getListWrapper = this.$refs.listWrapper
      const getImg = getListWrapper.children
      const n = getImg.length
      theta = 2 * Math.PI / n
      const apothem = s / (2 * Math.tan(Math.PI / n))
      getListWrapper.style.transformOrigin = '50% 50% ' + -apothem + 'px'
      for (let i = 0; i < n; i++) {
        getImg[i].style.padding = '40px'
        if (i > 0) {
          getImg[i].style.transformOrigin = '50% 50% ' + -apothem + 'px'
          getImg[i].style.transform = 'rotateY(' + i * theta + 'rad)'
        }
      }
    },
    resetCss() {
      const getListWrapper = this.$refs.listWrapper
      const getImg = getListWrapper.children
      getListWrapper.style.transform = 'rotateY(0)'
      getListWrapper.style.transformOrigin = '0 0 0'
      for (let i = 0, n=getImg.length; i < n; i++) {
        getImg[i].style.transform = 'rotateY(0)'
        getImg[i].style.transformOrigin = '0 0 0'
        getImg[i].style.padding = '0'
      }
    },
    setupNavigation() {
      const that = this
      setTimeout(() => {
        timer = setInterval(() => {
          imageIndex++
          that.rotateCarousel(imageIndex, theta)
        }, )
      }, 1300)
    },
    rotateCarousel(imageIndex, theta) {
      this.$refs.listWrapper.style.transform = 'rotateY(' + imageIndex * -theta + 'rad)'
    },
    _getMeeting() {
      getMeeting().then((res) => {
        if (res.code === 0) {
          this.meeting = res.information
        }
      })
    }
  },
  created() {
    this._getMeeting()
  }
}

</script>
<style scoped>
@import 'meeting.css'

</style>
