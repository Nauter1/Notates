<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { badgesServices } from '../services/badgesServices';
    import type { BadgeSummary } from '../types/Badges'

    const badges = ref<BadgeSummary[]>([])
    const loading = ref(false)
    const error = ref("")

async function loadBadges(){
    loading.value = true
    error.value = ""

    try {
        badges.value = await badgesServices.getAll()
    }
    catch (err) {
        error.value = "Cannot load badges, womp womp :c"
        console.log(err)
    }
    finally{
        loading.value = false
    }
}

onMounted(loadBadges)
</script>

<template>
    <section>
        <h2>Badges</h2>
        <button @click="loadBadges">Refresh</button>
        <p v-if="loading">Loading badges...</p>
        <p v-else-if="error">{{error}}</p>
        <p v-else-if="badges.length === 0">No badges found</p>
        <ul v-else>
            <li v-for="badge in badges" :key="badge.id">
                {{ badge.Title }} ( {{ badge.id }})
            </li>
        </ul>
    </section>
</template>