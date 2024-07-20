<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { floors } from '@/utilities/constants'
import Floor from './components/Floor.vue'
import { Status, ElevatorOrderType, type elevatorOrder } from './utilities/interfaces'
import ElevatorButtons from './components/ElevatorButtons.vue'

let floorElements: { [key: string]: HTMLElement | null } = {}

onMounted(() => {
  floors.forEach((floor) => {
    floorElements[floor.name] = document.querySelector(`.${floor.name}`)
  })
  executor()
})

const lowestFloor: number = -1
const highestFloor: number = 7
const currentFloor = ref<number>(0)
const destinationFloor = ref<number>(0)
const currentDirection = ref<string>('')
const status = ref<string>(Status.IDLE)
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
    }
  }, 500)
}

const upHandler = (): void => {
  currentDirection.value = 'up'
  clearInterval(interval)
  moveElevator(1)
}

const downHandler = (): void => {
  currentDirection.value = 'down'
  clearInterval(interval)
  moveElevator(-1)
}

const callHandler = (floor: number): void => {
  const elevatorOrder: elevatorOrder = {
    id: Date.now().toString(),
    direction: currentFloor.value < floor ? 'up' : 'down',
    destinationFloor: floor,
    type: ElevatorOrderType.OUTSIDE
  }

  elevatorOrders.value.push(elevatorOrder)
  executor()
}

const changeStatus = (statusParam: string): void => {
  status.value = statusParam
}

const executor = async (): Promise<void> => {
  while (elevatorOrders.value.length > 0) {
    const currentOrder = elevatorOrders.value[0]
    destinationFloor.value = currentOrder.destinationFloor

    if (currentFloor.value < destinationFloor.value && status.value === Status.IDLE) {
      upHandler()
    } else if (currentFloor.value > destinationFloor.value && status.value === Status.IDLE) {
      downHandler()
    } else if (currentFloor.value === destinationFloor.value) {
      elevatorOrders.value.shift()
    }

    await new Promise<void>((resolve) => {
      const unwatch = watch(currentFloor, (newValue) => {
        if (newValue === destinationFloor.value) {
          clearInterval(interval)
          unwatch()
          setTimeout(() => {
            resolve()
          }, 1000)
        }
      })
    })

    elevatorOrders.value = elevatorOrders.value.filter((order) => order.id !== currentOrder.id)
  }
}

const elevatorButtonsInputEmit = (value: elevatorOrder) => {
  elevatorOrders.value.push(value);
  executor()

}

watch(
  () => status.value,
  () => {
    executor()
  }
)
</script>

<template>
  <div class="container">
    <div class="flex">
      <div>
        <Floor v-for="floor in floors" :key="floor.value" :floor="floor" @callHandler="callHandler"
          :highestFloor="highestFloor" :lowestFloor="lowestFloor" :currentFloor="currentFloor"
          :destinationFloor="destinationFloor" :elevatorOrders="elevatorOrders" @changeStatus="changeStatus" />
      </div>
      <ElevatorButtons :elevatorOrders="elevatorOrders" :currentFloor="currentFloor"
        :destinationFloor="destinationFloor" @elevatorButtonsInputEmit="elevatorButtonsInputEmit" />
    </div>
  </div>
</template>
