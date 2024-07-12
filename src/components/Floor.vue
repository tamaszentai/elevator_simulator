<script setup lang="ts">
import { computed } from 'vue';
import ElevatorButtons from './ElevatorButtons.vue';

const props = defineProps({
    floor: Object,
    currentFloor: Number,
    destinationFloor: Number
})

const isHiddenClass = computed(() => {
    return props.currentFloor === props.floor?.value ? '' : 'hidden'
})

const isShowElevatorButtons = computed(() => {
    return props.currentFloor === props.destinationFloor && props.currentFloor === props.floor?.value
})

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
        <button class="bg-gray-400 my-auto p-2 border h-12" @click="$emit('callHandler', floor?.value)">Call</button>
        <ElevatorButtons v-if="isShowElevatorButtons" />
    </div>
</template>