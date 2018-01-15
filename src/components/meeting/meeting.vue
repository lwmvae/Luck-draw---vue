<template>
  <div class="container">
    <div class="con">
      <div class="left">
        <div class="head clearFix">
          <div class="head-left clearFix">
            <span>抽取奖项:</span>
            <i :data-id="prize[index-1].id" ref="getIndex">{{prize[index-1].name}}</i>
            <ul @click="choice">
              <li v-for="item in prize" :data-id="item.id">{{item.name}}</li>
            </ul>
          </div>
          <div class="head-right">
            <p>名额:<span class="already" ref="already">{{priseInfo[index-1].length}}</span>/<span class="total" ref="total">{{prize[index-1].num}}</span></p>
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
          <h3 v-show="!priseInfo[0].length">虚位以待……</h3>
          <ul class="win-list" v-show="priseInfo[0].length">
            <li v-for="item in priseInfo[0]"><img :src="item.headImg"><span>{{item.name}}</span><i>X</i></li>
          </ul>
        </div>
        <div class="second">
          <div class="title title-right">
            <p>二等奖</p>
            <img src="../../assets/img/aside.png">
          </div>
          <h3 v-show="!priseInfo[1].length">虚位以待……</h3>
          <ul class="win-list" v-show="priseInfo[1].length">
            <li v-for="item in priseInfo[1]"><img :src="item.headImg"><span>{{item.name}}</span><i>X</i></li>
          </ul>
        </div>
        <div class="third">
          <div class="title title-left">
            <p>三等奖</p>
            <img src="../../assets/img/aside.png">
          </div>
          <h3 v-show="!priseInfo[2].length">虚位以待……</h3>
          <ul class="win-list" v-show="priseInfo[2].length">
            <li v-for="item in priseInfo[2]"><img :src="item.headImg"><span>{{item.name}}</span><i>X</i></li>
          </ul>
        </div>
      </div>
    </div>
    <pop-box v-show="popShow" :info="info" :index="index" @closePopBox="close"></pop-box>
  </div>
</template>
<script>
import { getMeeting } from 'api/meeting'
import popBox from 'components/popBox/popBox'
let timer, theta, imageIndex = 0
export default {
  data() {
    return {
      meeting: [],
      startShow: true,
      addClass: false,
      popShow: false,
      info: {},
      index: 3,
      priseInfo: [
        [],
        [],
        []
      ],
      prize: [{ "name": "一等奖", "id": 1, "num": 1 }, { "name": "二等奖", "id": 2, "num": 2 }, { "name": "三等奖", "id": 3, "num": 5 }]
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
      this.info = this.meeting[this.getNum(imageIndex)]
      setTimeout(() => {
        this.popShow = !this.popShow
      }, 500)
    },
    close(data) {
      this.addClass = !this.addClass
      this.popShow = !this.popShow
      this.resetCss()
      if (data == 1) {
        this.priseInfo[this.index - 1].push(this.info)
      }
    },
    choice(e) {
      this.index = e.target.getAttribute("data-id");
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
      for (let i = 0, n = getImg.length; i < n; i++) {
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
    getNum(imageIndex) {
      return imageIndex % this.$refs.listWrapper.children.length
    },
    _getMeeting() {
      getMeeting().then((res) => {
        if (res.code === 0) {
          this.meeting = res.information
        }
      })
    }
  },
  watch: {
    showBtn(curVal, oldVal) {
      console.log(curVal, oldVal);
      // console.log(this.$refs.already)
      // return this.$refs.already.innerHTML == this.$refs.total.innerHTML ? 'false' : 'true'
    }
  },
  created() {
    this._getMeeting()
  },
  components: {
    popBox
  }
}

</script>
<style scoped>
@import 'meeting.css'

</style>
