<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mb-6 text-slate-900">
        Sign Up Page
      </h2>

      <!-- Custom Alert for displaying messages -->
      <CustomAlert
        v-if="alertMessage"
        :message="alertMessage"
        :type="alertType"
      />

      <!-- Email Sign Up Form -->
      <form @submit.prevent="signUp" class="space-y-4">
        <div>
          <CustomInput
            label="Email"
            id="email"
            type="email"
            placeholder="name@jobscopeonline.com"
            v-model="email"
            required
          />
        </div>
        <div>
          <CustomInput
            label="Password"
            id="password"
            type="password"
            placeholder="Must at least 6 characters"
            v-model="password"
            required
          />
        </div>
        <div>
          <CustomInput
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="Please confirm your password"
            v-model="confirmPassword"
            required
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
  signOut,
} from "firebase/auth";
import { useRouter } from "vue-router";
import CustomAlert from "@/components/CustomAlert.vue"; // Import CustomAlert component

const auth = useFirebaseAuth();
const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const alertMessage = ref("");
const alertType = ref("info");

function signInwithGoogle() {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(() => {
      router.replace("/user");
    })
    .catch((error) => {
      alertMessage.value = error.message;
      alertType.value = "danger";
    });
}

async function signUp() {
  if (password.value !== confirmPassword.value) {
    alertMessage.value = "Passwords don't match!";
    alertType.value = "danger";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;
    const redirectUrl = `${window.location.origin}/email-verified`;

    await sendEmailVerification(user, {
      url: redirectUrl,
    });

    alertMessage.value =
      "A confirmation email has been sent. Please verify your email before logging in.";
    alertType.value = "success";

    await signOut(auth);
    router.push("/login");
  } catch (error) {
    console.error(error.message);

    const extractedMessage =
      error.message.split(": ")[1] || "An error occurred";

    alertMessage.value = extractedMessage;
    alertType.value = "danger";
  }
}

useHead({
  title: "Sign Up",
});
</script>
