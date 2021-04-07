<template>
  <div class="music-list">
    <div class="back" @click="navBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter"></div>
      <div class="play-wrapper" v-show="isPlayShow">
        <div class="play">
          <i class="icon-play"></i>
          <p class="text">随机播放全部</p>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <scroll
      class="list"
      :data="songs"
      ref="scroll"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @selectSong="onSelectSong"></song-list>
      </div>
      <div class="loading-container" v-show="songs.length === 0">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "base/scroll/Scroll";
import SongList from "base/songlist/SongList";
import Loading from "base/loading/Loading";

import { mapActions } from "vuex";

const PRESET_HEIGHT = 35;

export default {
  components: {
    Scroll,
    SongList,
    Loading,
  },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "佚名",
    },
    bgImage: {
      type: String,
      default: "",
    },
  },
  computed: {
    bgStyle() {
      return `backgroundImage:url(${this.bgImage})`;
    },
  },
  mounted() {
    this.bgImageHeight = this.$refs.bgImage.clientHeight;
    this.$refs.scroll.$el.style.top = this.bgImageHeight + "px";
    this.minTransHeight = PRESET_HEIGHT - this.bgImageHeight;
  },
  data() {
    return {
      isPlayShow: true,
    };
  },
  methods: {
    navBack() {
      this.$router.back();
    },
    onScroll(pos) {
      let translateY = Math.max(pos.y, this.minTransHeight);
      this.$refs.bgLayer.style.transform = `translateY(${translateY}px)`;
      const bgImage = this.$refs.bgImage;
      let scale = Math.abs(pos.y / this.bgImageHeight);

      if (pos.y > 0) {
        bgImage.style.transform = `scale(${1 + scale})`;
        bgImage.style.zIndex = 10;
      } else {
        bgImage.style.zIndex = 0;
        bgImage.style.transform = `scale(${1})`;
      }

      if (pos.y < this.minTransHeight) {
        bgImage.style.paddingTop = PRESET_HEIGHT + "px";
        bgImage.style.zIndex = 10;
        this.isPlayShow = false;
      } else {
        bgImage.style.paddingTop = "70%";
        bgImage.style.zIndex = 0;
        this.isPlayShow = true;
      }
    },
    onSelectSong(item, index) {
      this.selectPlay({
        index,
        list: this.songs,
      });
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';
@import '~assets/stylus/mixin';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;

    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>