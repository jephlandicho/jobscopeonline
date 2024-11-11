<template>
  <div>
    <h2 class="text-3xl bg-slate-900 text-neutral-50 font-bold underline">
      Home Page
    </h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero distinctio
      molestiae, voluptatibus amet rem ipsum? Dolore expedita dicta, vel quaerat
      ab incidunt, voluptas molestias temporibus earum delectus repellat
      pariatur maxime.
    </p>
    <div>
      <Card />
    </div>
    <div>pos: {{ x }}, {{ y }}</div>
    <!-- <img src="@/assets/img/1.jpg" alt="" />
    <img src="/img/2.png" alt="" /> -->
    {{ $hello("world") }}
  </div>
</template>

<script setup>
const { $hello } = useNuxtApp();

const { sayHello } = useUtils();
sayHello();
const { x, y } = useMouse();
useHead({
  title: "Home",
});
</script>

<style scoped></style>
