import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Journal from "@/views/Journal.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/journal",
    name: "Journal",
    component: Journal
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
