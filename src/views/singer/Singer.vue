<template>
  <div class="singer">
    <list-view :data="singers" @select="onSelect"></list-view>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ListView from "base/listview/ListView";

import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config.js";
import { mapMutations } from "vuex";

import Singer from "assets/js/singer";

// 定义常量，更加语义化
const HOT_NAME = "热门";
const HOT_INDEX = 10;

export default {
  data() {
    return {
      singers: [],
    };
  },
  components: {
    ListView,
  },
  created() {
    this._getSingerList();
  },
  methods: {
    async _getSingerList() {
      let res = await getSingerList();
      if (res.code === ERR_OK) {
        this.singers = this._normalizeList(res.data.list);
      }
    },
    _normalizeList(list) {
      let res = {
        hot: {
          title: HOT_NAME,
          items: [],
        },
      };
      list.forEach((el, index) => {
        // 取出热门数据
        if (index < HOT_INDEX) {
          res.hot.items.push(new Singer(el.Fsinger_mid, el.Fsinger_name));
        }
        const key = el.Findex;
        if (!res[key]) {
          res[key] = {
            title: el.Findex,
            items: [new Singer(el.Fsinger_mid, el.Fsinger_name)],
          };
        } else {
          res[key].items.push(new Singer(el.Fsinger_mid, el.Fsinger_name));
        }
      });
      let hot = [],
        ret = [];
      Object.values(res).forEach((value) => {
        if (/^[a-zA-Z]$/.test(value.title)) {
          ret.push(value);
        } else if (value.title === HOT_NAME) {
          hot.push(value);
        }
      });
      ret.sort((a, b) => {
        return a.title.codePointAt(0) - b.title.codePointAt(0);
      });
      return hot.concat(ret);
    },
    onSelect(singer) {
      this.$router.push(`/singer/${singer.id}`);
      this.setSinger(singer);
    },
    ...mapMutations({
      setSinger: "SET_SINGER",
    }),
  },
};
</script>

<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}
</style>