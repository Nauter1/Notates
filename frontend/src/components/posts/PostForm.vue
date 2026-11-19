<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { postsServices } from "../../services/postsServices"
import type { Post, PostInput } from "../../types/Posts";

const props = defineProps<{
    postId?: string | null
}>()

const emit = defineEmits<{
    saved: []
}>()

const error = ref("")
const saving = ref(false)

function emptyPost(): PostInput {
    return {
        PostTitle: "",
        PostDescription: "",
        id: "",
        ReleaseDate: new Date(),
        ContentLink: "",
    }
}

const form = ref<PostInput>(emptyPost())

async  function loadPost(){
    error.value = ""
    if (!props.postId){
        form.value = emptyPost()
        return
    }
    try {
        const post = await postsServices.getById(props.postId)
        form.value = {
            PostTitle: post.PostTitle,
            PostDescription: post.PostDescription,
            ReleaseDate: post.ReleaseDate,
            ContentLink: post.PostTitle,
            id: post.id,
        }
    } catch (err) {
        error.value = "Cannot load this post"
        console.error(err)
    }
}

async function savePost() {
    saving.value = true
    error.value = ""

    console.log("I HAVE CLICKED DA EDIT BATON to saev")
    try {
        if (props.postId) {
            await postsServices.update(props.postId, form.value)
            console.log("try-if")
        } else {
            await postsServices.create(form.value)
            console.log("try-else")
        }
        console.log(form.value)

        emit("saved")

        console.log("try-/")
        if (props.postId) 
        {
            console.log("try-2if")
            form.value=emptyPost()
        }
    } catch (err) {
        console.log("catch")
        error.value = "Saving failed"
        console.error(err)
    } finally {
        saving.value = false
        console.log("finally")
    }
}

watch ( () => props.postId, loadPost, {immediate: true})

</script>

<template>
    <section>
        <h2>{{ postId ? "Edit Post" : "Create Post" }}</h2>
        <form @submit.prevent = "savePost">
            <label for="PostTitle">PostTitle</label>
            <input id="PostTitle" v-model="form.PostTitle" required/><br/>

            <label for="PostDescription">PostDescription</label>
            <input id="PostDescription" v-model="form.PostDescription" required/><br/>

            <label for="ReleaseDate">ReleaseDate</label>
            <input id="ReleaseDate" v-model="form.ReleaseDate" required/><br/>

            <label for="ContentLink">ContentLink</label>
            <input id="ContentLink" v-model="form.ContentLink" required/><br/>

            <p v-if="error">{{  error }}</p>
            <button type="submit" :disabled="saving">
                {{  saving ? "Saving post.." : "Save Post" }}
            </button>
        </form>
    </section>
</template>