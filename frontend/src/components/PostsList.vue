<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { postsServices } from '../services/postsServices';
    import type { PostSummary } from '../types/Posts'

    const posts = ref<PostSummary[]>([])
    const loading = ref(false)
    const error = ref("")
    const emit = defineEmits<{
        select: [id: string]
    }>()

async function loadPosts(){
    loading.value = true
    error.value = ""

    try {
        posts.value = await postsServices.getAll()
    }
    catch (err) {
        error.value = "Cannot load posts, womp womp :c"
        console.log(err)
    }
    finally{
        loading.value = false
    }
}

onMounted(loadPosts)
</script>

<template>
    <section>
        <h2>Posts</h2>
        <button @click="loadPosts">Refresh</button>
        <p v-if="loading">Loading posts...</p>
        <p v-else-if="error">{{error}}</p>
        <p v-else-if="posts.length === 0">No posts found</p>
        <ul v-else>
            <li v-for="post in posts" :key="post.id">
                <button @click="emit('select', post.id)">{{ post.Title }}</button> ( {{ post.id }})
            </li>
        </ul>
    </section>
</template>