<template>
  <div class="wrapper" ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  mounted() {
    this._initScroll();
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    // 用于监听dom更新，并且refresh
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    click: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        click: this.click,
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  watch: {
    data() {
      this.refresh();
    },
  },
};
</script>

<style lang="stylus" scoped></style>