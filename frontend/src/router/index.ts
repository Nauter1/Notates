
import PostsView from "../views/PostsView.vue"
import RegisterView from "../views/RegisterView.vue"
import UsersView from "../views/UsersView.vue"
import LoginView from "../views/LoginView.vue"
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
        name: "register",
        component: RegisterView
    },
    {
        path: "/users",
        name: "users",
        component: UsersView
      },
      {
        path: "/login",
        name: "login",
        component: LoginView
      }
  ]
})

export default router