<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="(item, index) in songs"
      :key="item.mid"
      @click="selectSong(item, index)"
    >
      <div class="content">
        <h4 class="name">{{ item.name }}</h4>
        <p class="desc">{{ item | concatName }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    concatName(item) {
      return `${item.singer}-${item.album}`;
    },
  },
  methods: {
    selectSong(item, index) {
      this.$emit("selectSong", item, index);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';
@import '~assets/stylus/mixin';

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;

    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        no-wrap();
        color: $color-text;
      }

      .desc {
        no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>