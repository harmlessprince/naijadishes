import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import addDish from "@/components/addDish";
import EditDish from "@/components/EditDish";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/add-dish",
      name: "addDish",
      component: addDish
    },
    {
      path: "/edit-dish/:dish_slug",
      name: "EditDish",
      component: EditDish
    }
  ]
});
