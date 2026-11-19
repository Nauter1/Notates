<script setup lang="ts">
import {ref,watch} from "vue"
import {postsServices} from "../../services/postsServices"
import type { Post } from "../../types/Posts"

const props = defineProps<{
    postId: string
}>()

const post = ref<Post | null>(null)
const error = ref("")
const loading = ref(false)

async function loadPost(id: string){
    post.value = null
    loading.value = true
    error.value = ""
    try{
        post.value = await postsServices.getById(id)
    }
    catch (err){
        error.value = "Cannot get post."
        console.error(err)
    } finally {
        loading.value = false
    }
}

watch( () => props.postId, loadPost, {immediate: true})
</script>

<template>
    <section>
        <h2>Post details</h2>
        <p v-if="loading">Loading post info..</p>
        <p v-else-if="error">{{ error }}</p>
        <div v-else-if="post">
            <h3>{{ post.PostTitle }}</h3>
            <p>{{ post.ReleaseDate }}</p>
            <p>{{ post.ContentLink }}</p>
            <p>{{ post.PostDescription }}</p>
        </div>
    </section>
</template>