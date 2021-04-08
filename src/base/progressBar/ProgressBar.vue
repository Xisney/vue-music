<template>
  <div class="progress-bar" ref="bar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-bar-wrapper"
        ref="btnWapper"
        @touchstart.prevent="touchstart"
        @touchmove.prevent="touchmove"
        @touchend="touchend"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const INNER_WIDTH = 16;
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.touch = {};
  },
  methods: {
    touchstart(e) {
      this.touch.originX = e.touches[0].clientX;
      this.touch.originWidth = this.$refs.progress.clientWidth;
      this.touch.inited = true;
    },
    touchmove(e) {
      if (!this.touch.inited) return;
      const detalX = e.touches[0].clientX - this.touch.originX,
        width = Math.min(
          Math.max(0, this.touch.originWidth + detalX),
          this.$refs.bar.clientWidth - INNER_WIDTH
        );
      this._transform(width);
      this._emitPercent();
    },
    touchend() {
      this.touch.inited = false;
      this.$emit("timeChangeEnd");
    },
    progressClick(e) {
      const width = Math.min(
        Math.max(0, e.offsetX),
        this.$refs.bar.clientWidth - INNER_WIDTH
      );
      this._transform(width);
      this._emitPercent();
      this.$emit("timeChangeEnd");
    },
    _transform(width) {
      this.$refs.progress.style.width = `${width}px`;
      this.$refs.btnWapper.style.transform = `translateX(${width}px)`;
    },
    _emitPercent() {
      const percent =
        this.$refs.progress.clientWidth /
        (this.$refs.bar.clientWidth - INNER_WIDTH);
      this.$emit("timeChange", percent);
    },
  },
  watch: {
    percent(newVal) {
      if (this.touch.inited) return;
      const width = (this.$refs.bar.clientWidth - INNER_WIDTH) * newVal;
      this._transform(width);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-bar-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>