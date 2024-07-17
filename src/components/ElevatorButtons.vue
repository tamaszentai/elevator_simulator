<script setup lang="ts">
import { floors } from '@/utilities/constants'
</script>

<template>
  <div
    class="inset-0 items-center place-items-center border-2 grid grid-cols-3 grid-rows-3 bg-gray-300 ml-8 border-black rounded-lg w-80 h-96 text-6xl"
  >
    <button
      v-for="(floor, index) in floors"
      class="border-2 border-spacing-2 bg-gray-400 border-black rounded-full w-24 h-24 text-xxl"
      @click="console.log({ elevatorButtons: floor })"
    >
      {{ floor.value }}
    </button>
  </div>
</template>
