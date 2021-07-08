import Vue from "vue";
import VueRouter from "vue-router";
import RateDogs from "../components/rate-dogs.vue";

Vue.use(VueRouter);

const routes = [{ path: "/category", component: RateDogs }];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
