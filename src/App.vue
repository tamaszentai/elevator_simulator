<script setup lang="ts">
import { ref, onMounted } from 'vue';

let seventh: HTMLElement | null = null;
let sixth: HTMLElement | null = null;
let fifth: HTMLElement | null = null;
let fourth: HTMLElement | null = null;
let third: HTMLElement | null = null;
let second: HTMLElement | null = null;
let first: HTMLElement | null = null;
let ground: HTMLElement | null = null;
let basement: HTMLElement | null = null;

onMounted(() => {
  seventh = document.querySelector('.seventh');
  sixth = document.querySelector('.sixth');
  fifth = document.querySelector('.fifth');
  fourth = document.querySelector('.fourth');
  third = document.querySelector('.third');
  second = document.querySelector('.second');
  first = document.querySelector('.first');
  ground = document.querySelector('.ground');
  basement = document.querySelector('.basement');
});

const currentFloor = ref<number>(0);
const direction = ref<string>("");
const topValue = ref<number>(0);
const bottomValue = ref<number>(0);

const upHandler = (): void => {
  direction.value = "up";
  setInterval(() => {
    // first?.classList.remove('hidden');
    topValue.value -= 5;
    bottomValue.value += 5;
    console.log(topValue.value, bottomValue.value);
  }, 200)
};
</script>

<template>
  <div class="container">
    {{ topValue }}
    <button class="bg-purple-800 m-2 px-4 py-2 rounded font-bold text-white" @click="upHandler">UP</button>
    <button class="bg-purple-800 px-4 py-2 rounded font-bold text-white">DOWN</button>
    <div class="grid grid-rows-9">
      <div class="relative z-10 border-4 border-gray-950 border-b-0 w-32 h-32">
        <div class="absolute inset-0 hidden bg-purple-800 seventh" />
      </div>
      <div class="relative z-10 border-4 border-gray-950 border-b-0 w-32 h-32">
        <div class="absolute inset-0 hidden bg-purple-800 sixth" />
      </div>
      <div class="relative z-10 border-4 border-gray-950 border-b-0 w-32 h-32">
        <div class="absolute inset-0 hidden bg-purple-800 fifth" />
      </div>
      <div class="relative z-10 border-4 border-gray-950 border-b-0 w-32 h-32">
        <div class="absolute inset-0 hidden bg-purple-800 fourth" />
      </div>
      <div class="relative z-10 border-4 border-gray-950 border-b-0 w-32 h-32">
        <div class="absolute inset-0 hidden bg-purple-800 third" />
      </div>
      <div class="relative z-10 border-4 border-gray-950 border-b-0 w-32 h-32">
        <div class="absolute inset-0 hidden bg-purple-800 second" />
      </div>
      <div class="relative z-10 border-4 border-gray-950 border-b-0 w-32 h-32">
        <div class="absolute inset-0 hidden bg-purple-800 first" />
      </div>
      <div class="relative z-100 border-4 border-gray-950 border-b-0 w-32 h-32">
        <div class="absolute inset-0 bg-purple-800 ground"
          :style="{ 'top': topValue + '%', 'bottom': bottomValue + '%' }" />
      </div>
      <div class="relative z-10 border-4 border-gray-950 w-32 h-32">
        <div class="absolute inset-0 hidden bg-purple-800 basement" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
