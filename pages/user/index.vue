<template>
  <div>
    <h2 class="text-3xl bg-slate-900 text-neutral-50 font-bold underline">
      Welcome User {{ user.displayName }}
    </h2>
    <img :src="user.photoURL" alt="" />
    <p>User Login</p>
    <button
      @click="logout"
      class="mt-4 py-2 px-4 bg-red-600 text-white font-bold rounded hover:bg-red-700"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { signOut } from "firebase/auth";
useHead({
  title: "Users",
});
definePageMeta({
  layout: "authenticated",
});
const auth = useFirebaseAuth();
const user = useCurrentUser();
function logout() {
  signOut(auth);
  navigateTo("/");
}
</script>

<style scoped></style>
