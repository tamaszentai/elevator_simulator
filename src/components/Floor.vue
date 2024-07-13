<script setup lang="ts">
import { computed } from 'vue';
import ElevatorButtons from './ElevatorButtons.vue';
import type { elevatorOrder, floorProps } from '@/utilities/interfaces';

const props = defineProps<floorProps>()

const isHiddenClass = computed(() => {
    return props.currentFloor === props.floor?.value ? '' : 'hidden'
})


const isCallButtonBorder = computed(() => {
    const orderExists = props.elevatorOrders?.some((order: elevatorOrder) => order.destinationFloor === props.floor?.value);
    return orderExists ? 'bg-green-600 text-white' : '';
});

</script>

<template>
    <div class="flex">
        <div class="relative z-100 flex justify-center items-center border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl"
            :class="`${floor?.value === -1 ? 'border-b-4' : ''}`">
            {{ floor?.value }}
            <div class="absolute inset-0 flex justify-center items-center bg-purple-800 text-6xl text-white"
                :class="`${floor?.name} ${isHiddenClass}`">
                {{ floor?.value }}
            </div>
        </div>
        <button class="bg-gray-400 m-2 my-auto p-2 h-12" @click="$emit('callHandler', floor?.value)"
            :class="isCallButtonBorder">Call</button>
    </div>
</template>