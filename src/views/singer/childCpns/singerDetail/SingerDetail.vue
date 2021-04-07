<template>
  <music-list :songs="songList" :bg-image="bgImage" :title="title"></music-list>
</template>

<script>
import MusicList from "components/musicList/MusicList";

import { mapGetters } from "vuex";
import { createSong, isValidMusic, processSongsUrl } from "assets/js/song";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";

export default {
  created() {
    this._getSingerDetail(this.singer.id);
  },
  computed: {
    ...mapGetters(["singer"]),
    title() {
      return this.singer.name;
    },
    bgImage() {
      if (this.songList.length !== 0) {
        return this.singer.avatar;
      }
      return "";
    },
  },
  data() {
    return {
      songList: [],
    };
  },
  components: {
    MusicList,
  },
  methods: {
    async _getSingerDetail(id) {
      // 判读是否在当前界面直接刷新，此时vuex中的数据不存在，为空
      // vuex数据保存于内存中，刷新之后就会消失
      // 若id不存在直接返回上一界面
      if (!id) {
        this.$router.replace("/singer");
        return;
      }
      const res = await getSingerDetail(id);
      if (res.code === ERR_OK) {
        this.songList = await processSongsUrl(
          this._normaliseSongList(res.data.list)
        );
      }
    },
    _normaliseSongList(songs) {
      let res = [];
      songs.forEach(({ musicData }) => {
        if (isValidMusic(musicData)) {
          res.push(createSong(musicData));
        }
      });
      return res;
    },
  },
};
</script>

<style>
</style>