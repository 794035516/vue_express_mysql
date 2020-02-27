<template>
  <!-- 轮播图 -->
  <div class="body">
    <div class="background">
      <swiper :options="swiperOption" class="swiper-wrap swiper" v-if="carousel.length !=0">
        <swiper-slide v-for="item in carousel" :key="item.id" class="carousel">
          <img :src="item" alt="error" />
        </swiper-slide>
        <!-- 小圆点 -->
        <div
          class="swiper-pagination"
          v-for="(item,index) in carousel"
          :key="index"
          slot="pagination"
        ></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");
export default {
  name: "",
  data: function() {
    return {
      carousel: [
        "https://img1.sycdn.imooc.com/5e0dab7a000101d218720764.jpg",
        "https://img1.sycdn.imooc.com/5e0dabe30001842f18720764.jpg",
        "https://img1.sycdn.imooc.com/5e0dac76000185c518720764.jpg",
        "https://img1.sycdn.imooc.com/5e1539b50001a12618720764.jpg",
        "https://img1.sycdn.imooc.com/5e2adba90001a7b118720764.jpg",
        "https://img1.sycdn.imooc.com/5e32a57800013c4d18720764.jpg"
      ],
      currentIndex: 0,
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          /* 触摸滑动后是否继续轮播 */
          disableOnInteraction: true
        },
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        grabCursor: true,
        on: {
          //滑动之后回调函数
          slideChangeTransitionStart: function() {
            /* realIndex为滚动到当前的slide索引值 */
            this.imgIndex = this.realIndex - 1;
          }
        },
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {},
  mounted: function() {},
  created: function() {},
  methods: {}
};
</script>

<style scoped>
div.background{
}
div.body{
/* 组件中的%无效 */
  background: purple;
  display: flex;
  align-items: center;
  height: 100%;
}
.swiper {
  /* width:100%; */
  /* height:72vh; */
  width: 936px;
}
.carousel {
  display: flex;
  justify-content: center;

}
.carousel img {
  width: 936px;
  height: 382px;
}
.swiper-wrap {
  cursor: pointer !important;
}
</style>