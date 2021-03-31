<template>
  <div class="recommend">
    <!-- 避免组件内部mount时获取不到数据，设置为数据获取之后再进行dom加载 -->
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <slider v-if="slider.length !== 0" class="slider-wrapper">
          <div v-for="item in slider" :key="item.id">
            <a :href="item.linkUrl">
              <img
                :src="item.picUrl"
                alt="swiper"
                @load="recommendLoad"
                class="needsclick"
              />
            </a>
          </div>
        </slider>
        <div class="recommend-list">
          <h2 class="list-title">热门歌单推荐</h2>
          <ul>
            <li class="item" v-for="item in discList" :key="item.dissid">
              <div class="icon">
                <img v-lazy="item.imgurl" alt="icon" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.creator.name }}</h2>
                <p class="desc">{{ item.dissname }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-show="discList.length === 0">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from "base/slider/Slider";
import Scroll from "base/scroll/Scroll";
import Loading from "base/loading/Loading";

import { getRecommend, getDiscList } from "api/recommend.js";
import { ERR_OK } from "api/config.js";

export default {
  components: {
    Slider,
    Scroll,
    Loading,
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  data() {
    return {
      slider: [],
      discList: [],
    };
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(({ data: res }) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    },
    recommendLoad() {
      if (!this.isRecommendLoad) {
        this.$refs.scroll.refresh();
        this.isRecommendLoad = true;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;

          img {
            width: 100%;
          }
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-wrapper {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>