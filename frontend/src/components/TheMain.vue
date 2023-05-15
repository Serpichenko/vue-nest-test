<template>
  <v-main class="pa-5">
    <UserForm @success="userAdded" />
    <UsersList ref="userList" />
  </v-main>
</template>

<script setup>
import UsersList from "@/components/UsersList.vue";
import UserForm from "@/components/UserForm.vue";
import { ref } from "vue";

const userList = ref(null);

function userAdded() {
  userList.value.getUsers();
}
</script>