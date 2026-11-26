<script setup lang="ts">
import { ref } from "vue"
import badgesList from './components/BadgesList.vue';
import badgesDetails from './components/BadgesDetails.vue'
import badgeForm from './components/BadgeForm.vue'
import { badgesServices } from "./services/badgesServices.ts";

const selectedBadgeId = ref<string | null>(null)
const editing = ref(false)
const listVersion = ref(0)
const detailsVersion = ref(0)
const error = ref("")

function selectBadge(id: string){
  selectedBadgeId.value = id
  editing.value = false
}
function createBadge(){
  selectedBadgeId.value = null
  editing.value = true
}

function badgeSaved(){
  editing.value = false
  listVersion.value++
  detailsVersion.value++
}

async function deleteBadge(){
  if (!selectedBadgeId.value) return
  if (!confirm("Delete this game?")) return

  error.value = ""

  try{
    await badgesServices.delete(selectedBadgeId.value)
    selectedBadgeId.value = null
    editing.value = false
    listVersion.value++
  } catch (err) {
    error.value = "Cannot delete this game"
    console.error(err)
  }
}

import { useAuth } from "@/composables/useAuth.ts"
const { user, logout } = useAuth()
</script>

<template>
  <div>
    <header>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Notates</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample02">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <RouterLink id="RL_Posts" class="btn" to="/posts">Posts</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="btn" to="/users">Users</RouterLink>
          </li>

          <div v-if="user">
              <span>Hello, {{ user.UserName }}</span>
              <li class="nav-item">
                <RouterLink class="btn" to="/logout">Logout</RouterLink>
              </li>
          </div>
          <div v-else>
          <li class="nav-item">
            <RouterLink class="btn" to="/login">Login</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="btn" to="/register">Register a new user.</RouterLink>
          </li>
          </div>
        </ul>
        <form class="form-inline my-2 my-md-0">
          <input class="form-control" type="text" placeholder="Search">
        </form>
      </div>
    </nav>
    </header>
    <main>
      <RouterView/>
    </main>
  </div>
</template>

<!--<template>
  <h1>You did it!</h1>
  <button @click="createBadge">Add Badge</button>
  <p v-if="error">{{ error }}</p>
  <p>
    <badgesList :key="listVersion" @select="selectBadge" />
    <section v-if="selectedBadgeId && !editing">
      <badgesDetails :key="`${selectedBadgeId}-${detailsVersion}`" :badge-id="selectedBadgeId"/>
      <button @click="editing = true">Edit</button>
      <button @click="deleteBadge">Delete</button>
    </section>
    <section v-if="editing">
      <button @click="editing = false">Cancel Edit</button>
      <badgeForm 
      :badge-id="selectedBadgeId"
      @saved="badgeSaved"/>
    </section>
  </p>
  <hr/>
  <button @click="createPost">Add Post</button>
  <p v-if="error">{{ error }}</p>
  <p>
    <PostsList :key="listVersion" @select="selectPost" />
    <section v-if="selectedPostId && !editing">
      <PostsDetails :key="`${selectedPostId}-${detailsVersion}`" :post-id="selectedPostId"/>
      <button @click="editing = true">Edit</button>
      <button @click="deletePost">Delete</button>
    </section>
    <section v-if="editing">
      <button @click="editing = false">Cancel Edit</button>
      <PostForm 
      :Post-id="selectedPostId"
      @saved="PostSaved"/>
    </section>
  </p>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>-->

<style scoped>
</style>
