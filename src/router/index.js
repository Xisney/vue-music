import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 导入组件
const Recommend = () => import("views/recommend/Recommend");
const Rank = () => import("views/rank/Rank");
const Singer = () => import("views/singer/Singer");
const Search = () => import("views/search/Search");
const SingerDetail = () =>
  import("views/singer/childCpns/singerDetail/SingerDetail");

const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    component: Recommend,
  },
  {
    path: "/rank",
    component: Rank,
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: ":id",
        component: SingerDetail,
      },
    ],
  },
  {
    path: "/search",
    component: Search,
  },
];

const router = new Router({
  routes,
  mode: "history",
});

export default router;
