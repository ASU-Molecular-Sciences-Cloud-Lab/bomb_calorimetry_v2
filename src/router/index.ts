// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "experiment",
        name: "Experiment",
        component: () => import("@/views/Experiment.vue"),
      },
      {
        path: "instructions",
        name: "Instructions",
        component: () => import("@/views/Instructions.vue"),
      },
      {
        path: "discussion",
        name: "Discussion",
        component: () => import("@/views/Discussion.vue"),
      },
      {
        path: "constants",
        name: "Constants",
        component: () => import("@/views/Constants.vue"),
      },
      {
        path: "calorimetry",
        name: "Calorimetry",
        component: () => import("@/views/Calorimetry.vue"),
      },
      {
        path: "old/experiment",
        name: "Old Experiment",
        component: () => import("@/views/Experiment_old.vue"),
      },
      {
        path: "old/calorimetry",
        name: "Old Calorimetry",
        component: () => import("@/views/Calorimetry_old.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
