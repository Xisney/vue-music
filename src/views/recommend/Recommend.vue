<template>
  <div class="recommend">
    <h2>推荐页</h2>
  </div>
</template>

<script>
import { getRecommend } from "api/recommend.js";
export default {
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
</style>