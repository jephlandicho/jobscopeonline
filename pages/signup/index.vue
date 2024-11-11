<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mb-6 text-slate-900">
        Sign Up Page
      </h2>
      <!-- Email Sign Up Form -->
      <form @submit.prevent="signUp" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div class="mt-4 text-center">
        <button
          @click="signInwithGoogle"
          class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";

const auth = useFirebaseAuth();
const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

function signInwithGoogle() {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(() => {
      router.replace("/user");
    })
    .catch((error) => {
      errorMessage.value = error.message;
    });
}

async function signUp() {
  if (password.value !== confirmPassword.value) {
    alert("Passwords don't match!");
    return;
  }

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;

    // Dynamically create the redirect URL
    const redirectUrl = `${window.location.origin}/email-verified`;

    // Send email verification with dynamically created redirect URL
    await sendEmailVerification(user, {
      url: redirectUrl,
    });

    alert(
      "A confirmation email has been sent. Please verify your email before logging in."
    );

    // Sign out the user immediately after signup to prevent automatic login
    await signOut(auth);

    // Redirect to login page
    router.push("/login");
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}

useHead({
  title: "Sign Up",
});
</script>
