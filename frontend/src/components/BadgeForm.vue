<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { badgesServices } from "../services/badgesServices"
import type { Badge, BadgeInput } from "../types/Badges";

const props = defineProps<{
    badgeId?: string | null
}>()

const emit = defineEmits<{
    saved: []
}>()

const error = ref("")
const saving = ref(false)

function emptyBadge(): BadgeInput {
    return {
        Title: "",
        Description: "",
        id: "",
        DateObtained: "",
        JoinDate: "",
        isAdmin: false,
        postCount: 0,
        isPlusMember: false,
        reactionCount: 0,
        isVerifiedArtist: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

const form = ref<BadgeInput>(emptyBadge())

async  function loadBadge(){
    error.value = ""
    if (!props.badgeId){
        form.value = emptyBadge()
        return
    }
    try {
        const badge = await badgesServices.getById(props.badgeId)
        form.value = {
            Title: badge.Title,
            Description: badge.Description,
            id: badge.id,
            DateObtained: badge.DateObtained,
            JoinDate: badge.JoinDate,
            isAdmin: badge.isAdmin,
            postCount: badge.postCount,
            isPlusMember: badge.isPlusMember,
            reactionCount: badge.reactionCount,
            isVerifiedArtist: badge.isVerifiedArtist,
        }
    } catch (err) {
        error.value = "Cannot load this badge"
        console.error(err)
    }
}

async function saveBadge(){
    saving.value = true
    error.value = ""
    try {
        if (props.badgeId){
            await badgesServices.update(props.badgeId, form.value)
        } else {
            await badgesServices.create(form.value)
        }

        emit("saved")

        if (props.badgeId) {form.value = emptyBadge()}
    } catch (err) {
        error.value = "Saving failed."
        console.error(err)
    } finally {
        saving.value = false
    }
}

watch ( () => props.badgeId, loadBadge, {immediate: true})

</script>

<template>
    <section>
        <h2>{{ badgeId ? "Edit Badge" : "Create Badge" }}</h2>
        <form @submit.prevent = "saveBadge">
            <label for="Title">Title</label>
            <input id="Title" v-model="form.Title" required/><br/>

            <label for="Description">Description</label>
            <input id="Description" v-model="form.Description"/><br/>

            <label for="DateObtained">DateObtained</label>
            <input id="DateObtained" v-model="form.DateObtained"/><br/>

            <label for="JoinDate">JoinDate</label>
            <input id="JoinDate" v-model="form.JoinDate"/><br/>

            <label for="isAdmin">isAdmin</label>
            <input id="isAdmin" v-model="form.isAdmin"/><br/>
            
            <label for="postCount">postCount</label>
            <input id="postCount" v-model="form.postCount"/><br/>

            <label for="isPlusMember">isPlusMember</label>
            <input id="isPlusMember" v-model="form.isPlusMember"/><br/>
            
            <label for="reactionCount">reactionCount</label>
            <input id="reactionCount" v-model="form.reactionCount"/><br/>
            
            <label for="isVerifiedArtist">isVerifiedArtist</label>
            <input id="isVerifiedArtist" v-model="form.isVerifiedArtist"/><br/><br/>

            <p v-if="error">{{  error }}</p>
            <button type="submit" :disabled="saving">
                {{  saving ? "Saving badge.." : "Save Badge" }}
            </button>
        </form>
    </section>
</template>