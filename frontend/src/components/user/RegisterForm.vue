<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { usersServices } from "@/services/usersServices"
import type { UserRegister } from "@/types/User";

const props = defineProps<{
    userId?: string | null
}>()

const emit = defineEmits<{
    saved:[]
}>()

const error = ref("")
const saving = ref(false)

function emptyUser(): UserRegister{
    return {
        UserName: "",
        EmailAddress: "",
        SignupDate: new Date().toDateString(), 
        AccountType: "",
        AvatarName: "",
        UserCollectionID: null,
        ReviewListID: null,
        ProfileID: null,
        CredentialID: null,
        Password: "",
        PasswordConfirmation: null

    }
}

const form = ref<UserRegister>(emptyUser())

async function register(){
    saving.value = true
    error.value = ""

    try{
        await usersServices.register(form.value)
    } catch (err){
        error.value = "Saving failed"
        if (err instanceof Error){
            console.error(err.message);
        } else {
            console.error('An unknown error occurred: ', err);
        }
    } finally {
        saving.value = false
    }
}

</script>

<template>
    <section>
        <h2>Input your personal data</h2>
        <p style="font-size: 3px;">:3</p>
        <form @submit.prevent="register">
            <label for="UserName">Username: <span color="red">*</span></label>
            <input id="UserName" v-model="form.UserName" required/><br/><br/>
            <label for="EmailAddress">EmailAddress: <span color="red">*</span></label>
            <input id="EmailAddress" v-model="form.EmailAddress" required/><br/><br/>
            <label for="Password">Password: <span color="red">*</span></label>
            <input id="Password" v-model="form.Password" required/><br/><br/>
            <label for="PasswordConfirmation">PasswordConfirmation: <span color="red">*</span></label>
            <input id="PasswordConfirmation" v-model="form.PasswordConfirmation" required/><br/><br/>
            <p v-if="error">{{ error }}</p><br/><br/>

            <button type="submit" :disabled="saving">
                {{  saving ? "Registering User.." : "Register User" }}
            </button>
        </form>
    </section>
</template>