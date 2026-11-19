
import PostsView from "../views/PostsView.vue"
import RegisterView from "../views/RegisterView.vue"
import { createRouter, createWebHistory} from "vue-router"

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/posts"

    },
    {
      path: "/posts",
      name: "posts",
      component: PostsView
    },
    {
        path: "/register",
        name: "users",
        component: RegisterView
    }
  ]
})

export default router