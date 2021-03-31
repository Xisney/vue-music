<template>
  <div class="singer"></div>
</template>

<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config.js";

export default {
  data() {
    return {
      singerList: [],
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    async _getSingerList() {
      let res = await getSingerList();
      if (res.code === ERR_OK) {
        console.log(res);
      }
    },
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
</style>