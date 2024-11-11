<template>
  <div>
    <div class="flex items-center justify-center w-full h-60">
      <p ref="el" class="text-5xl text-blue-500 font-bold">Job Scope Online</p>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, reactive } from "vue";
import { useAnimate } from "@vueuse/core";

const el = shallowRef();

const {
  startTime,
  currentTime,
  playbackRate,
  playState,
  replaceState,
  pending,
} = useAnimate(
  el,
  [
    { clipPath: "circle(20% at 0% 30%)" },
    { clipPath: "circle(20% at 50% 80%)" },
    { clipPath: "circle(20% at 100% 30%)" },
  ],
  {
    duration: 3000,
    iterations: 5,
    direction: "alternate",
    easing: "cubic-bezier(0.46, 0.03, 0.52, 0.96)",
  }
);
useHead({
  title: "About",
});
</script>
