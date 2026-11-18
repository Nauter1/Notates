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

import PostsList from './components/PostsList.vue';
import PostsDetails from './components/PostsDetails.vue'
import PostForm from './components/PostForm.vue'
import { postsServices } from "./services/postsServices.ts";

const selectedPostId = ref<string | null>(null)

function selectPost(id: string){
  selectedPostId.value = id
  editing.value = false
}
function createPost(){
  selectedPostId.value = null
  editing.value = true
}

function PostSaved(){
  editing.value = false
  listVersion.value++
  detailsVersion.value++
}

async function deletePost(){
  if (!selectedPostId.value) return
  if (!confirm("Delete this game?")) return

  error.value = ""

  try{
    await postsServices.delete(selectedPostId.value)
    selectedPostId.value = null
    editing.value = false
    listVersion.value++
  } catch (err) {
    error.value = "Cannot delete this post"
    console.error(err)
  }
}

</script>

<template>
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
</template>

<style scoped></style>
