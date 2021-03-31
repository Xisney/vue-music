<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{ active: index === currentIndex }"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

import { addClass } from "assets/js/dom.js";

export default {
  data() {
    return {
      dots: 0,
      currentIndex: 0,
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 3000,
    },
  },
  mounted() {
    // 保证子组件被挂载，能够获取到实例
    this.$nextTick(() => {
      this._setSliderWidth();
      this._initDots();
      this._initBScroll();
      if (this.autoPlay) {
        this._play();
      }
    });
    window.addEventListener("resize", () => {
      this._setSliderWidth(true);
      this.slide.refresh();
    });
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let clientWidth = this.$refs.slider.clientWidth,
        sliderWidth = 0;
      // 遍历子节点，并且添加类
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = clientWidth + "px";
        sliderWidth += clientWidth;
      }
      // 是否循环无缝轮播
      if (this.loop && !isResize) {
        sliderWidth += 2 * clientWidth;
      }
      this.$refs.sliderGroup.style.width = sliderWidth + "px";
    },
    _initDots() {
      this.dots = this.children.length;
    },
    _initBScroll() {
      this.slide = new BScroll(this.$refs.slider, {
        scrollX: true, // 横向滚动
        scrollY: false, // 不允许纵向滚动
        momentum: false, // 当快速滑动时是否开启滑动惯性
        snap: {
          loop: this.loop, // 是否可以无缝循环轮播
          threshold: 0.3, // 手动切换时的阈值
          speed: 400,
        },
        click: true,
      });
      this.slide.on("scrollEnd", this._scrollEnd);
      this.slide.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
      this.slide.on("touchEnd", () => {
        if (this.autoPlay) {
          this._play();
        }
      });
    },
    _scrollEnd() {
      let index = this.slide.getCurrentPage().pageX;
      this.currentIndex = index;
      // 判断是否自动滚动，若是，则再次注册定时器
      if (this.autoPlay) {
        this._play();
      }
    },
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slide.next();
      }, this.interval);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>