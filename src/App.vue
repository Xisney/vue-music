<template>
  <div id="app">
    <m-header></m-header>
    <tab-bar></tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from "components/m-header/MHeader";
import TabBar from "components/tabbar/TabBar";

export default {
  components: {
    MHeader,
    TabBar,
  },
};
</script>

<style>
</style>
