<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mb-6 text-slate-900">
        Email Verified
      </h2>
      <p class="text-lg text-center mb-6">
        Your email has been verified. You can now sign in with your new account.
      </p>
      <div class="flex justify-center">
        <button
          @click="redirectToLogin"
          class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// Redirect to login page after showing the message
setTimeout(() => {
  router.push("/login");
}, 3000); // Redirect after 3 seconds

useHead({
  title: "Verified",
});
</script>
