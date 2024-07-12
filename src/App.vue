<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { floors } from '@/utilities/constants'
import Floor from './components/Floor.vue';

let floorElements: { [key: string]: HTMLElement | null } = {}

onMounted(() => {
  floors.forEach((floor) => {
    floorElements[floor.name] = document.querySelector(`.${floor.name}`)
  })
})

const lowestFloor: number = -1
const highestFloor: number = 7
const currentFloor = ref<number>(0)
const destinationFloor = ref<number>(0)
const direction = ref<string>('')
const elevatorOrders = ref<elevatorOrder[]>([])
let interval: number

watch(currentFloor, (newValue) => {
  if (newValue === highestFloor || newValue === lowestFloor) {
    clearInterval(interval)
  }
})

watch(currentFloor, (_) => {
  if (destinationFloor.value === currentFloor.value) {
    clearInterval(interval)
  }
})

const changeFloorVisibility = (current: number, next: number) => {
  const currentFloorName = floors.find((floor) => floor.value === current)?.name
  const nextFloorName = floors.find((floor) => floor.value === next)?.name
  if (currentFloorName) floorElements[currentFloorName]?.classList.add('hidden')
  if (nextFloorName) floorElements[nextFloorName]?.classList.remove('hidden')
}

const moveElevator = (step: number) => {
  interval = setInterval(() => {
    const newFloor = currentFloor.value + step
    if (newFloor >= lowestFloor && newFloor <= highestFloor) {
      changeFloorVisibility(currentFloor.value, newFloor)
      currentFloor.value = newFloor
      console.log(currentFloor.value)
    }
  }, 500)
}

const upHandler = (): void => {
  direction.value = 'up'
  clearInterval(interval)
  moveElevator(1)
}

const downHandler = (): void => {
  direction.value = 'down'
  clearInterval(interval)
  moveElevator(-1)
}

const callHandler = (floor: number): void => {
  console.log('callHandler', floor)
  const elevatorOrder: elevatorOrder = {
    id: Date.now().toString(),
    direction: currentFloor.value < floor ? 'up' : 'down',
    destinationFloor: floor
  }
  elevatorOrders.value.push(elevatorOrder)
  executor()
}

const executor = async (): Promise<void> => {
  while (elevatorOrders.value.length > 0) {
    const currentOrder = elevatorOrders.value[0]
    destinationFloor.value = currentOrder.destinationFloor

    if (currentFloor.value < destinationFloor.value) {
      upHandler()
    } else if (currentFloor.value > destinationFloor.value) {
      downHandler()
    } else if (currentFloor.value === destinationFloor.value) {
      elevatorOrders.value.shift();
    }

    await new Promise<void>((resolve) => {
      const unwatch = watch(currentFloor, (newValue) => {
        if (newValue === destinationFloor.value) {
          clearInterval(interval)
          unwatch()
          resolve()
        }
      })
    })

    elevatorOrders.value = elevatorOrders.value.filter((order) => order.id !== currentOrder.id)
  }
}
</script>

<template>
  <div class="container">
    {{ elevatorOrders }}
    <Floor v-for="floor in floors" :key="floor.value" :floor="floor" @callHandler="callHandler"
      :currentFloor="currentFloor" :destinationFloor="destinationFloor" />
  </div>
</template>
