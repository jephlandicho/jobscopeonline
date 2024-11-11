<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mb-6 text-slate-900">
        Login Page
      </h2>
      <CustomAlert
        v-if="alertMessage"
        :message="alertMessage"
        :type="alertType"
      />
      <!-- Email and Password Login Form -->
      <form @submit.prevent="signInWithEmail" class="space-y-4">
        <div>
          <CustomInput
            label="Email"
            id="email"
            type="email"
            placeholder="name@jobscopeonline.com"
            v-model="email"
            required
          >
          </CustomInput>
        </div>
        <div>
          <CustomInput
            label="Password"
            id="password"
            type="password"
            placeholder="Please enter your password"
            v-model="password"
            required
          />
        </div>

        <div class="flex justify-between">
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log in with Email
          </button>
        </div>
      </form>

      <!-- Google Login Button -->
      <div class="mt-4">
        <button
          @click="signInwithGoogle"
          class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign in with Google
        </button>
      </div>

      <!-- Error Message (if any) -->
      <div v-if="errorMessage" class="mt-4 text-center text-red-600 text-sm">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { signOut } from "firebase/auth";
const auth = useFirebaseAuth();
const router = useRouter();
const alertMessage = ref("");

const email = ref("");
const password = ref("");
const errorMessage = ref("");

function signInwithGoogle() {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(() => {
      router.replace("/user");
    })
    .catch((error) => {
      const extractedMessage =
        error.message.split(": ")[1] || "An error occurred";

      alertMessage.value = extractedMessage;
      alertType.value = "danger";
    });
}

async function signInWithEmail() {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;

    // Check if the user's email is verified
    if (!user.emailVerified) {
      alertMessage.value = "Please verify your email before logging in.";
      alertType.value = "danger";
      // Optionally, you can sign the user out after this check to prevent access
      await signOut(auth);
      return;
    }

    router.replace("/user"); // Redirect to user page after successful login
  } catch (error) {
    const extractedMessage =
      error.message.split(": ")[1] || "An error occurred";

    alertMessage.value = extractedMessage;
    alertType.value = "danger";
  }
}

useHead({
  title: "Login",
});
</script>
