<template>
  <div id="app">
    <m-header></m-header>
    <tab-bar></tab-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from "components/m-header/MHeader";
import TabBar from "components/tabbar/TabBar";
import Player from "components/player/Player";

export default {
  components: {
    MHeader,
    TabBar,
    Player,
  },
};
</script>

<style>
</style>
