<template>
  <scroll
    :data="data"
    class="listview"
    ref="scroll"
    @scroll="onScroll"
    :probe-type="3"
  >
    <ul class="list-group">
      <li v-for="item in data" :key="item.title" ref="listGroup">
        <h2 class="list-group-title">{{ item.title }}</h2>
        <ul>
          <li
            class="list-group-item"
            v-for="singer in item.items"
            :key="singer.id"
            @click="onSelect(singer)"
          >
            <img v-lazy="singer.avatar" alt="avatar" class="avatar" />
            <p class="name">{{ singer.name }}</p>
          </li>
        </ul>
      </li>
    </ul>
    <ul
      class="list-shortcut"
      @touchstart="onShortcutTouch"
      @touchmove.stop.prevent="onShortcutMove"
    >
      <li
        class="item"
        v-for="(item, index) in listShortcut"
        :key="item"
        :data-index="index"
        :class="{ current: curIndex === index }"
      >
        {{ item }}
      </li>
    </ul>
    <div class="list-fixed" v-show="scrollY > 0" ref="fixedTitle">
      <h2 class="fixed-title">{{ fixedTitle }}</h2>
    </div>
    <div class="loading-container" v-show="data.length === 0">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/Scroll";
import Loading from "base/loading/Loading";

import { getData } from "assets/js/dom";

const ANCHOR_HEIGHT = 18;
const FIXED_HEIGHT = 30;

export default {
  created() {
    // 在此处存储touches，不必加入响应式系统
    this.touches = {};
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      curIndex: 0,
      scrollY: 0,
      diff: -1,
    };
  },
  components: {
    Scroll,
    Loading,
  },
  computed: {
    listShortcut() {
      return this.data.map((el) => {
        return el.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.data.length !== 0) {
        const temp = this.data[this.curIndex].title;
        return temp ? temp : "";
      }
      return "";
    },
  },
  watch: {
    data() {
      // 这里使用nextTick进行监听数据，刷新高度
      // $refs并非响应式的api，只会记录初始状态，并且data没有变化之后就不会调用此方法
      // 故而使用此api使得组件渲染完毕，再去获取dom元素
      // 数据变化并不代表着立即呈现为dom元素！！！
      this.$nextTick(() => {
        this._calcListGroupHeight();
      });
    },
    diff(newValue) {
      let fixedTop =
        newValue > 0 && newValue < FIXED_HEIGHT ? newValue - FIXED_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixedTitle.style.transform = `translateY(${fixedTop}px)`;
    },
  },
  methods: {
    onShortcutTouch(e) {
      let anchorIndex = getData(e.target, "index");
      // 多个ref将会返回一个数组
      this.y1 = e.touches[0].clientY;
      this.anchorIndex = anchorIndex;
      this._scrollToElement(anchorIndex);
    },
    onShortcutMove(e) {
      let y2 = e.touches[0].clientY;
      // 位运算向下取整
      let detalIndex = ((y2 - this.y1) / ANCHOR_HEIGHT) | 0;
      this._scrollToElement(parseInt(this.anchorIndex) + detalIndex);
    },
    onSelect(singer) {
      this.$emit("select", singer);
    },
    onScroll(e) {
      this.scrollY = -e.y;
      const y = -e.y;
      if (y <= 0) {
        this.curIndex = 0;
        return;
      }
      const listHeight = this.listHeight;
      for (let i = 0; i < listHeight.length - 2; i++) {
        if (y + 1 >= listHeight[i] && y + 1 < listHeight[i + 1]) {
          this.curIndex = i;
          this.diff = listHeight[i + 1] - y;
          return;
        }
      }
      // 处理边界，最后一个的情况
      this.curIndex = listHeight.length - 2;
      this.diff = -1;
    },
    _calcListGroupHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      if (list) {
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          height += list[i].clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    _scrollToElement(anchorIndex) {
      this.$refs.scroll.scrollToElement(this.$refs.listGroup[anchorIndex], 0);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 15px 0 10px 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>