<script setup lang="ts">
import { floors } from '@/utilities/constants'
import type { elevatorOrder } from '@/utilities/interfaces';
import { computed, ref } from 'vue';

const props = defineProps({
  floors: Array,
  currentFloor: Number
})

const buttonPushed = ref<elevatorOrder[]>([])

const isButtonPushed = computed(() => {
  return (floor: number) => {
    return buttonPushed.value.some(
      (order: elevatorOrder) => order.destinationFloor === floor
    ) ? 'border-green-500' : ''
  }
})

const pushButton = (floor: number) => {
  const exists = buttonPushed.value.some(
    (order: elevatorOrder) => order.destinationFloor === floor
  )

  if (!exists) {
    const elevatorOrder: elevatorOrder = {
      id: Date.now().toString(),
      direction: props.currentFloor !== undefined && props.currentFloor < floor ? 'up' : 'down',
      destinationFloor: floor
    }
    buttonPushed.value.push(elevatorOrder)
  }
}

</script>

<template>
  <div
    class="inset-0 items-center place-items-center border-2 grid grid-cols-3 grid-rows-3 bg-gray-300 ml-8 border-black rounded-lg w-80 h-96 text-6xl">
    <button v-for="(floor, index) in floors"
      :class="['border-2 border-spacing-2 bg-gray-400 border-black rounded-full w-24 h-24 text-xxl', isButtonPushed(floor.value)]"
      @click="pushButton(floor.value)">
      {{ floor.value }}
    </button>
  </div>
</template>
