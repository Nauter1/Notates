<script setup lang="ts">
    import {ref} from "vue"
    import UsersList from "../components/user/UsersList.vue"

    const selectedUserId = ref<string | null>(null)

    function selectUser(id: string){
        selectedUserId.value = id
    }
</script>

<template>
    <div>
        <h1>See all users</h1>
        <UsersList @select="selectUser"/>
        <UserDetails v-if="selectedUserId" :user-id="selectedUserId"/>
    </div>
</template>