<template>
  <v-row>
    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-text-field label="FirstName" variant="underlined" v-model="user.firstName" />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-text-field label="LastName" variant="underlined" v-model="user.lastName" />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-text-field label="Date of Birth" variant="underlined" v-model="user.dateOfBirth" />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-text-field label="Email ID" variant="underlined" v-model="user.email" />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-radio-group v-model="user.gender" inline label="Gender">
        <v-radio label="Male" value="Male" color="primary" />
        <v-radio label="Female" value="Female" color="primary" />
      </v-radio-group>
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-text-field label="Country" variant="underlined" v-model="user.country" />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-text-field label="State" variant="underlined" v-model="user.state" />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-text-field label="City" variant="underlined" v-model="user.city" />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-text-field label="Address" variant="underlined" v-model="user.address" />
    </v-col>

    <v-col cols="12" sm="6" md="6" lg="3" xl="3">
      <v-text-field label="Pincode" variant="underlined" v-model.number="user.pincode" />
    </v-col>

    <v-col cols="12" class="d-flex" style="gap: 10px">
      <v-btn color="primary" @click="createNewUser()">Submit</v-btn>
      <v-btn @click="resetForm()">Reset</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { reactive } from "vue";
import { createUser } from "@/api/user";

const user = reactive({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  gender: "Male",
  country: "",
  state: "",
  city: "",
  address: "",
  pincode: null
});

const emit = defineEmits(['success']);

function createNewUser() {
  createUser(user).then(() => {
    emit('success');
  })
}

function resetForm() {
  Object.assign(user, {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    gender: "Male",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: ""
  });
}
</script>