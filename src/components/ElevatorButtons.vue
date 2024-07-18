<script setup lang="ts">
import { floors } from '@/utilities/constants'
import type { elevatorOrder } from '@/utilities/interfaces';
import { computed, ref, watch } from 'vue';

const props = defineProps({
  floors: Array,
  currentFloor: Number,
  destinationFloor: Number
})

const emits = defineEmits(['elevatorButtonsInputEmit']);

const elevatorButtonsInput = ref<elevatorOrder[]>([])

const elevatorButtonsInputEmit = (value: elevatorOrder) => {
  emits('elevatorButtonsInputEmit', value)
}

const isButtonPushed = computed(() => {
  return (floor: number) => {
    return elevatorButtonsInput.value.some(
      (order: elevatorOrder) => (order.destinationFloor === floor && props.currentFloor !== props.destinationFloor)
    ) ? 'border-green-500' : ''
  }
})

const pushButton = (floor: number) => {
  const exists = elevatorButtonsInput.value.some(
    (order: elevatorOrder) => order.destinationFloor === floor
  )

  if (!exists && props.currentFloor !== floor) {
    const elevatorOrder: elevatorOrder = {
      id: Date.now().toString(),
      direction: props.currentFloor !== undefined && props.currentFloor < floor ? 'up' : 'down',
      destinationFloor: floor
    }
    elevatorButtonsInput.value.push(elevatorOrder)
    elevatorButtonsInputEmit(elevatorOrder);
  }
}

watch(() => props.currentFloor, () => {
  elevatorButtonsInput.value = elevatorButtonsInput.value.filter(
    (order: elevatorOrder) => order.destinationFloor !== props.currentFloor
  )
})


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
