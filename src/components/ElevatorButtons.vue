<script setup lang="ts">
import { floors } from '@/utilities/constants'
</script>

<template>
  <div
    class="inset-0 justify-center items-center border-2 grid grid-cols-3 grid-rows-3 bg-green-300 ml-8 border-black rounded-lg w-28 h-32 text-6xl">
    <button v-for="(floor, index) in floors" class="justify-center bg-gray-400 border rounded-full w-8 h-8 text-xl"
      @click="console.log({ elevatorButtons: floor })">
      {{ floor.value }}
    </button>
  </div>
</template>
