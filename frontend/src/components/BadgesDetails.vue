<script setup lang="ts">
import {ref,watch} from "vue"
import {badgesServices} from "../services/badgesServices"
import type { Badge } from "../types/Badges"

const props = defineProps<{
    badgeId: string
}>()

const badge = ref<Badge | null>(null)
const error = ref("")
const loading = ref(false)

async function loadBadge(id: string){
    badge.value = null
    loading.value = true
    error.value = ""
    try{
        badge.value = await badgesServices.getById(id)
    }
    catch (err){
        error.value = "Cannot get badge."
        console.error(err)
    } finally {
        loading.value = false
    }
}

watch( () => props.badgeId, loadBadge, {immediate: true})
</script>

<template>
    <section>
        <h2>Badge details</h2>
        <p v-if="loading">Loading badge info..</p>
        <p v-else-if="error">{{ error }}</p>
        <div v-else-if="badge">
            <h3>{{ badge.Title }}</h3>
            <p>{{ badge.DateObtained }}</p>
            <p>{{ badge.JoinDate }}</p>
            <p>{{ badge.Description }}</p>
            <p>{{ badge.isAdmin }}</p>
            <p>{{ badge.isPlusMember }}</p>
            <p>{{ badge.isVerifiedArtist }}</p>
            <p>{{ badge.postCount }}</p>
            <p>{{ badge.reactionCount }}</p>
        </div>
    </section>
</template>