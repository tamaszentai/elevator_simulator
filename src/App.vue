<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

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
let upInterval: number;
let downInterval: number;

watch(currentFloor, () => {
  if (currentFloor.value === 7) {
    clearInterval(upInterval);
  }
});

watch(currentFloor, () => {
  if (currentFloor.value === -1) {
    clearInterval(downInterval);
  }
});


const upHandler = (): void => {
  direction.value = "up";
  clearInterval(downInterval);

  upInterval = setInterval(() => {
    console.log('uptick');
    if (direction.value === "up") {
      if (currentFloor.value < 7) {
        currentFloor.value++;
        console.log(currentFloor.value);
        if (currentFloor.value === 0) {
          ground?.classList.remove('hidden');
          basement?.classList.add('hidden');
        } else if (currentFloor.value === 1) {
          first?.classList.remove('hidden');
          ground?.classList.add('hidden');
        } else if (currentFloor.value === 2) {
          second?.classList.remove('hidden');
          first?.classList.add('hidden');
        } else if (currentFloor.value === 3) {
          third?.classList.remove('hidden');
          second?.classList.add('hidden');
        } else if (currentFloor.value === 4) {
          fourth?.classList.remove('hidden');
          third?.classList.add('hidden');
        } else if (currentFloor.value === 5) {
          fifth?.classList.remove('hidden');
          fourth?.classList.add('hidden');
        } else if (currentFloor.value === 6) {
          sixth?.classList.remove('hidden');
          fifth?.classList.add('hidden');
        } else if (currentFloor.value === 7) {
          seventh?.classList.remove('hidden');
          sixth?.classList.add('hidden');
        }
      }
    }
  }, 500);
};

const downHandler = (): void => {
  direction.value = "down";
  clearInterval(upInterval);
  downInterval = setInterval(() => {
    console.log('downtick');
    if (direction.value === "down") {
      if (currentFloor.value > -1) {
        currentFloor.value--;
        console.log(currentFloor.value);
        if (currentFloor.value === -1) {
          ground?.classList.add('hidden');
          basement?.classList.remove('hidden');
        } else if (currentFloor.value === 0) {
          ground?.classList.remove('hidden');
          first?.classList.add('hidden');
        } else if (currentFloor.value === 1) {
          first?.classList.remove('hidden');
          second?.classList.add('hidden');
        } else if (currentFloor.value === 2) {
          second?.classList.remove('hidden');
          third?.classList.add('hidden');
        } else if (currentFloor.value === 3) {
          third?.classList.remove('hidden');
          fourth?.classList.add('hidden');
        } else if (currentFloor.value === 4) {
          fourth?.classList.remove('hidden');
          fifth?.classList.add('hidden');
        } else if (currentFloor.value === 5) {
          fifth?.classList.remove('hidden');
          sixth?.classList.add('hidden');
        } else if (currentFloor.value === 6) {
          sixth?.classList.remove('hidden');
          seventh?.classList.add('hidden');
        }
      }
    }
  }, 500);
};


</script>

<template>
  <div class="container">
    <button class="bg-purple-800 m-2 px-4 py-2 rounded font-bold text-white" @click="upHandler">UP</button>
    <button class="bg-purple-800 px-4 py-2 rounded font-bold text-white" @click="downHandler">DOWN</button>
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
        <div class="absolute inset-0 bg-purple-800 ground" />
      </div>
      <div class="relative z-10 border-4 border-gray-950 w-32 h-32">
        <div class="absolute inset-0 hidden bg-purple-800 basement" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
