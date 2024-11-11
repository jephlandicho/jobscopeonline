<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mb-6 text-slate-900">
        Login Page
      </h2>
      <button
        @click="signInwithGoogle"
        class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Sign in with Google
      </button>
    </div>
  </div>
</template>

<script setup>
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = useFirebaseAuth();
const router = useRouter();
function signInwithGoogle() {
  signInWithPopup(auth, new GoogleAuthProvider()).then(() =>
    router.replace("/user")
  );
}
</script>

<style></style>
