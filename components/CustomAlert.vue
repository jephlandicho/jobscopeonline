<template>
  <div
    :class="[
      'flex items-center p-4 mb-4 text-sm border rounded-lg dark:bg-gray-800 dark:border dark:text',
      alertClasses[type].bg,
      alertClasses[type].text,
      alertClasses[type].border,
    ]"
    role="alert"
  >
    <svg
      class="flex-shrink-0 inline w-4 h-4 mr-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 0 1 0 2Z"
      />
    </svg>
    <span class="sr-only">{{ type }} alert</span>
    <div>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "info",
      validator: (value) =>
        ["info", "danger", "success", "warning", "dark"].includes(value),
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      alertClasses: {
        info: {
          bg: "bg-blue-50",
          text: "text-blue-800",
          border: "border-blue-300",
          label: "Info alert!",
        },
        danger: {
          bg: "bg-red-50",
          text: "text-red-800",
          border: "border-red-300",
          label: "Danger alert!",
        },
        success: {
          bg: "bg-green-50",
          text: "text-green-800",
          border: "border-green-300",
          label: "Success alert!",
        },
        warning: {
          bg: "bg-yellow-50",
          text: "text-yellow-800",
          border: "border-yellow-300",
          label: "Warning alert!",
        },
        dark: {
          bg: "bg-gray-50",
          text: "text-gray-800",
          border: "border-gray-300",
          label: "Dark alert!",
        },
      },
    };
  },
};
</script>

<style scoped>
/* Optionally add specific styling here */
</style>
