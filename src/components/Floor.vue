<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { Status, type elevatorOrder, type floorProps } from '@/utilities/interfaces'

const props = defineProps<floorProps>()
const emits = defineEmits(['callHandler', 'changeStatus'])

const width = ref(50)
const height = ref(100)

const callHandlerEmit = () => {
    emits('callHandler', props.floor?.value)
}

const changeStatusEmit = (status: string) => {
    emits('changeStatus', status)
}

const isHiddenClass = computed(() => {
    return props.currentFloor === props.floor?.value ? '' : 'hidden'
})

const isButtonPushed = computed(() => {
    const orderExists = props.elevatorOrders?.some(
        (order: elevatorOrder) => order.destinationFloor === props.floor?.value && order.type === 'OUTSIDE'
    )
    return orderExists ? 'bg-green-600 text-white' : ''
})

const isDisabled = computed(() => {
    const orderExists = props.elevatorOrders?.some(
        (order: elevatorOrder) => order.destinationFloor === props.floor?.value
    )
    return orderExists
})

const openDoor = () => {
    if (props.currentFloor === props.floor?.value && width.value === 50) {
        changeStatusEmit(Status.OPENING)
        const interval = setInterval(() => {
            width.value--
            if (width.value === 10) {
                clearInterval(interval)
                changeStatusEmit(Status.OPENED)
            }
        }, 25)
    }
}

const closeDoor = () => {
    if (width.value === 10) {
        changeStatusEmit(Status.CLOSING)
        const interval = setInterval(() => {
            width.value++
            if (width.value === 50) {
                clearInterval(interval)
                changeStatusEmit(Status.CLOSED)
                setTimeout(() => {
                    changeStatusEmit(Status.IDLE)
                }, 500)
            }
        }, 25)
    }
}

watch(
    () => props.currentFloor,
    () => {
        if (
            props.currentFloor === props.floor?.value &&
            props.destinationFloor === props.floor?.value
        ) {
            setTimeout(() => {
                openDoor()
            }, 1000)
        }
    }
)

watch(
    () => props.destinationFloor,
    () => {
        if (props.destinationFloor !== props.currentFloor) {
            setTimeout(() => {
                closeDoor()
            }, 2000)
        }
    }
)
</script>

<template>
    <div class="flex">
        <div class="relative z-100 flex flex-space-between border-2 border-gray-950 border-t-0 border-b-0 w-32 h-32 text-6xl"
            :class="`${floor?.value === lowestFloor ? 'border-b-2' : ''} ${floor?.value === highestFloor ? 'border-t-2' : ''}`">

            <div class="left border-r-2 border-black" :class="`${floor?.name} ${isHiddenClass}`"
                :style="{ width: width + '%', height: height + '%' }"></div>
            <div class="right border-black border-l-2" :class="`${floor?.name} ${isHiddenClass}`"
                :style="{ width: width + '%', height: height + '%' }"></div>


        </div>
        <button class="bg-gray-400 m-2 my-auto p-2 h-12" @click="callHandlerEmit" :class="isButtonPushed"
            :disabled="isDisabled">
            Call
        </button>
    </div>
</template>

<style scoped>
.left {
    position: absolute;
    left: 0;
    top: 0;
    background-color: gray;
}

.right {
    position: absolute;
    right: 0;
    top: 0;
    background-color: gray;
}
</style>
