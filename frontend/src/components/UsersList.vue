<template>
  <v-data-table
    :items="users"
    :headers="headers"
    class="elevation-1"
    :items-length="totalItems"
    @update:options="updateRouter"
  >
    <template #item.edit="{item}">
      <v-btn icon size="small" @click="updateUser(item.raw)">
        <v-icon size="small">
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <template #item.delete="{item}">
      <v-btn icon size="small" @click="deleteUser(item.raw._id)">
        <v-icon size="small">
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
  <UpdateUserDialog v-model="editedDialog" :user="editedUser" />
</template>

<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { reactive, ref, watch, watchEffect } from "vue";
import { deleteUserById, getUsersList } from "@/api/user";
import UpdateUserDialog from "@/components/UpdateUserDialog.vue";
import { useRoute, useRouter } from "vue-router";

const users = ref([]);
const editedDialog = ref(false);
const editedUser = reactive({});

const headers = [
  {
    title: "ID",
    key: "id"
  },
  {
    title: "First name",
    key: "firstName"
  },
  {
    title: "Last name",
    key: "lastName"
  },
  {
    title: "Email id",
    key: "email"
  },
  {
    title: "Gender",
    key: "gender"
  },
  {
    title: "Country",
    key: "country"
  },
  {
    title: "State",
    key: "state"
  },
  {
    title: "City",
    key: "city"
  },
  {
    title: "Address",
    key: "address"
  },
  {
    title: "Pincode",
    key: "pincode"
  },
  {
    title: "Edit",
    key: "edit"
  },
  {
    title: "Delete",
    key: "delete"
  }
];

function getUsers() {
  getUsersList(route.query).then(response => {
    users.value = response.users;
    totalItems.value = response.count;
  });
}

function deleteUser(id) {
  deleteUserById(id).then(() => {
    getUsers();
  });
}

function updateUser(item) {
  editedDialog.value = true;
  Object.assign(editedUser, item);
}


defineExpose({
  getUsers
});

const route = useRoute();
const router = useRouter();
const search = ref("");

const page = ref(0);
const itemsPerPage = ref(0);
const totalItems = ref(0);
const sort = ref(null);
const sortType = ref(null);

page.value = parseInt(route.query?.page || 1);
itemsPerPage.value = parseInt(route.query?.perPage || 10);
search.value = route.query?.search || "";


watchEffect(() => {
  const query = Object.assign({}, route.query);
  query.page = page.value.toString();
  query.itemsPerPage = itemsPerPage.value.toString();
  console.log(sort.value)
  if(sort.value) {
    query.sort = sort.value;
  }
  if(sortType.value) {
    query.sortType = sortType.value;
  }
  router.replace({ query: query });
});

watch(route, () => {
  getUsers();
}, {immediate: true})

function updateRouter(params) {
  page.value = params.page;
  itemsPerPage.value = params.itemsPerPage;
  if(params.sortBy[0]) {
    sort.value = params.sortBy[0].key;
    sortType.value = params.sortBy[0].order;
  } else {
    sort.value = null;
    sortType.value = null;
  }
}
</script>
