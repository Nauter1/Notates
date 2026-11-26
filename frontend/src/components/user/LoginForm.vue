<script setup lang="ts">
import router from "@/router"
import { authenticationsServices } from "@/services/authenticationsServices"
import { ref } from "vue"
import { useRoute } from "vue-router"
import { useAuth } from "@/composables/useAuth"

const error = ref("")
const email = ref("")
const password = ref("")
const saving = ref(false)
const route = useRoute()
const { setUser } = useAuth()

const handleLogin = async () => {
    try {
        const user = await authenticationsServices.login(email.value, password.value)
        const redirectPath = (route.query.redirect as string) || "/users"
        setUser(user)
        router.push("/users")
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('An unknown error occurred:', err);
        }
    }
}

</script>

<template>
    <section>
        <h2>Log in</h2>
        <p style="font-size: 3px;">:3</p>
        <form @submit.prevent="handleLogin">
            <label for="Email">Email <span color="red">*</span></label><br/>
            <input id="Email" v-model="email" required/><br/><br/>

            <label for="Password">Password <span color="red">*</span></label><br/>
            <input type="password" id="Password" v-model="password" required/><br/><br/>

            <span color="red">Fields with an * (asterix) must be filled</span><br/><br/>

            <p v-if="error">{{ error }}</p><br/><br/>

            <button type="submit" :disabled="saving">{{ saving ? "Logging in, please hold" : "Log in" }}</button><br/><br/>
        </form><br/><br/>
    </section>
</template>